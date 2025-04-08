import { NextApiRequest, NextApiResponse } from 'next'

import { extraCharge, artworkPrice, vatRules } from "./constants"
import { ProductPricing, Selections } from '@/data/options.types'
import { frameOptions } from '@/data/frames'
import { sizeOptions, passepartoutWidths } from '@/data/other-options'
import { motifBorderOptions } from '@/data/final-steps'

import { productPrices, imageCarrierPrices, framePrices, passepartoutColorPrices, acrylglassPrices, paperPrices, glassPrices, laminationPrices, materialFinishPrices, hangingHardwarePrices, motifBorderPrices, stretcherFramePrices } from './pricing'

import { getMinSize } from '@/data/external-functions'
import { json } from 'stream/consumers'

const polynomialFunction = (area: number, parameters: any, surcharge: number, notNegative: boolean): number => {
  const { a, b, c, d, e, f } = parameters
  const y = a * Math.pow(area, 5) + b * Math.pow(area, 4) + c * Math.pow(area, 3) + d * Math.pow(area, 2) + e * area + f
  if (y < 0 && notNegative) return 0
  return Math.round(y*surcharge)
}

const linearFunction = (area: number, parameters: any, surcharge: number): number => {
  const { m, t } = parameters
  const y = m * area + t
  return Math.round(y*surcharge)
}

const asymmetricalSigmoidalFunction = (area: number, parameters: any, surcharge: number): number => {
  const { a, b, c, d, f } = parameters
  const y = a + (d - a) / Math.pow(1 + Math.pow(area / c, b), f)
  return Math.round(y*surcharge)
}

const exponentialFunction = (area: number, parameters: any, surcharge: number): number => {
  const { Y0, V0, K } = parameters
  const y = Y0 - (V0 / K) * (1 - Math.exp(-K * area))
  return Math.round(y*surcharge)
}

const calculateFunction = (area: number, pricing: any): number => {
  const { functionType, surcharge, parameters } = pricing
  switch (functionType) {
    case 'polynomial':
      const { notNegative } = pricing
      return polynomialFunction(area, parameters, surcharge, notNegative)
    case 'linear':
      return linearFunction(area, parameters, surcharge)
    case 'asymmetricalSigmoidal':
      return asymmetricalSigmoidalFunction(area, parameters, surcharge)
    case 'exponential':
      return exponentialFunction(area, parameters, surcharge)
    case 'step':
      return pricing.step(area)
    case 'none':
      return 0
  }
  return 0
}

const getMotifborderBaseReference = (imageCarrierId: string, paperId: string): string => {
  if (imageCarrierId === 'imagecarrier1') {
    return 'aludibond2'
  } else if (imageCarrierId === 'imagecarrier3' || imageCarrierId === 'imagecarrier4') {
    return 'photoprint1'
  } else {
    switch (paperId) {
      case 'fcrystalarchiveg':
      case 'fcrystalarchivem':
      case 'fcrystalarchives':
      case 'baryta':
        return 'photoprint1'
      case 'hfapearl':
      case 'hwilliamturner':
      case 'hphotorag':
      case 'htorchon':
      case 'hfabaryta':
      case 'carchesarag':
      case 'cbarytaprestige2':
      case 'cragphotographique':
      case 'efacottonsmooth':
      case 'efacottontextured':
      case 'etraditionalpp':
        return 'fineart'
      default:
        return 'fineart'
    }
  }
}

const calculateShippingPrice = (product: ProductPricing, width: number, height: number, frameId: string): number => {
  const selectedFrame = frameOptions.find(f => f.id === frameId)
  if (!product || !selectedFrame) return 0

  const frameWidth = selectedFrame.frameWidth
  const longestSide = Math.round(Math.max(width, height) + (2 * frameWidth))

  if (frameId === 'noframe') {
    switch (product.category) {
      case 'acrylic':
      case 'metal':
      case 'canvas':
        if (longestSide <= 25) {
          return 6
        } else if (longestSide <= 60) {
          return 10
        } else if (longestSide <= 125) {
          return 15
        } else {
          return 30
        }
      case 'photoprint':
      case 'fineart':
        if (longestSide <= 25) {
          return 5
        } else if (longestSide <= 60) {
          return 6
        } else if (longestSide <= 100) {
          return 8
        } else if (longestSide <= 180) {
          return 10
        } else {
          return 15
        }
      default:
        return 0
    }
  } else {
    if (longestSide <= 25) {
      return 6
    } else if (longestSide <= 60) {
      return 10
    } else if (longestSide <= 125) {
      return 15
    } else {
      return 30
    }
  }
}

