import { NextApiRequest, NextApiResponse } from 'next'

import sharp from 'sharp';
import axios from 'axios';
import { join } from 'path';
import { readFileSync } from 'fs';

import { motifBorderOptions } from '@/data/final-steps';

const backgroundsConfig = [
    {
        range: [1, 50],
        sizeFactor: 14,
        offsetX: 50, // zusätzlicher horizontaler Offset (in Pixeln)
        offsetY: -20, // zusätzlicher vertikaler Offset (in Pixeln)
        wallWidth: 1937,
        wallHeight: 1088,
        allowedArea: {
            X: { min: 755, max: 1895, fraction: 0.3 },
            Y: { min: 42, max: 902, fraction: 0.6 }
        },
        backgroundPath: join(process.cwd(), 'public/images/backgrounds', 'background-small.jpeg')
    },
    {
        range:[51, 90],
        sizeFactor: 14,
        offsetX: 500,
        offsetY: -80,
        wallWidth: 3046,
        wallHeight: 1713,
        allowedArea: {
            X: { min: 1473, max: 2977, fraction: 0.3 },
            Y: { min: 65, max: 1354, fraction: 0.6 }
        },
        backgroundPath: join(process.cwd(), 'public/images/backgrounds', 'background-medium.jpeg')
    },
    {
        range:[91, 200],
        sizeFactor: 5.2,
        offsetX: 70,
        offsetY: -40,
        wallWidth: 2667,
        wallHeight: 1499,
        allowedArea: {
            X: { min: 288, max: 2341, fraction: 0.52 },
            Y: { min: 78, max: 1121, fraction: 0.7 }
        },
        backgroundPath: join(process.cwd(), 'public/images/backgrounds', 'background-large.jpeg')
    },
    {
        range: [201, Infinity],
        sizeFactor: 5.2,
        offsetX: 80,
        offsetY: -50,
        wallWidth: 4128,
        wallHeight: 2304,
        allowedArea: {
            X: { min: 1089, max: 3189, fraction: 0.45 },
            Y: { min: 155, max: 1692, fraction: 0.7 }
        },
        backgroundPath: join(process.cwd(), 'public/images/backgrounds', 'background-extraLarge.jpeg')
    },
]

const materialFinishConfig = [
    {
        id: 'bsilver',
        materialFinishPath: join(process.cwd(), 'public/images/materialfinishes', 'bsilver.png'),
        goldAlpha: 0,
        metalAlpha: 0.35,
        saturation: 1.5
    },
    {
        id: 'bgold',
        materialFinishPath: join(process.cwd(), 'public/images/materialfinishes', 'bgold.png'),
        goldAlpha: 0.1,
        metalAlpha: 0.1,
        saturation: 1.5
    },
    {
        id: 'bglossy',
        materialFinishPath: join(process.cwd(), 'public/images/materialfinishes', 'bglossy.png'),
        goldAlpha: 0,
        metalAlpha: 0,
        saturation: 1.0
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    
    try {
        const { id, format, physicalWidth, physicalHeight, overallPhysicalWidth, overallPhysicalHeight, newSelections } = req.body

        if (!id || !format) { //|| !physicalWidth || !physicalHeight || motifborderMargin === undefined) {
            return res.status(400).json({ message: 'All parameters are required.' });
        }

        const recordId = 'rec' + id
        const baseId = 'appHGQscalksXU7kz'
        const tableName = 'tbl7vI9SbYFWkvtZU'

        const airtableResponse = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_IG_TABLE_ID}/${recordId}`, {
            headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
            }
          })
          
        const recordData = await airtableResponse.json()
        const fields = recordData.fields
        const image = fields['Image']
        const artworkUrl = image[0].url

        // Bild herunterladen
        const imageResponse = await axios.get(artworkUrl, { responseType: 'arraybuffer' });
        let artworkBuffer = Buffer.from(imageResponse.data);

        if (isBlackAndWhite(newSelections.paper)) {
            artworkBuffer = await sharp(artworkBuffer)
                .greyscale()
                .toBuffer()
        }

        // Wähle Resize-Optionen und den Pfad zum richtigen Wasserzeichen basierend auf dem Format
        let fixedWidth = 0
        let fixedHeight = 0
        let watermarkPath: string;
        if (format === 'landscape') {
            fixedWidth = 1792
            fixedHeight = 1024
            watermarkPath = join(process.cwd(), 'public/images/watermarks', 'watermark-landscape.png');
        } else if (format === 'portrait') {
            fixedWidth = 1024
            fixedHeight = 1792
            watermarkPath = join(process.cwd(), 'public/images/watermarks', 'watermark-portrait.png');
        } else { // square
            fixedWidth = 1024
            fixedHeight = 1024
            watermarkPath = join(process.cwd(), 'public/images/watermarks', 'watermark-square.png');
        }
        
        // Lese das Wasserzeichen von der Festplatte
        const watermarkBuffer = readFileSync(watermarkPath);
        
        // Bearbeite das Bild: passe die Größe an und füge das Wasserzeichen hinzu
        const watermarkedBuffer = await sharp(artworkBuffer)
        .resize(fixedWidth, fixedHeight)
        .composite([{ input: watermarkBuffer, gravity: 'southeast' }])
        .toFormat('jpeg')
        .toBuffer();

        if (physicalWidth > 0 && physicalHeight > 0 && overallPhysicalWidth > 0 && overallPhysicalHeight > 0 && newSelections.product !== 'digital1') {
            //Wird vorerst dadurch ersetzt, solange kein passe-Partout angezeigt wird
            const overallPaperWidth = overallPhysicalWidth - (2 * newSelections.passepartoutWidth)
            const overallPaperHeight = overallPhysicalHeight - (2 * newSelections.passepartoutWidth)

            const longestSide = Math.max(overallPaperWidth, overallPaperHeight)
            const backgroundConfig = backgroundsConfig.find(config =>
                longestSide >= config.range[0] && longestSide <= config.range[1]
            )

            let selectedBorder = motifBorderOptions.find(b => b.id === newSelections.motifborder)

            if (!selectedBorder) {
                selectedBorder = motifBorderOptions[0]
            }

            // Berechne den Skalierungsfaktor: Pixel pro cm
            const pixelPerCmWidth = fixedWidth / physicalWidth;
            const pixelPerCmHeight = fixedHeight / physicalHeight;
            // Für die zusätzliche Randberechnung verwende beispielsweise den Mittelwert
            const pixelPerCm = (pixelPerCmWidth + pixelPerCmHeight) / 2;
            
            
            // MotifborderMargin ist in cm (z. B. 2 für 1cm); berechne den zusätzlichen Rand in Pixeln
            const additionalPixels = Math.round(pixelPerCm * selectedBorder.margin);
            
            // Neue Dimensionen: addiere den zusätzlichen Rand (auf beiden Seiten, d.h. insgesamt 2x den Randwert)
            const newWidth = fixedWidth + additionalPixels
            const newHeight = fixedHeight + additionalPixels

            // Erzeuge einen weißen Hintergrund in den neuen Dimensionen
            const background = await sharp({
                create: {
                width: newWidth,
                height: newHeight,
                channels: 3,
                background: { r: 255, g: 255, b: 255 }
                }
            }).png().toBuffer();
        
            // Berechne, wo das Wasserzeichen-Bild (das Originalbild mit Wasserzeichen) zentriert wird:
            const leftOffset = Math.floor((newWidth - fixedWidth) / 2);
            const topOffset = Math.floor((newHeight - fixedHeight) / 2);
        
            // Komponiere das Wasserzeichen-Bild auf den weißen Hintergrund
            let finalArtworkBuffer = await sharp(background)
                .composite([{ input: watermarkedBuffer, left: leftOffset, top: topOffset }])
                .toFormat('jpeg')
                .toBuffer();

            if (newSelections.hanginghardware === 'cylindricalspacers') {
                finalArtworkBuffer = await cylindricalSpacers(finalArtworkBuffer, newWidth, newHeight, pixelPerCm)
            }

            if (newSelections.corners !== 'normalcorners' && newSelections.corners) {
                finalArtworkBuffer = await roundCorners(finalArtworkBuffer, newWidth, newHeight, newSelections.corners)
            }

            if (newSelections.materialfinish) {
                finalArtworkBuffer = await materialFinish(finalArtworkBuffer, newWidth, newHeight, newSelections.materialfinish)
            }

            if (!backgroundConfig) {
                throw new Error("Kein Hintergrund-Config gefunden.");
            }
            
            const newArtworkWidth = Math.round(overallPaperWidth * backgroundConfig.sizeFactor)
            const newArtworkHeight = Math.round(overallPaperHeight * backgroundConfig.sizeFactor)

            const resizedArtworkBuffer = await sharp(finalArtworkBuffer)
                .resize(newArtworkWidth, newArtworkHeight)
                .toBuffer();

            // Lade den Wand-Hintergrund (Größe 2447x1376; Datei liegt im public Ordner)
            const wallBackgroundPath = join(process.cwd(), 'public/images/backgrounds', 'background-small.jpeg');
            // Wir kennen bereits die Hintergrundgröße
            const wallWidth = backgroundConfig.wallWidth;
            const wallHeight = backgroundConfig.wallHeight;
            const wallBackgroundBuffer = readFileSync(backgroundConfig.backgroundPath);
            
            // Berechne die Position:
            // Zentrales Positionieren, verschoben um (z.B.) +20px nach rechts und -20px (also etwas oberhalb) vom Zentrum
            const offsetX = Math.floor((wallWidth - newArtworkWidth) / 2) + backgroundConfig.offsetX;
            const offsetY = Math.floor((wallHeight - newArtworkHeight) / 2) + backgroundConfig.offsetY;

            const { X, Y } = backgroundConfig.allowedArea

            const allowedWidth = X.max - X.min
            const allowedHeight = Y.max - Y.min

            const compositeLeft = Math.floor(X.min + (allowedWidth - newArtworkWidth) * X.fraction);
            const compositeTop = Math.floor(Y.min + (allowedHeight - newArtworkHeight) * Y.fraction);

            const finalImageBuffer = await sharp(wallBackgroundBuffer)
                .composite([{ input: resizedArtworkBuffer, left: compositeLeft, top: compositeTop }])
                .toFormat('jpeg')
                .toBuffer();

            res.setHeader('Content-Type', 'image/jpeg');
            res.status(200).json({
                finalImage: finalImageBuffer.toString('base64'),
                watermarkedImage: watermarkedBuffer.toString('base64'),
            })
        } else {
            // Setze den Content-Type und sende das bearbeitete Bild zurück
            res.setHeader('Content-Type', 'image/jpeg');
            res.status(200).json({
                watermarkedImage: watermarkedBuffer.toString('base64'),
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const isBlackAndWhite = (paperId) => {
    if (!paperId) return false

    if (paperId === 'ibwg' || paperId === 'ibwm' || paperId === 'baryta') {
        return true
    } else {
        return false
    }
}

const roundCorners = async (inputBuffer, width, height, corners) => {
    const radius = corners === 'slightlyround' ? 30 : 80

    const svg = `<svg>
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/>
    </svg>`

    const roundedBuffer = await sharp(inputBuffer)
        .resize(width, height)
        .composite([{ input: Buffer.from(svg), blend: 'dest-in' }])
        .toFormat('png')
        .toBuffer();
    
    return roundedBuffer;
}

const cylindricalSpacers = async (inputBuffer, width, height, pixelPerCm) => {
    const circleRadius = pixelPerCm * 1.25
    const spacing = pixelPerCm * 3.1
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${spacing}" cy="${spacing}" r="${circleRadius}" fill="#4B4B4B" />
            <circle cx="${width - spacing}" cy="${spacing}" r="${circleRadius}" fill="#4B4B4B" />
            <circle cx="${spacing}" cy="${height - spacing}" r="${circleRadius}" fill="#4B4B4B" />
            <circle cx="${width - spacing}" cy="${height - spacing}" r="${circleRadius}" fill="#4B4B4B" />
        </svg>
    `

    const outputBuffer = await sharp(inputBuffer)
        .composite([{ input: Buffer.from(svg), blend: 'over' }]) // "over" legt die Kreise über das Bild
        .toFormat('png')
        .toBuffer();

    return outputBuffer;
}

const materialFinish = async (inputBuffer, width, height, materialfinish) => {
    if (materialfinish === 'glossy') return inputBuffer

    const materialfinishInfo = materialFinishConfig.find(m => m.id === materialfinish)
    

    if (materialfinishInfo) {
        const materialfinishPath = materialfinishInfo.materialFinishPath
        let materialfinishBuffer = readFileSync(materialfinishPath)

        materialfinishBuffer = await sharp(materialfinishBuffer)
        .resize(width, height)
        .toBuffer()

        const goldOverlay = await sharp({
            create: {
                width: width, // Breite des Originalbildes
                height: height, // Höhe des Originalbildes
                channels: 4, // RGBA-Kanäle
                background: { r: 230, g: 214, b: 172, alpha: materialfinishInfo.goldAlpha } // Goldene Farbe mit 56% Deckkraft
            }
        })
        .toFormat('png')
        .toBuffer()

        const metalOverlay = await sharp({
            create: {
                width: width, // Breite des Originalbildes
                height: height, // Höhe des Originalbildes
                channels: 4, // RGBA-Kanäle
                background: { r: 143, g: 143, b: 143, alpha: materialfinishInfo.metalAlpha } // Goldene Farbe mit 56% Deckkraft
            }
        })
        .toFormat('png')
        .toBuffer()

        let outputBuffer = await sharp(inputBuffer)
        .modulate({
            brightness: 1.0, // Beibehaltung der Originalhelligkeit
            saturation: materialfinishInfo.saturation, // Erhöhung der Farbsättigung um 50%
            hue: 1         // Keine Änderung des Farbtons
        })
        .sharpen()
        .toFormat('png')
        .toBuffer()

        outputBuffer = await sharp(outputBuffer)
        .composite([{ input: metalOverlay, blend: 'over' }])
        .toFormat('png')
        .toBuffer()

        outputBuffer = await sharp(outputBuffer)
        .composite([{ input: goldOverlay, blend: 'over' }])
        .toFormat('png')
        .toBuffer()

        outputBuffer = await sharp(outputBuffer)
        .composite([{ input: materialfinishBuffer, blend: 'over' }])
        .toFormat('png')
        .toBuffer()

        return outputBuffer
    }
    return inputBuffer
}