const calculateTotalPrice = (newSelections: Selections, format: string): number => {
  let product = productPrices.find(p => p.id === newSelections.product)

  if (!product) return 0

  const minSize = getMinSize(newSelections.product, newSelections.frame, format, newSelections.motifborder, newSelections.passepartoutWidth * 2)

  let totalPrice = 0
  let price = 0
  
  if (product?.category === 'framed' && product.id != 'framed9') {
    if (newSelections.mounting === 'passe-partout1' || newSelections.mounting === 'canvas-stretcher') {
      switch (newSelections.paper) {
        case 'fcrystalarchiveg':
        case 'fcrystalarchivem':
        case 'uhdphotoprint':
        case 'fcrystalarchives':
        case 'fvelvet':
        case 'muhdphotoprint':
        case 'fflex':
        case 'ibwg':
        case 'ibwm':
        case 'ibwm':
        case 'baryta':
          product = productPrices.find(p => p.id === 'photoprint1')
          break
        case 'hfapearl':
        case 'hwilliamturner':
        case 'hphotorag':
        case 'htorchon':
        case 'hfabaryta':
        case 'hpsilkbarytax':
        case 'carchesarag':
        case 'cbarytaprestige2':
        case 'cragphotographique':
        case 'efacottonsmooth':
        case 'efacottontextured':
        case 'etraditionalpp':
          product = productPrices.find(p => p.id === 'fineart')
          break
        case 'cprintm':
          product = productPrices.find(p => p.id === 'canvas1')
          break
        case 'cprintg':
          product = productPrices.find(p => p.id === 'canvas2')
          break
      }
    } else {
      product = productPrices.find(p => p.id === newSelections.mounting)
    }
    if (!product) return 0
  }
  
  const baseProductId = product.basePrices ? product.id : product.basePricesReferenceProductId

  const currentSize = newSelections.size != '' ? newSelections.size : minSize

  const referenceProduct = productPrices.find(p => p.id === baseProductId)

  if (!referenceProduct || !baseProductId) return 0

  if (!referenceProduct.basePrices) {
    throw new Error(`Base prices für Produkt mit ID ${baseProductId} sind nicht definiert.`);
  }

  totalPrice = referenceProduct.basePrices[format]?.[currentSize] + artworkPrice
  const selectedSize = sizeOptions[format].find(size => size.id === currentSize)
  const [width, height] = selectedSize.name.split('x').map(dim => parseInt(dim.trim()))
  const selectedBorder = motifBorderOptions.find(border => border.id === newSelections.motifborder);
  const margin = selectedBorder ? selectedBorder.margin : 0
  const ppW = newSelections.passepartoutWidth * 2
  const area = (width + margin) * (height + margin)
  const ppArea = (width + margin + ppW) * (height + margin + ppW)

  totalPrice += calculateShippingPrice(referenceProduct, width + margin + ppW, height + margin + ppW, newSelections.frame)

  for (const [key, value] of Object.entries(newSelections)) {
    if (key === 'frame') {
      const selectedFrame = framePrices.find(option => option.id === value)
      if (selectedFrame) {
        const pricing = selectedFrame.pricing[referenceProduct?.category] || selectedFrame.pricing.default
        price = calculateFunction(ppArea, pricing)
        totalPrice += price
      }
    }
    if (key === 'acrylglass') {
      const selectedAcrylGlass = acrylglassPrices.find(option => option.id === value)
      if (selectedAcrylGlass) {
        const pricing = selectedAcrylGlass.pricing[baseProductId] || selectedAcrylGlass.pricing.default
        price = calculateFunction(area, pricing)
        totalPrice += price
      }
    }
    if (key === 'paper') {
      const selectedPaper = paperPrices.find(option => option.id === value)
      if (selectedPaper) {
        const pricing = selectedPaper.pricing[baseProductId] || selectedPaper.pricing.default
        price = calculateFunction(area, pricing)
        totalPrice += price
      }
    }
    if (key === 'passepartoutWidth') {
      const selectedPassepartoutWidth = passepartoutWidths.find(option => option.id === value)
      if (selectedPassepartoutWidth) {
        const pricing = {
          functionType: 'asymmetricalSigmoidal',
          surcharge: extraCharge,
          parameters: { a: 73.86714, b: 1.065924, c: 93934460, d: -2.957115, f: 244846.8 }
        }
        price = calculateFunction(ppArea - area, pricing)
        totalPrice += price
      }
    }
    if (key === 'passepartoutColor') {
      const selectedPassepartoutColor = passepartoutColorPrices.find(option => option.id === value)
      if (selectedPassepartoutColor) {
        const pricing = selectedPassepartoutColor.pricing[baseProductId] || selectedPassepartoutColor.pricing.default
        price = calculateFunction(ppArea, pricing)
        totalPrice += price
      }
    }
    if (key === 'lamination') {
      const selectedLamination = laminationPrices.find(option => option.id === value)
      if (selectedLamination) {
        const pricing = selectedLamination.pricing[baseProductId] || selectedLamination.pricing.default
        price = calculateFunction(area, pricing)
        totalPrice += price
      }
    }
    if (key === 'materialfinish') {
      const selectedMaterialFinish = materialFinishPrices.find(option => option.id === value)
      if (selectedMaterialFinish) {
        const pricing = selectedMaterialFinish.pricing[baseProductId] || selectedMaterialFinish.pricing.default
        price = calculateFunction(area, pricing)
        totalPrice += price
      }
    }
    if (key === 'glass') {
      const selectedGlass = glassPrices.find(option => option.id === value)
      if (selectedGlass) {
        const pricing = selectedGlass.pricing[baseProductId] || selectedGlass.pricing.default
        price = calculateFunction(ppArea, pricing)
        totalPrice += price
      }
    }
    if (key === 'hanginghardware') {
      const selectedHangingHardware = hangingHardwarePrices.find(option => option.id === value)
      if (selectedHangingHardware) {
        const pricing = selectedHangingHardware.pricing[baseProductId] || selectedHangingHardware.pricing.default
        price = calculateFunction(area, pricing)
        totalPrice += price
      }
    }
    if (key === 'imagecarrier') {
      const selectedImageCarrier = imageCarrierPrices.find(option => option.id === value)
      if (selectedImageCarrier) {
        const pricing = selectedImageCarrier.pricing[baseProductId] || selectedImageCarrier.pricing.default
        price = calculateFunction(area, pricing)
        totalPrice += price
      }
    }
    if (key === 'stretcherframe') {
      const selectedStretcherFrame = stretcherFramePrices.find(option => option.id === value)
      if (selectedStretcherFrame) {
        const pricing = selectedStretcherFrame.pricing[baseProductId] || selectedStretcherFrame.pricing.default
        price = calculateFunction(area, pricing)
        totalPrice += price
      }
    }
    if (key === 'motifborder') {
      const selectedBorder = motifBorderPrices.find(option => option.id === value)
      if (selectedBorder) {
        if (baseProductId === 'framed9') {
          const motifborderBaseReference = getMotifborderBaseReference(newSelections.imagecarrier, newSelections.paper)
          const pricing = selectedBorder.pricing[motifborderBaseReference] || selectedBorder.pricing.default
          price = calculateFunction(area, pricing)
          totalPrice += price
        } else {
          const pricing = selectedBorder.pricing[baseProductId] || selectedBorder.pricing.default
          price = calculateFunction(area, pricing)
          totalPrice += price
        }
      }
    }
  }
  return totalPrice
}

const fetchCountry = async (orderId: string): Promise<{country: string}|undefined> => {
  const payload = {
    ddd: process.env.WIX_HTTP_KEY,
    orderId: orderId
  }
  try {
    const response = await fetch(('https://canvasnova.com/_functions/shippingCountry'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Fehler bei der Preisberechnung');

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { newSelections, artworkInfos, country, isCalculated } = req.body
    let newCountry = country
    let nowCalculated = isCalculated

    if (!isCalculated) {
      const result = await fetchCountry(artworkInfos.orderId)
      newCountry = result?.country
      nowCalculated = true
    }

    if (!newSelections || !artworkInfos) {
      return res.status(400).json({ message: 'All parameters are required.' });
    }

    const totalPrice = calculateTotalPrice(newSelections, artworkInfos.format)
    let finalPrice = totalPrice

    if (newSelections.product !== 'digital1') {
      const netPrice = totalPrice / 1.19
      const tax = vatRules.find(v => v.id === newCountry)?.factor || 1
      finalPrice = parseFloat((netPrice * tax).toFixed(2))
    }

    res.status(200).json({ price: finalPrice, country: newCountry, isCalculated: nowCalculated })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}