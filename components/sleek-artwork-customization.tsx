'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { ShoppingCart, Info, X, ArrowLeft, Check, ChevronRight, ChevronLeft, Loader } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { TailSpin } from 'react-loader-spinner'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import parse from 'html-react-parser'

import { useTranslation } from 'react-i18next'
import * as dialog from '@radix-ui/react-dialog'

// Font import
import { Syne } from 'next/font/google'

// Initialize the font
const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

import { DetailedDescription, Selections, ArtworkResponse, ArtworkInfos, Product, FrameCategory, Frame, Paper, ImageCarrier } from '@/data/options.types'
import { products, productCategories } from '@/data/products'
import { frameCategories, frameOptions, frameColorOptions } from '@/data/frames'
import { paperOptions, laminationOptions } from '@/data/papers'
import { sizeOptions, mountingOptions, imageCarrierOptions, passepartoutColors, passepartoutWidths, acrylglassOptions, glassOptions, materialFinishOptions, hangingHardwareOptions } from '@/data/other-options'
import { motifBorderOptions, cornersOptions, stretcherFrameOptions, sideAppearanceOptions } from '@/data/final-steps'

import '@/i18n';
import i18n from '@/i18n'

const largestSizes = {
  landscape: { width: 80, height: 45 },
  portrait: { width: 45, height: 80 },
  square: { width: 60, height: 60 },
}

const countryVAT = [
  { id: 'DE', vat: '19%' },
  { id: 'AT', vat: '20%' },
  { id: 'CH', vat: '8.1%' }
]

const stepNames = [
  { id: 'product', name: 'stepNames.product.name' },
  { id: 'size', name: 'stepNames.size.name' },
  { id: 'mounting', name: 'stepNames.mounting.name' },
  { id: 'imagecarrier', name: 'stepNames.imagecarrier.name' },
  { id: 'frame', name: 'stepNames.frame.name', moreDetailed: 'stepNames.frame.moreDetailed' },
  { id: 'passepartoutcw', name: 'stepNames.passepartoutcw.name', moreDetailed: 'stepNames.passepartoutcw.moreDetailed' },
  { id: 'acrylglass', name: 'stepNames.acrylglass.name' },
  { id: 'paper', name: 'stepNames.paper.name' },
  { id: 'lamination', name: 'stepNames.lamination.name' },
  { id: 'materialfinish', name: 'stepNames.materialfinish.name' },
  { id: 'glass', name: 'stepNames.glass.name' },
  { id: 'hanginghardware', name: 'stepNames.hanginghardware.name' },
  { id: 'motifborder', name: 'stepNames.motifborder.name' },
  { id: 'corners', name: 'stepNames.corners.name' },
  { id: 'stretcherframe', name: 'stepNames.stretcherframe.name' },
  { id: 'sideappearance', name: 'stepNames.sideappearance.name' },
  { id: 'summary', name: 'stepNames.summary.name' },
  { id: 'passepartoutColor', name: 'stepNames.passepartoutColor.name' },
  { id: 'passepartoutWidth', name: 'stepNames.passepartoutWidth.name' },
  { id: 'frameColor', name: 'stepNames.frameColor.name' },
]

const fetchArtworkInfos = async (pt_id: string, mg_id: string): Promise<ArtworkInfos> => {
  try {
    const response = await fetch('/api/artwork-infos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pt_id, mg_id }),
    });

    if (!response.ok) throw new Error('Fehler bei der Preisberechnung');

    const data = await response.json();

    return data
  } catch (error) {
    console.error(error);
    return { orderId: '', format: '' };
  }
}

//eyJtZyI6Im1QS1NLb2JIYkxlbHlyIiwicHQiOiJBV1FTTHZrdDZwR2xhUSIsImltZyI6bnVsbH0=

export function SleekArtworkCustomization() {
  const [artworkInfos, setArtworkInfos] = useState<ArtworkInfos>({ orderId: '', format: '' })
  const [initialFormat, setFormat] = useState<string>('landscape')
  const [hasError, setHasError] = useState<boolean>(false)
  const searchParams = useSearchParams()

  const { t } = useTranslation()
  const { i18n } = useTranslation()

  // Versuche, den "data"-Parameter zu parsen
  const parsedData = useMemo(() => {
    const encoded = searchParams?.get('data');
    if (!encoded) {
      return null;
    }
    try {
      const decoded = atob(encoded);
      return JSON.parse(decoded);
    } catch (error) {
      console.error("Error parsing URL parameter 'data':", error);
      return null;
    }
  }, [searchParams]);

  // Falls parsedData null ist, gab es einen Fehler beim Parsen.
  useEffect(() => {
    if (!parsedData) {
      setHasError(true);
    }
  }, [parsedData]);

  const imageId = parsedData?.mg;
  const parent = parsedData?.pt;  

  const lang = searchParams?.get('lang') || 'de'
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    if (imageId && parent) {
      fetchArtworkInfos(parent, imageId)
        .then((data) => {
          if (!data.format || data.format === '') {
            setHasError(true);
          } else {
            setArtworkInfos(data);
            setFormat(data.format);
          }
        })
        .catch((error) => {
          console.error(error);
          setHasError(true);
        });
    }
  }, [parent, imageId])

  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Selections>({
    product: '',
    size: '',
    mounting: '',
    imagecarrier: '',
    stretcherframe: '',
    sideappearance: '',
    frame: '',
    frameColor: '',
    passepartoutColor: '',
    passepartoutWidth: 0,
    acrylglass: '',
    paper: '',
    lamination: '',
    materialfinish: '',
    glass: '',
    hanginghardware: '',
    motifborder: '',
    corners: '',
  })
  const [totalPrice, setTotalPrice] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [overallWidth, setOverallWidth] = useState(0)
  const [overallHeight, setOverallHeight] = useState(0)
  const [artworkWidth, setArtworkWidth] = useState(0)
  const [artworkHeight, setArtworkHeight] = useState(0)
  const [motifborderMargin, setMotifborderMargin] = useState(0)
  const [passepartoutMargin, setPassepartoutMargin] = useState(0)

  const currentProduct = products.find(p => p.id === selections.product)
  //const steps = currentProduct ? ['product', ...currentProduct.steps] : ['product']

  const [steps, setSteps] = useState<string[]>(['product'])
  //setSteps(currentProduct ? ['product', ...currentProduct.steps] : ['product'])

  const [limitWidth, setLimitWidth] = useState(Infinity);
  const [limitHeight, setLimitHeight] = useState(Infinity);
  const [minWidth, setMinWidth] = useState(0);
  const [minHeight, setMinHeight] = useState(0);

  const [frameWidth, setFrameWidth] = useState(0)

  const [hasVisitedSummary, setHasVisitedSummary] = useState<boolean>(false)

  const [country, setCountry] = useState<string>('DE')
  const [isCountryCalculated, setIsCountryCalculated] = useState<boolean>(false)

  useEffect(() => {
    if (steps[currentStep] === 'summary') {
      setHasVisitedSummary(true)
    } 
  }, [currentStep, steps])

  const fetchPrice = async (
    newSelections: Selections,
    artworkInfos: ArtworkInfos,
    country: string,
    isCalculated: boolean
  ): Promise<number> => {
    try {
      const response = await fetch('/api/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newSelections, artworkInfos, country, isCalculated }),
      });
  
      if (!response.ok) throw new Error('Fehler bei der Preisberechnung');
  
      const data = await response.json();

      if (country !== data.country) {
        setCountry(data.country)
      }
      if (isCalculated !== data.isCalculated) {
        setIsCountryCalculated(data.isCalculated)
      }
      const totalPrice = data.price
      return totalPrice ?? 0;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const fetchArtwork = async (id: string, format: string, physicalWidth: number, physicalHeight: number, overallPhysicalWidth: number, overallPhysicalHeight: number, newSelections: JSON): Promise<ArtworkResponse | null> => {
    try {
      const response = await fetch('/api/artwork-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, format, physicalWidth, physicalHeight, overallPhysicalWidth, overallPhysicalHeight, newSelections }),
      })

      if (!response.ok) throw new Error('Fehler beim Abrufen des bearbeiteten Bildes');
  
      const data = await response.json();
      const watermarkedUrl = `data:image/jpeg;base64,${data.watermarkedImage}`

      if (data.finalImage) {
        const finalUrl = `data:image/jpeg;base64,${data.finalImage}`
        return { watermarkedUrl, finalUrl }
      }

      return { watermarkedUrl }
    } catch (error) {
      console.error(error);
      return null
    }
  }

  const updateLimits = (newSelections) => {
    //if (!currentProduct) return;
  
    // Start with product's max size
    const prodS = products.find(p => p.id === newSelections.product)

    if(!prodS) return

    const { maxSize } = prodS
    let newLimitWidth = maxSize[initialFormat].width
    let newLimitHeight = maxSize[initialFormat].height

    let newMinWidth = 0
    let newMinHeight = 0
  
    //Check mounting conditions
    if (prodS.category === 'framed') {
      if (newSelections.mounting != ''){
        const relevantProduct = products.find(p => p.id === newSelections.mounting)
        if (relevantProduct) {
          const { maxSize } = relevantProduct
          const mountingMaxWidth = maxSize[initialFormat].width
          const mountingMaxHeight = maxSize[initialFormat].height
          newLimitWidth = Math.min(newLimitWidth, mountingMaxWidth)
          newLimitHeight = Math.min(newLimitHeight, mountingMaxHeight)
        }
      }
    }

    //Check immagecarrier conditions
    if (prodS.id === 'framed9') {
      const relevantImageCarrier = imageCarrierOptions.find(i => i.id === newSelections.imagecarrier)
      if (relevantImageCarrier) {
        const { maxSize } = relevantImageCarrier?.conditions
        const immageCarrierMaxWidth = maxSize[initialFormat].width
        const immageCarrierMaxHeight = maxSize[initialFormat].height
        newLimitWidth = Math.min(newLimitWidth, immageCarrierMaxWidth)
        newLimitHeight = Math.min(newLimitHeight, immageCarrierMaxHeight)
      }
    }

    //Check framed passe-partout condition
    if ((prodS?.category === 'photoprint' || prodS?.category === 'giclee') && newSelections.frame != 'noframe') {
      const ppCondition = products.find(p => p.id === 'passe-partout1')
      if (ppCondition) {
        const { maxSize } = ppCondition
        const ppWidth = maxSize[initialFormat].width
        const ppHeight = maxSize[initialFormat].height
        newLimitWidth = Math.min(newLimitWidth, ppWidth)
        newLimitHeight = Math.min(newLimitHeight, ppHeight)
      }
    }

    // Check frame conditions
    const selectedFrame = frameOptions.find(frame => frame.id === newSelections.frame);
    if (selectedFrame) {
      const { conditions } = selectedFrame;
      const frameMaxWidth = conditions[initialFormat]?.maxWidth || conditions.maxWidth;
      const frameMaxHeight = conditions[initialFormat]?.maxHeight || conditions.maxHeight;
      newLimitWidth = Math.min(newLimitWidth, frameMaxWidth);
      newLimitHeight = Math.min(newLimitHeight, frameMaxHeight);
      newMinWidth = Math.max(newMinWidth, selectedFrame.conditions.minWidth)
      newMinHeight = Math.max(newMinHeight, selectedFrame.conditions.minHeight)
    }
  
    // Check acrylglass conditions
    const selectedAcrylglass = acrylglassOptions.find(acrylglass => acrylglass.id === newSelections.acrylglass);
    if (selectedAcrylglass && selectedAcrylglass.maxSize) {
      const { maxSize } = selectedAcrylglass;
      const acrylglassMaxWidth = maxSize[initialFormat].width;
      const acrylglassMaxHeight = maxSize[initialFormat].height;
      newLimitWidth = Math.min(newLimitWidth, acrylglassMaxWidth);
      newLimitHeight = Math.min(newLimitHeight, acrylglassMaxHeight);
    }

    if (prodS?.category === 'canvas') {
      const productMinWidth = prodS.minSize?.width || 0
      const productMinHeight = prodS.minSize?.height || 0
      newMinWidth = Math.max(newMinWidth, productMinWidth)
      newMinHeight = Math.max(newMinHeight, productMinHeight)
    }

    if (newSelections.mounting === 'canvas-stretcher') {
      const mount = products.find(p => p.id === newSelections.mounting)
      const productMinWidth = mount?.minSize?.width || 0
      const productMinHeight = mount?.minSize?.height || 0
      newMinWidth = Math.max(newMinWidth, productMinWidth)
      newMinHeight = Math.max(newMinHeight, productMinHeight)
    }
  
    setLimitWidth(newLimitWidth);
    setLimitHeight(newLimitHeight);
    setMinWidth(newMinWidth)
    setMinHeight(newMinHeight)
  };

  const handleSelection = (key, value) => {
    setSelections(prev => {
      const newSelections = { ...prev, [key]: value };
      if (key === 'product') {
        setHasVisitedSummary(false)

        //const currentProd = currentProduct
        let val = value
        const currentProd = products.find(p => p.id === val)
        if (currentProd?.steps) setSteps(['product', ...currentProd.steps])

        const defaultMounting = getDefaultMounting(val)
        const newOptionM = { product: val }
        const availableOptionsM = getNewAvailableMountings(newOptionM)

        newSelections.mounting = changePerhapsDefaultOption(selections.mounting, defaultMounting, availableOptionsM)

        const defaultImageCarrier = getDefaultImageCarrier(val)
        const newOptionI = { product: val, width: overallWidth, height: overallHeight }
        const availableOptionsI = getNewAvailableImageCarriers(newOptionI)

        newSelections.imagecarrier = changePerhapsDefaultOption(selections.imagecarrier, defaultImageCarrier, availableOptionsI)

        const selectedImageCarrier = imageCarrierOptions.find(ic => ic.id === newSelections.imagecarrier)

        if (selectedImageCarrier) {
          const newSteps = ['product', 'size', 'imagecarrier', 'frame', ...selectedImageCarrier?.stepsAfterFrame]
          setSteps(newSteps)
        }

        const defaultFrame = getDefaultFrame(val);
        const newOptionF = { product: val, width: overallWidth, height: overallHeight }
        const availableOptionsF = getNewAvailableFrames(newOptionF);

        newSelections.frame = changePerhapsDefaultOption(selections.frame, defaultFrame, availableOptionsF)
        const fr = frameOptions.find(f => f.id === newSelections.frame)
        newSelections.frameColor = fr?.colors[0] || ''

        setFrameWidth(frameOptions.find(f => f.id === newSelections.frame)?.frameWidth || 0)

        if ((currentProd?.category === 'photoprint' || currentProd?.category === 'giclee') && newSelections.frame != 'noframe') {
          const newSteps = currentProd.framedSteps
          setSteps(newSteps || [])
        }

        if (newSelections.mounting != '' && val != 'framed1') {
          if (val != 'framed8') {
            const newSteps = determineSteps(newSelections.mounting)
            setSteps(newSteps)
          }
          val = newSelections.mounting
        }

        const newOptionS = { product: val, frame: newSelections.frame, passepartoutWidth: newSelections.passepartoutWidth, motifborder: newSelections.motifborder }
        const availableOptionsS = getNewAvailableSizes(newOptionS)

        newSelections.size = changePerhapsDefaultOption(selections.size, '', availableOptionsS)

        if (newSelections.mounting === 'passe-partout1') {
          setPassepartoutMargin(8)
        } else {
          setPassepartoutMargin(0)
        }

        if (newSelections.size != '') {
          const defaultPassePartoutW = getDefaultPassePartoutWidth(value, newSelections.mounting, newSelections.imagecarrier, artworkWidth, artworkHeight, newSelections.frame)
          const defaultPassePartoutC = getDefaultPassePartoutColor(value, newSelections.mounting, newSelections.imagecarrier, newSelections.frame)
          const newOptionPP = { product: value, mounting: newSelections.mounting, frame: newSelections.frame, width: overallWidth, height: overallHeight, artMbWidth: artworkWidth + motifborderMargin, artMbHeight: artworkHeight + motifborderMargin, passepartoutWidth: newSelections.passepartoutWidth }
          const availableOptionsPPW = getNewAvailablePassepartoutWidths(newOptionPP)
          const availableOptionsPPC = getNewAvailablePassepartoutColors(newOptionPP)

          newSelections.passepartoutWidth = changePerhapsDefaultOption(newSelections.passepartoutWidth, defaultPassePartoutW, availableOptionsPPW)
          newSelections.passepartoutColor = changePerhapsDefaultOption(newSelections.passepartoutColor, defaultPassePartoutC, availableOptionsPPC)
          setPassepartoutMargin(newSelections.passepartoutWidth * 2)
          setOverallWidth(artworkWidth + motifborderMargin + newSelections.passepartoutWidth * 2)
          setOverallHeight(artworkHeight + motifborderMargin + newSelections.passepartoutWidth * 2)

          const defaultHangingHardware = getDefaultHangingHardware(newSelections.product, newSelections.frame, overallWidth, overallHeight);
          const newOptionH = { product: value, frame: newSelections.frame, width: overallWidth, height: overallHeight, corners: newSelections.corners }
          const availableOptionsH = getNewAvailableHangingHardwareOptions(newOptionH);
            
          newSelections.hanginghardware = changePerhapsDefaultOption(selections.hanginghardware, defaultHangingHardware, availableOptionsH)
        }

        const defaultAcrylicGlass = getDefaultAcrylGlass(val, newSelections.mounting)
        const newOptionAG = { product: val, width: overallWidth, height: overallHeight, mounting: newSelections.mounting, frame: newSelections.frame}
        const availableOptionsAG = getNewAvailableAcrylglassOptions(newOptionAG)

        newSelections.acrylglass = changePerhapsDefaultOption(newSelections.acrylglass, defaultAcrylicGlass, availableOptionsAG)
        
        const defaultPaper = getDefaultPaper(val)
        const newOptionP = { product: val, mounting: newSelections.mounting }
        const availableOptionsP = getNewAvailablePaperOptions(newOptionP)

        newSelections.paper = changePerhapsDefaultOption(selections.paper, defaultPaper, availableOptionsP)

        const defaultGlass = getDefaultGlass(val)
        const newOptionG = { product: value, mounting: newSelections.mounting, paper: newSelections.paper, frame: newSelections.frame }
        const availableOptionsG = getNewAvailableGlassOptions(newOptionG)

        newSelections.glass = changePerhapsDefaultOption(newSelections.glass, defaultGlass, availableOptionsG)

        const defaultLamination = getDefaultLamination(val, newSelections.mounting, newSelections.frame, newSelections.paper)
        const newOptionL = { product: val, mounting: newSelections.mounting, frame: newSelections.frame, paper: newSelections.paper }
        const availableOptionsL = getNewAvailableLaminationOptions(newOptionL)

        newSelections.lamination = changePerhapsDefaultOption(newSelections.lamination, defaultLamination, availableOptionsL)

        newSelections.materialfinish = getDefaultMaterialFinish(val) || ''
        newSelections.motifborder = getDefaultMotifborder(val) || ''
        newSelections.corners = getDefaultCorners(val) || ''

        setMotifborderMargin(0)

        const defaultStretcherFrame = getDefaultStretcherFrame(value)
        const newOptionSF = { product: value }
        const availableOptionsSF = getNewAvailableStretcherFrames(newOptionSF)

        newSelections.stretcherframe = changePerhapsDefaultOption(selections.stretcherframe, defaultStretcherFrame, availableOptionsSF)

        if (newSelections.stretcherframe != '') {
          setSteps(determineStretcherFrameSteps(newSelections.stretcherframe))
        }

        const defaultSideappearance = getDefaultSideappearance(value)
        const newOptionSA = { product: value }
        const availableSideappearances = getNewAvailableSideappearances(newOptionSA)

        newSelections.sideappearance = changePerhapsDefaultOption(selections.sideappearance, defaultSideappearance, availableSideappearances)

        determinehangingHardwareSteps(value, newSelections.frame)

        if (val === 'digital1') {
          newSelections.passepartoutColor = ''
          newSelections.passepartoutWidth = 0
          newSelections.hanginghardware = ''

          setArtworkWidth(0)
          setArtworkHeight(0)
          setOverallWidth(0)
          setOverallHeight(0)
          setFrameWidth(0)
        }
        
        setCurrentStep(1); // Move to the next step after product selection
      }
      if (key === 'size') {
        const selectedSize = sizeOptions[initialFormat].find(size => size.id === value);

        if (selectedSize) {
          const [width, height] = selectedSize.name.split('x').map(dim => parseInt(dim.trim()));
          const newOverallWidth = width + motifborderMargin + passepartoutMargin
          const newOverallHeight = height + motifborderMargin + passepartoutMargin
          setOverallWidth(newOverallWidth);
          setOverallHeight(newOverallHeight);
          setArtworkWidth(width);
          setArtworkHeight(height);

          if ((currentProduct?.category === 'photoprint' || currentProduct?.category === 'giclee') && currentProduct.steps && currentProduct.framedSteps) {
            const ppProd = products.find(p => p.id === 'passe-partout1') || currentProduct
            const { maxSize } = ppProd
            if ((width + motifborderMargin + 20) >  maxSize[initialFormat].width && (height + motifborderMargin + 20) > maxSize[initialFormat].height) {
              newSelections.frame = 'noframe'
              newSelections.frameColor = ''
              const newSteps = ['product', ...currentProduct.steps]
              const index = newSteps.indexOf('frame')
              newSteps.splice(index, 1)
              setSteps(newSteps)
            } else if (newSelections.frame === 'noframe') {
              const newSteps = ['product', ...currentProduct.steps]
              setSteps(newSteps)
            } else {
              const newSteps = currentProduct.framedSteps
              setSteps(newSteps)
            }
          }

          const defaultFrame = getDefaultFrame(selections.product);
          const newOptionF = { product: selections.product, width: newOverallWidth, height: newOverallHeight }
          const availableOptionsF = getNewAvailableFrames(newOptionF);

          newSelections.frame = changePerhapsDefaultOption(selections.frame, defaultFrame, availableOptionsF)

          setFrameWidth(frameOptions.find(f => f.id === newSelections.frame)?.frameWidth || 0)

          newSelections.passepartoutWidth = getDefaultPassePartoutWidth(newSelections.product, newSelections.mounting, newSelections.imagecarrier, width, height, newSelections.frame)

          const defaultPassePartoutW = getDefaultPassePartoutWidth(newSelections.product, newSelections.mounting, newSelections.imagecarrier, width, height, newSelections.frame)
          const defaultPassePartoutC = getDefaultPassePartoutColor(newSelections.product, newSelections.mounting, newSelections.imagecarrier, newSelections.frame)
          const newOptionPP = { product: newSelections.product, mounting: newSelections.mounting, frame: newSelections.frame, width: width, height: height, artMbWidth: width + motifborderMargin, artMbHeight: height + motifborderMargin, passepartoutWidth: newSelections.passepartoutWidth }
          const availableOptionsPPW = getNewAvailablePassepartoutWidths(newOptionPP)
          const availableOptionsPPC = getNewAvailablePassepartoutColors(newOptionPP)

          //newSelections.passepartoutWidth = changePerhapsDefaultOption(newSelections.passepartoutWidth, defaultPassePartoutW, availableOptionsPPW)
          newSelections.passepartoutColor = changePerhapsDefaultOption(newSelections.passepartoutColor, defaultPassePartoutC, availableOptionsPPC)
          setPassepartoutMargin(newSelections.passepartoutWidth * 2)

          setOverallWidth(width + motifborderMargin + newSelections.passepartoutWidth * 2)
          setOverallHeight(height + motifborderMargin + newSelections.passepartoutWidth * 2)

          const defaultHangingHardware = getDefaultHangingHardware(newSelections.product, newSelections.frame, newOverallWidth, newOverallHeight);
          const newOptionH = { product: newSelections.frame, frame: newSelections.frame, width: newOverallWidth, height: newOverallHeight, corners: newSelections.corners }
          const availableOptionsH = getNewAvailableHangingHardwareOptions(newOptionH);
            
          newSelections.hanginghardware = changePerhapsDefaultOption(selections.hanginghardware, defaultHangingHardware, availableOptionsH)

          const defaultAcrylicGlass = getDefaultAcrylGlass(selections.product, newSelections.mounting)
          const newOptionG = { product: selections.product, mounting: selections.mounting, width: newOverallWidth, height: newOverallHeight, frame: selections.frame }
          const availableOptionsG = getNewAvailableAcrylglassOptions(newOptionG)

          newSelections.acrylglass = changePerhapsDefaultOption(newSelections.acrylglass, defaultAcrylicGlass, availableOptionsG)
        }
      }
      if (key === 'mounting') {
        if (newSelections.product != 'framed8') {
          const newSteps = determineSteps(value)
          setSteps(newSteps)
        }

        const defaultFrame = getDefaultFrame(value)
        const newOptionF = { product: newSelections.product, mounting: value, width: overallWidth, height: overallHeight }
        const availableOptionsF = getNewAvailableFrames(newOptionF);

        newSelections.frame = changePerhapsDefaultOption(selections.frame, defaultFrame, availableOptionsF)

        setFrameWidth(frameOptions.find(f => f.id === newSelections.frame)?.frameWidth || 0)

        const defaultPassePartoutW = getDefaultPassePartoutWidth(newSelections.product, value, '', artworkWidth, artworkHeight, newSelections.frame)
        const defaultPassePartoutC = getDefaultPassePartoutColor(newSelections.product, value, '', newSelections.frame)
        const newOptionPP = { product: newSelections.product, mounting: value, frame: newSelections.frame, width: overallWidth, height: overallHeight, artMbWidth: artworkWidth + motifborderMargin, artMbHeight: artworkHeight + motifborderMargin, passepartoutWidth: newSelections.passepartoutWidth }
        const availableOptionsPPW = getNewAvailablePassepartoutWidths(newOptionPP)
        const availableOptionsPPC = getNewAvailablePassepartoutColors(newOptionPP)

        newSelections.passepartoutWidth = changePerhapsDefaultOption(newSelections.passepartoutWidth, defaultPassePartoutW, availableOptionsPPW)
        newSelections.passepartoutColor = changePerhapsDefaultOption(newSelections.passepartoutColor, defaultPassePartoutC, availableOptionsPPC)
        setPassepartoutMargin(newSelections.passepartoutWidth * 2)

        setOverallWidth(artworkWidth + motifborderMargin + newSelections.passepartoutWidth * 2)
        setOverallHeight(artworkHeight + motifborderMargin + newSelections.passepartoutWidth * 2)

        const defaultAcrylicGlass = getDefaultAcrylGlass(newSelections.product, value)
        const newOptionA = { product: selections.product, mounting: value, width: overallWidth, height: overallHeight, frame: newSelections.frame}
        const availableOptionsA = getNewAvailableAcrylglassOptions(newOptionA)

        newSelections.acrylglass = changePerhapsDefaultOption(newSelections.acrylglass, defaultAcrylicGlass, availableOptionsA)

        const defaultPaper = getDefaultPaper(value)
        const newOptionP = { product: selections.product, mounting: value }
        const availableOptionsP = getNewAvailablePaperOptions(newOptionP)

        newSelections.paper = changePerhapsDefaultOption('', defaultPaper, availableOptionsP)

        const defaultGlass = getDefaultGlass(value)
        const newOptionG = { product: newSelections.product, mounting: value, paper: newSelections.paper, frame: newSelections.frame }
        const availableOptionsG = getNewAvailableGlassOptions(newOptionG)
        
        newSelections.glass = changePerhapsDefaultOption(newSelections.glass, defaultGlass, availableOptionsG)

        const defaultLamination = getDefaultLamination(newSelections.product, value, newSelections.frame, newSelections.paper)
        const newOptionL = { product: selections.product, mounting: value, frame: newSelections.frame, paper: newSelections.paper }
        const availableOptionsL = getNewAvailableLaminationOptions(newOptionL)

        newSelections.lamination = changePerhapsDefaultOption(selections.lamination, defaultLamination, availableOptionsL)

        newSelections.materialfinish = getDefaultMaterialFinish(value) || ''
      }
      if (key === 'imagecarrier') {
        let newMotifborderMargin = motifborderMargin
        const selectedImageCarrier = imageCarrierOptions.find(ic => ic.id === value)

        if (selectedImageCarrier) {
          const newSteps = ['product', 'size', 'imagecarrier', 'frame', ...selectedImageCarrier?.stepsAfterFrame]
          setSteps(newSteps)
        }

        const defaultPassePartoutW = getDefaultPassePartoutWidth(newSelections.product, '', value, artworkWidth, artworkHeight, newSelections.frame)
        const defaultPassePartoutC = getDefaultPassePartoutColor(newSelections.product, '', value, newSelections.frame)
        const newOptionPP = { product: newSelections.product, mounting: '', imagecarrier: value, frame: newSelections.frame, width: overallWidth, height: overallHeight, artMbWidth: artworkWidth + motifborderMargin, artMbHeight: artworkHeight + motifborderMargin, passepartoutWidth: newSelections.passepartoutWidth }
        const availableOptionsPPW = getNewAvailablePassepartoutWidths(newOptionPP)
        const availableOptionsPPC = getNewAvailablePassepartoutColors(newOptionPP)

        newSelections.passepartoutWidth = changePerhapsDefaultOption(newSelections.passepartoutWidth, defaultPassePartoutW, availableOptionsPPW)
        newSelections.passepartoutColor = changePerhapsDefaultOption(newSelections.passepartoutColor, defaultPassePartoutC, availableOptionsPPC)
        setPassepartoutMargin(newSelections.passepartoutWidth * 2)

        if (value === 'imagecarrier3' && newSelections.motifborder === 'noborder') {
          newSelections.motifborder = 'border1'
          newMotifborderMargin = 2
          setMotifborderMargin(newMotifborderMargin)
        }

        setOverallWidth(artworkWidth + newMotifborderMargin + (newSelections.passepartoutWidth * 2))
        setOverallHeight(artworkHeight + newMotifborderMargin + (newSelections.passepartoutWidth * 2))

        const defaultPaper = getDefaultPaper(newSelections.product)
        const newOptionP = { product: newSelections.product, imagecarrier: value }
        const availableOptionsP = getNewAvailablePaperOptions(newOptionP)

        newSelections.paper = changePerhapsDefaultOption(newSelections.paper, defaultPaper, availableOptionsP)
      }
      if (key === 'frame') {
        if (value === 'noframe') {
          // Reset frameColor if 'No frame' is selected
          newSelections.frameColor = ''

          if (currentProduct?.category === 'photoprint' || currentProduct?.category === 'giclee') {
            if (currentProduct.steps) setSteps(['product', ...currentProduct?.steps])

            newSelections.passepartoutWidth = 0
            newSelections.passepartoutColor = ''
            setPassepartoutMargin(0)
            setOverallWidth(artworkWidth + motifborderMargin)
            setOverallHeight(artworkHeight + motifborderMargin)

            const defaultLamination = getDefaultLamination(newSelections.product, newSelections.mounting, value, newSelections.paper)
            const newOptionL = { product: selections.product, mounting: newSelections.mounting, frame: value, paper: newSelections.paper }
            const availableOptionsL = getNewAvailableLaminationOptions(newOptionL)

            newSelections.lamination = changePerhapsDefaultOption(selections.lamination, defaultLamination, availableOptionsL)

            newSelections.glass = ''

            if ((newSelections.paper === 'hwilliamturner' || newSelections.paper === 'hphotorag') && newSelections.motifborder === 'noborder') {
              newSelections.motifborder = 'border1'
            }
          }

          /*if (currentProduct?.category === 'acrylic' || currentProduct?.category === 'metal') {
            const newSteps = ['product', ...currentProduct.steps]
            setSteps(newSteps)
          }*/
        } else {
          // Set a default color or retain the current selection
          const selectedFrame = frameOptions.find(frame => frame.id === value)
          if (selectedFrame && selectedFrame.colors.length > 0) {
            newSelections.frameColor = selectedFrame.colors[0] // Default to the first available color
          }

          if (currentProduct?.category === 'photoprint' || currentProduct?.category === 'giclee') {
            setSteps(currentProduct?.framedSteps || [])
            const defaultPassePartoutW = getDefaultPassePartoutWidth(newSelections.product, '', '', artworkWidth, artworkHeight, value)
            const defaultPassePartoutC = getDefaultPassePartoutColor(newSelections.product, '', '', value)
            const newOptionPP = { product: newSelections.product, mounting: '', imagecarrier: '', frame: value, width: artworkWidth, height: artworkHeight, artMbWidth: artworkWidth + motifborderMargin, artMbHeight: artworkHeight + motifborderMargin, passepartoutWidth: newSelections.passepartoutWidth }
            const availableOptionsPPW = getNewAvailablePassepartoutWidths(newOptionPP)
            const availableOptionsPPC = getNewAvailablePassepartoutColors(newOptionPP)

            newSelections.passepartoutWidth = changePerhapsDefaultOption(newSelections.passepartoutWidth, defaultPassePartoutW, availableOptionsPPW)
            newSelections.passepartoutColor = changePerhapsDefaultOption(newSelections.passepartoutColor, defaultPassePartoutC, availableOptionsPPC)
            setPassepartoutMargin(newSelections.passepartoutWidth * 2)
            setOverallWidth(artworkWidth + motifborderMargin + (newSelections.passepartoutWidth * 2))
            setOverallHeight(artworkHeight + motifborderMargin + (newSelections.passepartoutWidth * 2))

            newSelections.lamination = ''

            const newOptionG = { product: newSelections.product, paper: newSelections.paper, frame: value}
            const availableOptionsG = getNewAvailableGlassOptions(newOptionG)
            newSelections.glass = changePerhapsDefaultOption(newSelections.glass, 'glossyfloat', availableOptionsG)
          }

          /*if (currentProduct?.category === 'acrylic' || currentProduct?.category === 'metal') {
            if (value != 'aslimline') {
              const newSteps = ['product', ...currentProduct.steps]
              const index = newSteps.indexOf('hanginghardware')
              newSteps.splice(index, 1)
              setSteps(newSteps)
            } else {
              const newSteps = ['product', ...currentProduct.steps]
              setSteps(newSteps)
            }
          }*/
        }
        // Only update hanging hardware when necessary
        const defaultHangingHardware = getDefaultHangingHardware(newSelections.product, value, overallWidth, overallHeight);
        const newOptionH = { product: newSelections.product, frame: value, width: overallWidth, height: overallHeight, corners: newSelections.corners }
        const availableOptionsH = getNewAvailableHangingHardwareOptions(newOptionH);
          
        newSelections.hanginghardware = changePerhapsDefaultOption(selections.hanginghardware, defaultHangingHardware, availableOptionsH)

        const defaultAcrylicGlass = getDefaultAcrylGlass(selections.product, newSelections.mounting)
        const newOptionG = { product: selections.product, width: overallWidth, height: overallHeight, mounting: newSelections.mounting, frame: value}
        const availableOptionsG = getNewAvailableAcrylglassOptions(newOptionG)

        newSelections.acrylglass = changePerhapsDefaultOption(selections.acrylglass, defaultAcrylicGlass, availableOptionsG)

        determinehangingHardwareSteps(newSelections.product, value)

        if (value != 'noframe' || value != '') {
          newSelections.corners = 'normalcorners'
        }

        setFrameWidth(frameOptions.find(f => f.id === value)?.frameWidth || 0)
      }
      if (key === 'passepartoutWidth') {
        const newOverallWidth = artworkWidth + motifborderMargin + (value * 2)
        const newOverallHeight = artworkHeight + motifborderMargin + (value * 2)
        setOverallWidth(newOverallWidth)
        setOverallHeight(newOverallHeight)
        setPassepartoutMargin(value * 2)
      }
      if (key === 'paper') {
        const defaultLamination = getDefaultLamination(selections.product, newSelections.mounting, selections.frame, value)
        const newOptionL = { product: selections.product, mounting: newSelections.mounting, frame: selections.frame, paper: value }
        const availableOptionsL = getNewAvailableLaminationOptions(newOptionL)

        newSelections.lamination = changePerhapsDefaultOption(selections.lamination, defaultLamination, availableOptionsL)

        if (newSelections.frame === 'noframe') {
          if (newSelections.motifborder === 'noborder' && (value === 'hwilliamturner' || value === 'hphotorag')) {
            newSelections.motifborder = 'border1'
            const newOverallWidth = artworkWidth + 2 + passepartoutMargin
            const newOverallHeight = artworkHeight + 2 + passepartoutMargin
            setOverallWidth(newOverallWidth)
            setOverallHeight(newOverallHeight)
            setMotifborderMargin(2)
          }
        }
      }
      if (key === 'motifborder') {
        const selectedBorder = motifBorderOptions.find(border => border.id === value);
        const margin = selectedBorder ? selectedBorder.margin : 0;
    
        // Update overall dimensions
        const newOverallWidth = artworkWidth + margin + passepartoutMargin
        const newOverallHeight = artworkHeight + margin + passepartoutMargin
        setOverallWidth(newOverallWidth);
        setOverallHeight(newOverallHeight);
        setMotifborderMargin(margin)

        // Update default hanging hardware based on new dimensions
        const defaultHangingHardware = getDefaultHangingHardware(newSelections.product, newSelections.frame, newOverallWidth, newOverallHeight);
        const newOptionH = { product: newSelections.product, frame: newSelections.frame, width: newOverallWidth, height: newOverallHeight, corners: newSelections.corners }
        const availableOptionsH = getNewAvailableHangingHardwareOptions(newOptionH);
          
        newSelections.hanginghardware = changePerhapsDefaultOption(selections.hanginghardware, defaultHangingHardware, availableOptionsH)

        const defaultAcrylicGlass = getDefaultAcrylGlass(selections.product, newSelections.mounting)
        const newOptionG = { product: selections.product, mounting: newSelections.mounting, width: newOverallWidth, height: newOverallHeight, frame: selections.frame}
        const availableOptionsG = getNewAvailableAcrylglassOptions(newOptionG)

        newSelections.acrylglass = changePerhapsDefaultOption(newSelections.acrylglass, defaultAcrylicGlass, availableOptionsG)

        if (value != 'noborder' || value != '') {
          newSelections.corners = 'normalcorners'
        }

        const defaultPassePartoutC = getDefaultPassePartoutColor(newSelections.product, newSelections.mounting, newSelections.imagecarrier, newSelections.frame)
        const newOptionPP = { product: newSelections.product, mounting: newSelections.mounting, frame: newSelections.frame, artMbWidth: artworkWidth + margin, artMbHeight: artworkHeight + margin, passepartoutWidth: newSelections.passepartoutWidth }
        const availableOptionsPPC = getNewAvailablePassepartoutColors(newOptionPP)
        newSelections.passepartoutColor = changePerhapsDefaultOption(newSelections.passepartoutColor, defaultPassePartoutC, availableOptionsPPC)
    
        /*// Check if current frame is still valid
        const currentFrame = frameOptions.find(frame => frame.id === selections.frame);
        if (currentFrame) {
          const { conditions } = currentFrame;
          const minCondition = newOverallWidth >= conditions.minWidth && newOverallHeight >= conditions.minHeight;
          let maxCondition = true;
    
          if (conditions.landscape && initialFormat === 'landscape') {
            maxCondition = newOverallWidth <= conditions.landscape.maxWidth && newOverallHeight <= conditions.landscape.maxHeight;
          } else if (conditions.portrait && initialFormat === 'portrait') {
            maxCondition = newOverallWidth <= conditions.portrait.maxWidth && newOverallHeight <= conditions.portrait.maxHeight;
          } else if (conditions.square && initialFormat === 'square') {
            maxCondition = newOverallWidth <= conditions.square.maxWidth && newOverallHeight <= conditions.square.maxHeight;
          } else if (conditions.maxWidth && conditions.maxHeight) {
            maxCondition = newOverallWidth <= conditions.maxWidth && newOverallHeight <= conditions.maxHeight;
          }
    
          // If current frame does not meet conditions, reset to 'noframe'
          if (!minCondition || !maxCondition) {
            setSelections(prev => ({ ...prev, frame: 'noframe', frameColor: '' }));
          }
        
        }*/
      }
      if (key === 'stretcherframe') {
        /*if (value != 'stretcherframe1') {
          const newSteps = ['product', 'size', 'stretcherframe', 'sideappearance']
          setSteps(newSteps)
        } else {
          const newSteps = ['product', 'size', 'stretcherframe', 'sideappearance', 'frame']
          setSteps(newSteps)
        }*/

        setSteps(determineStretcherFrameSteps(value))
      }
      updateLimits(newSelections)

      fetchPrice(newSelections, artworkInfos, country, isCountryCalculated).then((totalPrice) => setTotalPrice(totalPrice))

      return newSelections;
    });
  }

  const changePerhapsDefaultOption = (currentSelection, defaultOption, availableOptions) => {
    if (!availableOptions.some(option => option.id === currentSelection)) {
      return defaultOption
    }
    return currentSelection
  }

  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0))
  }
  
  const nextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length - 1))
  }

  const addToCart = () => {
    const jsonData = {
      selections: selections,
      format: initialFormat,
      aw: imageId,
      shippingCountry: country
    }
    const encodedData = btoa(JSON.stringify(jsonData))

    if (window.top !== window.self && window.top) {
      window.top.location.href = `https://canvasnova.com/${lang === 'de' ? '' : lang}/configurator/finalize?data=${encodedData}`
    } else {
      window.location.href = `https://canvasnova.com/${lang === 'de' ? '' : lang}/configurator/finalize?data=${encodedData}`
    }
  }

  const getAspectRatio = (format: string) => {
    switch (format) {
      case 'landscape': return '16 / 9'
      case 'portrait': return '9 / 16'
      case 'square': return '1 / 1'
      default: return '16 / 9'
    }
  }

  const getObjectFit = (format: string) => {
    return format === 'landscape' ? 'cover' : 'contain'
  }

  const determineSteps = (mountingId) => {
    const baseSteps = ['product', 'size', 'mounting', 'frame'];
    
    let additionalSteps = ['']
    
    switch (mountingId) {
      case 'passe-partout1':
        additionalSteps = ['passepartoutcw', 'paper', 'glass', 'motifborder', 'summary'];
        break;
      case 'acrylic1':
      case 'acrylic2':
      case 'acrylic3':
      case 'acrylic4':
      case 'acrylic5':
      case 'acrylic6':
        additionalSteps = ['acrylglass', 'paper', 'motifborder', 'summary'];
        break;
      case 'aludibond6':
      case 'aludibond7':
        additionalSteps = ['materialfinish', 'motifborder', 'summary'];
        break;
      case 'aludibond2':
      case 'aludibond3':
      case 'aludibond4':
        additionalSteps = ['paper', 'lamination', 'motifborder', 'summary'];
        break;
      case 'aludibond1':
        additionalSteps = ['motifborder', 'summary']
        break
      case 'aludibond5':
        additionalSteps = ['paper', 'motifborder', 'summary']
        break
      case 'canvas-stretcher':
        additionalSteps = ['paper', 'summary']
        break
      default:
        break;
    }
    
    return [...baseSteps, ...additionalSteps];
  }

  const determinehangingHardwareSteps = (productId, frameId) => {
    const currentProd = products.find(p => p.id === productId)
    if ((currentProd?.category === 'acrylic' || currentProd?.category === 'metal' || currentProd?.id === 'framed8') && currentProd.steps) {
      const newSteps = ['product', ...currentProd.steps]
      if (frameId === 'noframe' || frameId === 'aslimline') {
        setSteps(newSteps)
      } else {
        const index = newSteps.indexOf('hanginghardware')
        newSteps.splice(index, 1)
        setSteps(newSteps)
      }
    }
  }

  const determineStretcherFrameSteps = (stretcherFrameId) => {
    if (stretcherFrameId === '') return steps

    if (stretcherFrameId != 'stretcherframe1') {
      return ['product', 'size', 'stretcherframe', 'sideappearance', 'summary']
    }
    return ['product', 'size', 'stretcherframe', 'sideappearance', 'frame', 'summary']
  }

  function getMaxDimensions(frameId, format) {
    const selectedFrame = frameOptions.find(f => f.id === frameId);
  
    if (!selectedFrame) {
      console.error('Frame not found.');
      return { maxFrameWidth: Infinity, maxFrameHeight: Infinity };
    }
  
    const { conditions } = selectedFrame;
  
    if (conditions[format]) {
      // Format-specific conditions exist
      return {
        maxFrameWidth: conditions[format].maxWidth,
        maxFrameHeight: conditions[format].maxHeight
      };
    } else {
      // General conditions
      return {
        maxFrameWidth: conditions.maxWidth,
        maxFrameHeight: conditions.maxHeight
      };
    }
  }

  const getAvailableSizes = () => {
    if (!currentProduct) return [];

    const selectedFrame = frameOptions.find(frame => frame.id === selections.frame)
    const minWidthCondition = selectedFrame && selections.frame !== 'noframe' ? selectedFrame.conditions.minWidth : 0
    const minHeightCondition = selectedFrame && selections.frame !== 'noframe' ? selectedFrame.conditions.minHeight : 0
    let ppW = passepartoutMargin

    if ((currentProduct?.category === 'photoprint' || currentProduct?.category === 'giclee' || selections.mounting === 'passe-partout1') && selections.frame != 'noframe') {
      ppW = Math.max(ppW, 10)
    }
  
    return sizeOptions[initialFormat].filter(size => {
      if (size.id === 'size1' && currentProduct.category === 'framed') return false

      const [width, height] = size.name.split('x').map(dim => parseInt(dim));
  
      // Check if the size plus the margin is within the maximum allowed dimensions
      return (
        width + motifborderMargin + ppW <= limitWidth && 
        height + motifborderMargin + ppW <= limitHeight && 
        width + motifborderMargin + ppW >= minWidth && 
        height + motifborderMargin + ppW >= minHeight
      )
    });
  };

  const getNewAvailableSizes = (newOption) => {
    const prodS = products.find(p => p.id === newOption.product)

    if (!prodS) return [];

    if (prodS.category === 'digital') return []

    let ppWidth = Infinity
    let ppHeight = Infinity
    
    const { maxSize } = prodS
    const maxWidth = maxSize[initialFormat].width;
    const maxHeight = maxSize[initialFormat].height;

    const selectedBorder = motifBorderOptions.find(border => border.id === newOption.motifborder);
    const margin = selectedBorder ? selectedBorder.margin : 0; // Get margin from selected motif border

    let ppW = newOption.passepartoutWidth * 2

    const selectedFrame = frameOptions.find(frame => frame.id === newOption.frame)
    if (!selectedFrame) return []
    let minWidthCondition = selectedFrame && newOption.frame !== 'noframe' ? selectedFrame.conditions.minWidth : 0
    let minHeightCondition = selectedFrame && newOption.frame !== 'noframe' ? selectedFrame.conditions.minHeight : 0
    const { conditions } = selectedFrame;
    const frameMaxWidth = conditions[initialFormat]?.maxWidth || conditions.maxWidth;
    const frameMaxHeight = conditions[initialFormat]?.maxHeight || conditions.maxHeight;

    if ((prodS?.category === 'photoprint' || prodS?.category === 'giclee') && newOption.frame != 'noframe') {
      const ppCondition = products.find(p => p.id === 'passe-partout1')
      if (ppCondition) {
        const { maxSize } = ppCondition
        ppWidth = maxSize[initialFormat].width
        ppHeight = maxSize[initialFormat].height
        ppW = Math.max(ppW, 8)
      }
    }

    if (prodS?.category === 'canvas' && prodS.minSize) {
      minWidthCondition = Math.max(minWidthCondition, prodS.minSize.width)
      minHeightCondition = Math.max(minHeightCondition, prodS.minSize.height)
    }
  
    return sizeOptions[initialFormat].filter(size => {
      if (size.id === 'size1' && prodS.category === 'framed') return false

      const [width, height] = size.name.split('x').map(dim => parseInt(dim));
  
      // Check if the size plus the margin is within the maximum allowed dimensions
      return (
        width + margin + ppW <= maxWidth && 
        height + margin +ppW <= maxHeight &&
        width + margin + ppW <= frameMaxWidth && 
        height + margin +ppW <= frameMaxHeight &&
        width + margin + ppW >= minWidthCondition && 
        height + margin +ppW >= minHeightCondition &&
        width + margin + ppW <= ppWidth && 
        height + margin +ppW <= ppHeight
      )
    });
  };

  const getAvailableMountings = () => {
    if (!currentProduct) return []
  
    //return mountingOptions.filter(mounting => product.availableMountings.includes(mounting.id))
    const possibleMountings = mountingOptions.filter(mounting => currentProduct.availableMountings?.includes(mounting.id))

    return possibleMountings.filter(mounting => {
      const relevantProduct = products.find(p => p.id === mounting.id)
      if (!relevantProduct) return false

      const { maxSize } = relevantProduct
      const maxWidth = maxSize[initialFormat].width
      const maxHeight = maxSize[initialFormat].height

      let mountingMinWidth = 0
      let mountingMinHeight = 0

      if (mounting.id === 'canvas-stretcher' && relevantProduct.minSize) {
        const { minSize } = relevantProduct
        mountingMinWidth = minSize.width
        mountingMinHeight = minSize.height
      }

      if (mounting.id === 'passe-partout1') {
        return overallWidth + 10 <= maxWidth && overallHeight + 10 <= maxHeight
      }

      return (
        overallWidth <= maxWidth && overallHeight <= maxHeight &&
        overallWidth >= mountingMinWidth && overallHeight >= mountingMinHeight
      )
    })
  }

  const getNewAvailableMountings = (newOptions) => {
    const currentProd = products.find(p => p.id === newOptions.product)
    if (!currentProd || currentProd.category != 'framed' || currentProd.id === 'framed9') return []
  
    //return mountingOptions.filter(mounting => product.availableMountings.includes(mounting.id))
    const possibleMountings = mountingOptions.filter(mounting => currentProd.availableMountings?.includes(mounting.id))

    return possibleMountings.filter(mounting => {
      const relevantProduct = products.find(p => p.id === mounting.id)
      if (!relevantProduct) return false
      const { maxSize } = relevantProduct
      const maxWidth = maxSize[initialFormat].width
      const maxHeight = maxSize[initialFormat].height
      return overallWidth <= maxWidth && overallHeight <= maxHeight
    })
  }

  const getAvailableImageCarriers = () => {
    return imageCarrierOptions.filter(option => {
      const maxSize = option.conditions.maxSize[initialFormat]

      if (option.id === 'imagecarrier2' || option.id === 'imagecarrier4') {
        if (selections.passepartoutWidth === 0) {
          return overallWidth + 8 <= maxSize.width && overallHeight + 8 <= maxSize.height
        }
      }
      
      // Check if the artwork fits within the maximum size for this image carrier
      return overallWidth <= maxSize.width && overallHeight <= maxSize.height
    })
  }

  const getNewAvailableImageCarriers = (newOptions) => {
    if (newOptions.product != 'framed9') return []

    return imageCarrierOptions.filter(option => {
      const maxSize = option.conditions.maxSize[initialFormat]
      
      // Check if the artwork fits within the maximum size for this image carrier
      return newOptions.width <= maxSize.width && newOptions.height <= maxSize.height
    })
  }

  // Function to determine available frames grouped by category
  const getAvailableFramesByCategory = () => {
    if (!currentProduct) return {}

    const relevantId = (currentProduct.category === 'framed' && currentProduct.id != 'framed9') ? selections.mounting : currentProduct.id
  
    const availableFrames = frameOptions.filter(frame => {
      const relevantProduct = products.find(p => p.id === relevantId)
      let minPPW = 0

      if ((relevantProduct?.category === 'photoprint' || relevantProduct?.category === 'giclee') && passepartoutMargin === 0) {
        minPPW = 8
      }

      const { conditions, compatibleProducts } = frame
      const minCondition = overallWidth + minPPW >= conditions.minWidth && overallHeight + minPPW >= conditions.minHeight
      let maxCondition = true
  
      if (initialFormat === 'landscape' && conditions.landscape) {
        maxCondition = overallWidth <= conditions.landscape.maxWidth && overallHeight <= conditions.landscape.maxHeight
      } else if (initialFormat === 'portrait' && conditions.portrait) {
        maxCondition = overallWidth <= conditions.portrait.maxWidth && overallHeight <= conditions.portrait.maxHeight
      } else if (initialFormat === 'square' && conditions.square) {
        maxCondition = overallWidth <= conditions.square.maxWidth && overallHeight <= conditions.square.maxHeight
      } else if (conditions.maxWidth && conditions.maxHeight) {
        maxCondition = overallWidth <= conditions.maxWidth && overallHeight <= conditions.maxHeight
      }
  
      return minCondition && maxCondition && compatibleProducts.includes(currentProduct.id) && compatibleProducts.includes(relevantId)
    })
  
    // Group frames by their category
    const framesByCategory = availableFrames.reduce((acc, frame) => {
      if (!acc[frame.category]) {
        acc[frame.category] = []
      }
      acc[frame.category].push(frame)
      return acc
    }, {})
  
    return framesByCategory
  }

  const getNewAvailableFrames = (newOption) => {
    //if (!newOption.product) return {}

    const currentProd = products.find(p => p.id === newOption.product)
    const relevantId = (currentProd?.category === 'framed' && currentProd.id != 'framed9') ? newOption.mounting : currentProd?.id
  
    const availableFrames = frameOptions.filter(frame => {
      const { conditions, compatibleProducts } = frame
      const minCondition = newOption.width >= conditions.minWidth && newOption.height >= conditions.minHeight
      let maxCondition = true
  
      if (initialFormat === 'landscape' && conditions.landscape) {
        maxCondition = newOption.width <= conditions.landscape.maxWidth && newOption.height <= conditions.landscape.maxHeight
      } else if (initialFormat === 'portrait' && conditions.portrait) {
        maxCondition = newOption.width <= conditions.portrait.maxWidth && newOption.height <= conditions.portrait.maxHeight
      } else if (initialFormat === 'square' && conditions.square) {
        maxCondition = newOption.width <= conditions.square.maxWidth && newOption.height <= conditions.square.maxHeight
      } else if (conditions.maxWidth && conditions.maxHeight) {
        maxCondition = newOption.width <= conditions.maxWidth && newOption.height <= conditions.maxHeight
      }
  
      return minCondition && maxCondition && compatibleProducts.includes(newOption.product) && compatibleProducts.includes(relevantId)
    })
    return availableFrames
  }

  const getAvailablePassepartoutColors = () => {
    const restrictedColors = ['black', 'linen-natural-white', 'linen-ivory', 'linen-black']

    const isLargestSize = artworkWidth + motifborderMargin >= largestSizes[initialFormat].width && artworkHeight + motifborderMargin >= largestSizes[initialFormat].height

    return passepartoutColors.filter(color => {
      // Restrict certain colors if passepartoutWidth is 10 and size is largest
      if (isLargestSize && passepartoutMargin === 20) {
        return !restrictedColors.includes(color.id)
      }
      return true // Otherwise, include all colors
    })
  }

  const getAvailablePassepartoutWidths = () => {
    const restrictedColors = ['black', 'linen-natural-white', 'linen-ivory', 'linen-black']

    const isLargestSize = artworkWidth + motifborderMargin >= largestSizes[initialFormat].width && artworkHeight + motifborderMargin >= largestSizes[initialFormat].height

    return passepartoutWidths.filter(widthOption => {
      const additionalSize = widthOption.id * 2
      const totalWidth = artworkWidth + motifborderMargin + additionalSize
      const totalHeight = artworkHeight + motifborderMargin + additionalSize

      if (isLargestSize && widthOption.id === 10) {
        return !restrictedColors.includes(selections.passepartoutColor);
      }

      return(
        totalWidth <= limitWidth &&
        totalHeight <= limitHeight &&
        totalWidth >= minWidth &&
        totalHeight >= minHeight
      )
    })
  }

  const getNewAvailablePassepartoutColors = (newOption) => {
    const currentProd = products.find(p => p.id === newOption.product)
    const relevantId = (currentProd?.category === 'framed' && currentProd?.id != 'framed9') ? newOption.mounting : currentProd?.id
    const relevantProd = products.find(p => p.id === relevantId)
    if (relevantProd?.category === 'acrylic' || relevantProd?.category === 'metal' || newOption.frame === 'noframe' || relevantId === 'canvas-stretcher' || relevantId === 'framed9') {
      return []
    }

    const restrictedColors = ['black', 'linen-natural-white', 'linen-ivory', 'linen-black']

    const isLargestSize = newOption.artMbWidth >= largestSizes[initialFormat].width && newOption.artMbHeight >= largestSizes[initialFormat].height

    return passepartoutColors.filter(color => {
      // Restrict certain colors if passepartoutWidth is 10 and size is largest
      if (isLargestSize && newOption.passepartoutWidth === 10) {
        return !restrictedColors.includes(color.id)
      }
      return true // Otherwise, include all colors
    })
  }

  const getNewAvailablePassepartoutWidths = (newOption) => {
    const currentProd = products.find(p => p.id === newOption.product)
    const relevantId = (currentProd?.category === 'framed' && currentProd?.id != 'framed9') ? newOption.mounting : currentProd?.id
    const relevantProd = products.find(p => p.id === relevantId)
    if (relevantProd?.category === 'acrylic' || relevantProd?.category === 'metal' || newOption.frame === 'noframe' || relevantId === 'canvas-stretcher') {
      return []
    }

    if (relevantId === 'framed9') {
      if (newOption.imagecarrier === 'imagecarrier1' || newOption.imagecarrier === 'imagecarrier3') return []
    }

    return passepartoutWidths.filter(widthOption => {
      const additionalSize = widthOption.id * 2
      const totalWidth = newOption.width + motifborderMargin + additionalSize
      const totalHeight = newOption.height + motifborderMargin + additionalSize

      return(
        totalWidth <= limitWidth &&
        totalHeight <= limitHeight
      )
    })
  }

  const getAvailableAcrylglassOptions = () => {
    if (!currentProduct) return []

    const relevantId = currentProduct.category === 'framed' ? selections.mounting : currentProduct.id
    const chosenPaper = paperOptions.find(p => p.id === selections.paper)
    if (!chosenPaper) return []

    return acrylglassOptions.filter(option => {
      const { maxSize } = option
      const productConditionMet = option.conditions.includes(relevantId)
      const frameConditionMet = !option.frameConditions || option.frameConditions.includes(selections.frame)
      const sizeConditionMet = !option.maxSize || (overallWidth <= maxSize[initialFormat].width && overallHeight <= maxSize[initialFormat].height)
      const paperConditionMet = !chosenPaper.acrylicGlassConditions || chosenPaper.acrylicGlassConditions.includes(option.id)

      return productConditionMet && frameConditionMet && sizeConditionMet && paperConditionMet
    })
  }

  const getNewAvailableAcrylglassOptions = (newOptions) => {
    const currentProd = products.find(p => p.id === newOptions.product)
    const prodWithAcryl = currentProd?.defaultOptions.acrylicGlass
    if (prodWithAcryl === '') return []

    const relevantId = (currentProd?.category === 'framed' && currentProd?.id != 'framed9') ? newOptions.mounting : currentProd?.id
    
    return acrylglassOptions.filter(option => {
      const { maxSize } = option
      const productConditionMet = option.conditions.includes(relevantId)
      const frameConditionMet = !option.frameConditions || option.frameConditions.includes(newOptions.frame)
      const sizeConditionMet = !option.maxSize || (overallWidth <= maxSize[initialFormat].width && overallHeight <= maxSize[initialFormat].height)
      const chosenPaper = paperOptions.find(p => p.id === selections.paper)
      let paperConditionMet = true
      if (chosenPaper != undefined){
        paperConditionMet = !chosenPaper.acrylicGlassConditions || chosenPaper.acrylicGlassConditions.includes(option.id)
      }
      return productConditionMet && frameConditionMet && sizeConditionMet && paperConditionMet
    })
  }

  // Function to determine available paper options based on current selections
  const getAvailablePaperOptions = () => {
    if (currentProduct?.id === 'framed9') {
      return paperOptions.filter(paper => {
        const imageCarrierConditions = paper.imageCarrierConditions
        if (imageCarrierConditions){
          return imageCarrierConditions.includes(selections.imagecarrier)
        }
      })
    }

    const relevantId = currentProduct?.category === 'framed' ? selections.mounting : currentProduct?.id
    const relevantProduct = products.find(p => p.id === relevantId)


    return paperOptions.filter(paper => {
      // Check if any of the paper's conditions are met by the current selections
      const conditionMet = paper.conditions.some(condition => relevantId === condition)

      const glassConditionMet = relevantProduct?.category === 'acrylic' ? (!paper.acrylicGlassConditions || paper.acrylicGlassConditions.includes(selections.acrylglass)) : true

      return conditionMet && glassConditionMet
    })
  }

  const getNewAvailablePaperOptions = (newOptions) => {
    if (newOptions.product === 'framed9') {
      return paperOptions.filter(paper => {
        const imageCarrierConditions = paper.imageCarrierConditions
        if (imageCarrierConditions){
          return imageCarrierConditions.includes(newOptions.imagecarrier)
        }
      })
    }

    const currentProd = products.find(p => p.id === newOptions.product)
    const relevantId = currentProd?.category === 'framed' ? newOptions.mounting : currentProd?.id


    return paperOptions.filter(paper => {
      // Check if any of the paper's conditions are met by the current selections
      const conditionMet = paper.conditions.some(condition => relevantId === condition)

      const glassConditionMet = !paper.acrylicGlassConditions || paper.acrylicGlassConditions.includes(selections.acrylglass)

      return conditionMet && glassConditionMet
    })
  }

  // Function to get available lamination options based on current selections
  const getAvailableLaminationOptions = () => {
    const relevantId = currentProduct?.category === 'framed' ? selections.mounting : currentProduct?.id
    if (!relevantId) return []

    if (currentProduct?.category === 'photoprint' && selections.frame != 'noframe') {
      return laminationOptions.filter(l => l.id === 'nolam')
    }

    return laminationOptions.filter(option => 
      option.productConditions.includes(relevantId) &&
      option.paperConditions.includes(selections.paper)
    )
  }

  const getNewAvailableLaminationOptions = (newOptions) => {
    const currentProd = products.find(p => p.id === newOptions.product)
    const relevantId = currentProd?.category === 'framed' ? newOptions.mounting : currentProd?.id
    const relevantProd = products.find(p => p.id === relevantId)

    if (relevantProd?.category === 'photoprint' || relevantProd?.category === 'special') {
      return ['nolam']
    }

    return laminationOptions.filter(option => 
      option.productConditions.includes(relevantId) &&
      option.paperConditions.includes(newOptions.paper)
    )
  }

  const getAvailableGlassOptions = () => {
    return glassOptions.filter(option => {
      const productConditionMet = option.conditions.productConditions.includes(selections.product)
      const mountingConditionMet = option.conditions.productConditions.includes(selections.mounting)
      
      const paperConditionMet = !option.conditions.paperConditions || !option.conditions.paperConditions.includes(selections.paper)
      
      const frameConditionMet = option.conditions.frameCondition !== selections.frame
  
      return (productConditionMet || mountingConditionMet) && paperConditionMet && frameConditionMet
    })
  }

  const getNewAvailableGlassOptions = (newOption) => {
    return glassOptions.filter(option => {
      const productConditionMet = option.conditions.productConditions.includes(newOption.product)
      const mountingConditionMet = option.conditions.productConditions.includes(newOption.mounting)
      
      const paperConditionMet = !option.conditions.paperConditions || !option.conditions.paperConditions.includes(newOption.paper)
      
      const frameConditionMet = option.conditions.frameCondition !== newOption.frame
  
      return (productConditionMet || mountingConditionMet) && paperConditionMet && frameConditionMet
    })
  }

  // Function to determine available hanging hardware options based on current selections
  const getAvailableHangingHardwareOptions = () => {
    return hangingHardwareOptions.filter(option => {
      switch (option.id) {
        case 'nohangingelements':
          return selections.frame === 'noframe' || selections.frame === 'aslimline'

        case 'hangingelements':
          return (
            (overallWidth <= 19 || overallHeight <= 25) &&
            (overallWidth < 26 || overallHeight <= 9)
          )

        case 'rails':
          return (
            (overallWidth >= 20 && overallHeight >= 26) ||
            (overallWidth > 25 && overallHeight > 9)
          )

        case 'cylindricalspacers':
          return (
            selections.frame === 'noframe' &&
            overallWidth <= 100 &&
            overallHeight <= 100 &&
            overallWidth >= 20 &&
            overallHeight >= 20 &&
            selections.corners !== 'stronglyround'
          )

        default:
          return false
      }
    })
  }

  const getNewAvailableHangingHardwareOptions = (newOptions) => {
    const currentProd = products.find(p => p.id === newOptions.product)

    if (currentProd?.category != 'acrylic' && currentProd?.category != 'metal') return []

    if (newOptions.frame != 'noframe' && newOptions.frame != 'aslimline') return []

    return hangingHardwareOptions.filter(option => {
      switch (option.id) {
        case 'nohangingelements':
          return newOptions.frame === 'noframe' || newOptions.frame === 'aslimline'

        case 'hangingelements':
          return (
            (newOptions.width <= 19 || newOptions.height <= 25) &&
            (newOptions.width < 26 || newOptions.height <= 9)
          )

        case 'rails':
          return (
            (newOptions.width >= 20 && newOptions.height >= 26) ||
            (newOptions.width> 25 && newOptions.height > 9)
          )

        case 'cylindricalspacers':
          return (
            newOptions.frame === 'noframe' &&
            newOptions.width <= 100 &&
            newOptions.height <= 100 &&
            newOptions.width >= 20 &&
            newOptions.height >= 20 &&
            newOptions.corners !== 'stronglyround'
          )

        default:
          return false
      }
    })
  }

  // Function to determine available motif border options based on current selections
  const getAvailableMotifBorderOptions = () => {
    const availableBorders = motifBorderOptions.filter(option => {
      if (option.id === 'noborder') {
        // Assuming 'noCanvasStretcher' is a condition to be handled if applicable
        // If 'canvas-stretcher' is not part of selections, you can adjust this condition accordingly

        if (selections.imagecarrier === 'imagecarrier3' || ((selections.paper === 'hwilliamturner' || selections.paper === 'hphotorag') && selections.frame === 'noframe')) return false

        return (
          artworkWidth + passepartoutMargin >= minWidth &&
          artworkHeight + passepartoutMargin >= minHeight
        )
      }

      const margin = option.margin

      return (
        artworkWidth + margin + passepartoutMargin <= limitWidth &&
        artworkHeight + margin + passepartoutMargin <= limitHeight &&
        artworkWidth + margin + passepartoutMargin >= minWidth &&
        artworkHeight + margin + passepartoutMargin >= minHeight
      )
    })

    return availableBorders
  }

  // Function to determine available corners options based on current selections
  const getAvailableCornersOptions = () => {
    // Only show this step if frame is 'noframe' and motifborder is 'noborder'
    if (selections.frame !== 'noframe' || selections.motifborder !== 'noborder') {
      return [cornersOptions[0]]
    }

    return cornersOptions.filter(corner => {
      if (selections.hanginghardware === 'cylindricalspacers' && corner.id === 'stronglyround') return false
      // Check if the current product satisfies the corner's conditions
      return corner.conditions.includes(selections.product)
    })
  }

  const getAvailableStretcherFrames = () => {
    return stretcherFrameOptions.filter(option => {
      // Include options with no frame condition or where the condition matches the selected frame
      return !option.frameCondition || option.frameCondition === selections.frame
    })
  }

  const getNewAvailableStretcherFrames = (newOption) => {
    const currentProd = products.find(p => p.id === newOption.product)

    if (currentProd?.category != 'canvas') {
      return []
    }

    return stretcherFrameOptions.filter(option => {
      // Include options with no frame condition or where the condition matches the selected frame
      return !option.frameCondition || option.frameCondition === selections.frame
    })
  }

  const getNewAvailableSideappearances = (newOption) => {
    const currentProd = products.find(p => p.id === newOption.product)

    if (currentProd?.category != 'canvas') {
      return []
    }
    return sideAppearanceOptions
  }

  const getDefaultMounting = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.mounting
  }

  const getDefaultImageCarrier = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.imagecarrier
  }

  const getDefaultFrame = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.frame //based on mounting and product -> need to change
  }

  const getDefaultPassePartoutWidth = (productId, mountingId, imageCarrierId, width, height, frameId) => {
    const currentProd = products.find(p => p.id === productId)
    const relevantId = (currentProd?.category === 'framed' && currentProd?.id != 'framed9') ? mountingId : currentProd?.id
    const relevantProd = products.find(p => p.id === relevantId)
    if (relevantProd?.category === 'acrylic' || relevantProd?.category === 'metal' || relevantProd?.category === 'canvas' || frameId === 'noframe' || relevantId === 'canvas-stretcher') {
      return 0
    }

    if (relevantId === 'framed9') {
      if (imageCarrierId === 'imagecarrier1' || imageCarrierId === 'imagecarrier3') return 0
    }

    let passepartoutWidth
    switch (initialFormat) {
      case 'landscape':
          // Formula for landscape format based on artwork width
          passepartoutWidth = Math.max(5, Math.round(0.125 * width));
          break;

      case 'square':
          // Formula for square format based on artwork width (or height since it's square)
          passepartoutWidth = Math.max(5, Math.round(0.12 * width));
          break;

      case 'portrait':
          // Formula for portrait format based on artwork height
          passepartoutWidth = Math.max(5, Math.round(0.125 * height));
          break;
    }
    return passepartoutWidth
  }

  const getDefaultPassePartoutColor = (productId, mountingId, imageCarrierId, frameId) => {
    const currentProd = products.find(p => p.id === productId)
    const relevantId = (currentProd?.category === 'framed' && currentProd?.id != 'framed9') ? mountingId : currentProd?.id
    const relevantProd = products.find(p => p.id === relevantId)
    if (relevantProd?.category === 'acrylic' || relevantProd?.category === 'metal' || relevantProd?.category === 'canvas' || frameId === 'noframe' || relevantId === 'canvas-stretcher') {
      return ''
    }

    if (relevantId === 'framed9') {
      if (imageCarrierId === 'imagecarrier1' || imageCarrierId === 'imagecarrier3') return ''
    }

    return 'natural-white'
  }

  const getDefaultAcrylGlass = (productId, mountingId) => {
    if (mountingId != '') {
      return products.find(p => p.id === mountingId)?.defaultOptions.acrylicGlass
    }
    return products.find(p => p.id === productId)?.defaultOptions?.acrylicGlass
  }

  const getDefaultPaper = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.paper
  }

  const getDefaultLamination = (productId, mountingId, frameId, paperId) => {
    let currentProd = products.find(p => p.id === productId)

    if (mountingId != '') {
      currentProd = products.find(p => p.id === mountingId)
    }

    if (currentProd?.category === 'photoprint' && frameId != 'noframe') {
      return ''
    }

    if ((currentProd?.id === 'aludibond2' || currentProd?.id === 'aludibond3') && paperId === 'fcrystalarchivem') {
      return 'mattelam'
    }

    return currentProd?.defaultOptions?.lamination
  }

  const getDefaultMaterialFinish = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.materialfinish
  }

  const getDefaultGlass = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.glass
  }

  const getDefaultHangingHardware = (productId, frameId, width, height) => {
    const currentProd = products.find(p => p.id === productId)
    if ((currentProd?.category === 'acrylic' || currentProd?.category === 'metal' || currentProd?.id === 'framed8') && (frameId === 'noframe' || frameId === 'aslimline')) {
      if ((width <= 19 || height <= 25) && (width < 26 || height <= 9)) {
        return 'hangingelements';
      } else if ((width >= 20 && height >= 26) || (width > 25 && height > 9)) {
        return 'rails';
      }
    }
    return ''; // Return an empty string or a fallback option if no conditions are met
  }

  const getDefaultMotifborder = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.motifborder
  }

  const getDefaultCorners = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.corners
  }

  const getDefaultStretcherFrame = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.stretcherframe
  }

  const getDefaultSideappearance = (productId) => {
    return products.find(p => p.id === productId)?.defaultOptions?.sideappearance
  }

  const handleEditOption = (key: string) => {
    let stepKey = key

    if (stepKey === 'passepartoutColor' || stepKey === 'passepartoutWidth') stepKey = 'passepartoutcw'

    if (stepKey === 'frameColor') stepKey = 'frame'

    const stepIndex = steps.indexOf(stepKey)
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]
    const [productModal, setProductModal] = useState<Product | null>(null)
    const [frameModal, setFrameModal] = useState<Frame | null>(null)
    const [paperModal, setPaperModal] = useState<Paper | null>(null)
    const [imagecarrierModal, setImagecarrierModal] = useState<ImageCarrier | null>(null)

    const [selectedProductCategory, setSelectedProductCategory] = useState('acrylic')
    const [selectedFrameCategory, setSelectedFrameCategory] = useState<FrameCategory>(frameCategories[1])
    const [selectedPaperCategory, setSelectedPaperCategory] = useState('')

    const [showBubble, setShowBubble] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    const handlePrev = (e: React.MouseEvent, length: number) => {
      e.preventDefault();
      // Es gibt zwei Bilder – daher Zyklus über 0 und 1
      setCurrentSlide((prev) => (prev - 1 + length) % length)
    }
  
    const handleNext = (e: React.MouseEvent, length: number) => {
      e.preventDefault();
      setCurrentSlide((prev) => (prev + 1) % length)
    }

    const toggleBubble = (e: React.MouseEvent) => {
      e.stopPropagation(); // Verhindert, dass auch RadioGroup-Events ausgelöst werden
      setShowBubble(prev => !prev)
    }

    const [loadedDetailedDescription, setLoadedDetailedDescription] = useState<DetailedDescription[]>([]);

    // Sobald der Dialog geöffnet wird (d.h. productModal ist gesetzt), lade die detailedDescription
    useEffect(() => {
      if (productModal?.detailedDescriptionKey) {
        // Der t-Aufruf wird nur ausgeführt, wenn productModal vorhanden ist.
        const data = t<string, { returnObjects: true }, DetailedDescription[]>(
          productModal.detailedDescriptionKey,
          { returnObjects: true }
        );
        setLoadedDetailedDescription(data);
      }
    }, [productModal, t]);

    useEffect(() => {
      if (currentProduct?.category === 'framed' && selections.mounting === 'passe-partout1') {
        setSelectedPaperCategory(paperOptions.find(p => p.id === selections.paper)?.category || '')
      } else {
        setSelectedPaperCategory('')
      }
    }, [selections.paper, selections.product, selections.mounting])

    switch (step) {
      case 'product':
        return (
          <div>
            <div className="flex space-x-4 mb-4 overflow-x-auto whitespace-nowrap">
              {productCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedProductCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors shrink-0 ${
                    selectedProductCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {t(category.name)}
                </button>
              ))}
            </div>
            <RadioGroup value={selections.product} onValueChange={(value) => handleSelection('product', value)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products
                .filter((product) => product.category === selectedProductCategory)
                .map((product) => (
                  <motion.label
                    key={product.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selections.product === product.id ? 'bg-blue-50 border-blue-500' : ''}`}                    
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col">
                      <RadioGroupItem value={product.id} id={product.id} className="sr-only" />
                      {/* Oben: Bild */}
                      <div className="relative w-full aspect-[2480/1748] bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={t(product.name)}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex items-center mt-2 justify-between">
                        <span className="ml-2 font-medium">{t(product.name)}</span>
                        { product.id !== 'digital1' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                            e.preventDefault();
                            setProductModal(product);
                            window.parent.postMessage({ type: 'modalOpened' }, '*');
                            setCurrentSlide(0)
                            }}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{t(product.description ?? '')}</p>
                    </div>
                  </motion.label>
                ))}
              </div>
            </RadioGroup>
            <Dialog open={!!productModal} onOpenChange={() => setProductModal(null)}>
              <DialogContent className={`max-w-[90vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto ${syne.className}`}>
                <DialogHeader>
                  <DialogTitle>{t(productModal?.name ?? '')}</DialogTitle>
                </DialogHeader>
                  <div className="mt-4">
                    <div className="relative w-full aspect-[2480/1748] bg-gray-100 rounded-lg overflow-hidden">
                      {(productModal && productModal.images) && (() => {
                        const images = productModal.images
                        if (images.length > 1) {
                          return (
                            <>
                              <Image
                                src={productModal.images[currentSlide]}
                                alt={`${t(productModal?.name ?? '')} image ${currentSlide + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                              />
                              <button
                                onClick={(e) => handlePrev(e, images.length)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/75 rounded-full p-1"
                              >
                                <ChevronLeft className="h-5 w-5" />
                              </button>
                              <button
                                onClick={(e) => handleNext(e, images.length)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/75 rounded-full p-1"
                              >
                                <ChevronRight className="h-5 w-5" />
                              </button>
                            </>
                          )
                        } else {
                          return (
                            <Image
                                src={productModal.images[0]}
                                alt={`${t(productModal?.name ?? '')} image 1`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                              />
                          )
                        }
                      })()}
                    </div>
                    <DialogDescription>
                      { /*productModal?.detailedDescription && (
                        <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: productModal?.detailedDescription }}/>
                      )*/}
                      <Accordion type="single" collapsible className="w-full">
                        {loadedDetailedDescription.map((section) => {
                          return (
                            <AccordionItem key={section.title} value={section.title}>
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <p className="text-black font-bold text-left">{section.title}</p>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="text-sm text-gray-600 mb-2">
                                  {parse(section.text)}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        })}
                      </Accordion>
                      <p className="text-black font-bold mt-5"><i>{t(productModal?.recursiveDescription ?? '')}</i></p>
                    </DialogDescription>
                  </div>
              </DialogContent>
            </Dialog>
          </div>
        )
      case 'size':
        return (
          <div>
            <RadioGroup value={selections.size} onValueChange={(value) => handleSelection('size', value)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getAvailableSizes().map((option) => (
                  <motion.label
                    key={option.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selections.size === option.id ? 'bg-blue-50 border-blue-500' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                      <span className="font-medium">{option.name}</span>
                    </div>
                  </motion.label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )
      case 'mounting':
        return (
          <RadioGroup value={selections.mounting} onValueChange={(value) => handleSelection('mounting', value)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAvailableMountings().map((mount) => (
                <motion.label
                  key={mount.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    selections.mounting === mount.id ? 'bg-blue-50 border-blue-500' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={mount.id} id={mount.id} className="sr-only" />
                    <span className="font-medium">{t(mount.name)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{t(mount.description)}</p>
                </motion.label>
              ))}
            </div>
          </RadioGroup>
        )
      case 'imagecarrier':
        return (
          <div>
            <RadioGroup value={selections.imagecarrier} onValueChange={(value) => handleSelection('imagecarrier', value)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAvailableImageCarriers().map(carrier => (
                  <motion.label
                    key={carrier.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                      selections.imagecarrier === carrier.id ? "bg-blue-50 border-blue-500" : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={carrier.id} id={carrier.id} className="sr-only" />
                        <span className="font-medium">{t(carrier.name)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                        e.preventDefault();
                        setImagecarrierModal(carrier);
                        window.parent.postMessage({ type: 'modalOpened' }, '*');
                        setCurrentSlide(0)
                        }}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.label>
                ))}
              </div>
            </RadioGroup>
            <Dialog open={!!imagecarrierModal} onOpenChange={() => setImagecarrierModal(null)}>
            <DialogContent className={`max-w-[90vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto ${syne.className}`}>
              <DialogHeader>
                <DialogTitle>{t(imagecarrierModal?.name ?? '')}</DialogTitle>
              </DialogHeader>
                <div className="mt-4">
                  <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    {(imagecarrierModal && imagecarrierModal.images) && (() => {
                      const images = imagecarrierModal.images
                      return (
                        <>
                          <Image
                            src={imagecarrierModal.images[currentSlide]}
                            alt={`${t(imagecarrierModal?.name ?? '')} image ${currentSlide + 1}`}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                          {/* Chevron Buttons */}
                          <button
                            onClick={(e) => handlePrev(e, images.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/75 rounded-full p-1"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) => handleNext(e, images.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/75 rounded-full p-1"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )
                    })()}
                  </div>
                  <DialogDescription>
                  { imagecarrierModal?.detailedDescription && (
                        <div className="text-sm text-gray-600 mb-2 rte-content">
                          {parse(t(imagecarrierModal?.detailedDescription))}
                        </div>
                      )}
                  </DialogDescription>
                </div>
            </DialogContent>
            </Dialog>
          </div>
        )
      case 'frame':
        // Ermitteln Sie die Frames pro Kategorie
        const framesByCategory = getAvailableFramesByCategory();

        // Ermitteln Sie, welche Kategorien (aus categoryOrder) tatsächlich Frames enthalten
        const availableCategories = frameCategories.filter(
          (category) => framesByCategory[category.id] && framesByCategory[category.id].length > 0 && category.id !== 'none'
        );

        // Extrahieren Sie die No-Frame-Option(en) aus dem "none"-Key
        const noFrameOptions = framesByCategory['none'] || [];

        if (availableCategories.length > 0 && !availableCategories.includes(selectedFrameCategory)) {
          setSelectedFrameCategory(availableCategories[0])
        }

        return (
          <div>
            {/* Rendern Sie die Kategorie-Buttons nur, wenn es mehr als eine verfügbare Kategorie gibt */}
            {availableCategories.length > 1 && (
              <div className="flex overflow-x-auto whitespace-nowrap flex space-x-4 mb-4">
                {availableCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFrameCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-colors shrink-0 ${
                      selectedFrameCategory.id === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {t(category.name)}
                  </button>
                ))}
              </div>
            )}

            <RadioGroup
              value={selections.frame}
              onValueChange={(value) => {
                handleSelection("frame", value)
                if (value !== 'noframe') {
                  const frame = frameOptions.find(f => f.id === value)
                  if (frame) {
                    setFrameModal(frame)
                    setCurrentSlide(0)
                  }
                }
              }}
            >
              <div className="space-y-4">
                {/* Falls "No Frame"-Option(en) vorhanden sind, immer als erster Block anzeigen */}
                {noFrameOptions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t(frameCategories[0].name)}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {noFrameOptions.map((frame) => (
                        <motion.label
                          key={frame.id}
                          className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                            selections.frame === frame.id
                              ? "bg-blue-50 border-blue-500"
                              : ""
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={frame.id}
                              id={frame.id}
                              className="sr-only"
                            />
                            <span className="font-medium">{t(frame.name)}</span>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Anzeige der Frames der aktuell ausgewählten Kategorie */}
                {framesByCategory[selectedFrameCategory.id] && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 capitalize">
                      {t(selectedFrameCategory.name)}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {framesByCategory[selectedFrameCategory.id].map((frame) => (
                        <motion.label
                          key={frame.id}
                          className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                            selections.frame === frame.id
                              ? "bg-blue-50 border-blue-500"
                              : ""
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <RadioGroupItem
                              value={frame.id}
                              id={frame.id}
                              className="sr-only"
                            />
                            <div className="w-24 h-24 flex-shrink-0">
                              <Image
                                src={`/images/frames/picturechoice/${frame.id}.webp`}
                                alt={`${t(frame.name)} picture choice`}
                                width={96}
                                height={96}
                                className="rounded"
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                            <div className="flex-grow text-center px-4">
                              <span className="font-medium">{t(frame.name)}</span>
                            </div>
                            <div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                e.preventDefault();
                                setFrameModal(frame)
                                window.parent.postMessage({ type: 'modalOpened' }, '*');
                                setCurrentSlide(0)
                                }}
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RadioGroup>
            <Dialog open={!!frameModal} onOpenChange={() => setFrameModal(null)}>
              <DialogContent className={`max-w-[90vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto ${syne.className}`}>
                <DialogHeader>
                  <DialogTitle>{t(frameModal?.name ?? '')}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    {(frameModal && frameModal.images) && (() => {
                      const images = frameModal.images
                      return (
                        <>
                          <Image
                            src={images[currentSlide]}
                            alt={`${t(frameModal?.name ?? '')} image ${currentSlide + 1}`}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                          {/* Chevron Buttons */}
                          <button
                            onClick={(e) => handlePrev(e, images.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/75 rounded-full p-1"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) => handleNext(e, images.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/75 rounded-full p-1"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )
                    })()}
                  </div>
                  <DialogDescription>
                    <p>{t(frameModal?.description ?? '')}</p>
                    <div className="mt-4">
                      <h4 className="font-semibold">{t('availableColor')}:</h4>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {frameModal?.colors.map(colorId => {
                          const color = frameColorOptions.find(c => c.id === colorId)
                          return (
                            <div 
                              key={colorId} 
                              className={`relative flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                                (selections.frameColor === colorId && selections.frame === frameModal.id)
                                  ? 'bg-blue-100 shadow-md' 
                                  : 'hover:bg-gray-100'
                              }`}
                              onClick={() => {
                                if (selections.frame === frameModal.id) handleSelection('frameColor', colorId)
                              }}
                            >
                              <div className="relative">
                                <Image
                                  src={color?.image || '/placeholder-color.jpg'}
                                  alt={color?.name || 'Color option'}
                                  width={60}
                                  height={60}
                                  className="rounded-full"
                                />
                                {(selections.frameColor === colorId && selections.frame === frameModal.id) && (
                                  <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <span className="text-xs mt-2 text-center">{t(color?.name ?? '')}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </DialogDescription>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )
      case 'passepartoutcw':
        return (
          <div className="relative" onClick={() => setShowBubble(false)}>
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end">
              <button
                onClick={toggleBubble}
                className="w-6 h-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none flex items-center justify-center"
              >
                <span className="text-xl font-bold">?</span>
              </button>
              {showBubble && (
                <div
                  className="absolute right-2 top-full mt-2 w-72 bg-white p-3 border border-gray-200 rounded-lg shadow-md z-10"
                >
                  {/* Beispieltext, idealerweise über deine Übersetzungen */}
                  <p className="text-sm">
                    {t('passePartoutExplanation')}
                  </p>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('choosePassePartoutColor')}</h3>
              <RadioGroup value={selections.passepartoutColor} onValueChange={(value) => handleSelection('passepartoutColor', value)}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {getAvailablePassepartoutColors().map(color => (
                  <motion.label
                    key={color.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                      selections.passepartoutColor === color.id ? 'bg-blue-50 border-blue-500' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center">
                      <Image src={color.image} alt={color.name} width={75} height={75} />
                      <span className="font-medium mt-2">{t(color.name)}</span>
                      <RadioGroupItem value={color.id} id={color.id} className="sr-only" />
                    </div>
                  </motion.label>
                ))}
              </div>
              </RadioGroup>
        
              <h3 className="text-lg font-semibold mb-2">{t('setPassePartoutWidth')}</h3>
              <RadioGroup value={selections.passepartoutWidth.toString()} onValueChange={(value) => handleSelection('passepartoutWidth', parseInt(value))}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getAvailablePassepartoutWidths().map(width => (
                    <motion.label
                      key={width.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        selections.passepartoutWidth === width.id ? 'bg-blue-50 border-blue-500' : 0
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={width.id.toString()} id={`width-${width.id}`} className="sr-only" />
                        <span className="font-medium">{t(width.label)}</span>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case 'acrylglass':
        return (
          <div className="relative" onClick={() => setShowBubble(false)}>
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end">
              <button
                onClick={toggleBubble}
                className="w-6 h-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none flex items-center justify-center"
              >
                <span className="text-xl font-bold">?</span>
              </button>
              {showBubble && (
                <div
                  className="absolute right-2 top-full mt-2 w-72 bg-white p-3 border border-gray-200 rounded-lg shadow-md z-10"
                >
                  {/* Beispieltext, idealerweise über deine Übersetzungen */}
                  <p className="text-sm">
                    {t('acrylglassExplanation')}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-10">
            <RadioGroup value={selections.acrylglass} onValueChange={(value) => handleSelection('acrylglass', value)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAvailableAcrylglassOptions().map((option) => (
                  <motion.label
                    key={option.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selections.acrylglass === option.id ? 'bg-blue-50 border-blue-500' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                      <span className="font-medium">{t(option.name)}</span>
                    </div>
                  </motion.label>
                ))}
              </div>
            </RadioGroup>
            </div>
          </div>
        )
      case 'paper':
        const availablePapers = (selectedPaperCategory && currentProduct?.category === 'framed' && selections.mounting === 'passe-partout1')
          ? getAvailablePaperOptions().filter(paper => paper.category === selectedPaperCategory)
          : getAvailablePaperOptions()
        
        return (
          <div>
            {currentProduct?.category === 'framed' && selections.mounting === 'passe-partout1' && (
              <div className="flex space-x-2 mb-4">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedPaperCategory === 'photoprintC'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedPaperCategory('photoprintC')}
                >
                  {t('photoprintC')}
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedPaperCategory === 'photoprintBW'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedPaperCategory('photoprintBW')}
                >
                  {t('photoprintBW')}
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedPaperCategory === 'fineart'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedPaperCategory('fineart')}
                >
                  {t('fineart')}
                </button>
              </div>
            )}
            <RadioGroup value={selections.paper} onValueChange={(value) => handleSelection('paper', value)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availablePapers.map((paper) => (
                  <motion.label
                    key={paper.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selections.paper === paper.id ? 'bg-blue-50 border-blue-500' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: paper.additionalInfo ? 'space-between' : 'flex-start'
                    }} // Flexbox für gleiche Höhe
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={paper.id} id={paper.id} className="sr-only" />
                        <span className="font-medium">{t(paper.name)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                        e.preventDefault()
                        setPaperModal(paper)
                        window.parent.postMessage({ type: 'modalOpened' }, '*');
                        }}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{t(paper.description)}</p>
                    {paper.additionalInfo && (
                      <p className="text-sm text-gray-500 mt-auto pt-2">{t(paper.additionalInfo)}</p>
                    )}
                  </motion.label>
                ))}
              </div>
            </RadioGroup>
            <Dialog open={!!paperModal} onOpenChange={() => setPaperModal(null)}>
              <DialogContent className={`max-w-[90vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto ${syne.className}`}>
                <DialogHeader>
                  <DialogTitle>{t(paperModal?.name ?? '')}</DialogTitle>
                </DialogHeader>
                  <div className="mt-4">
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                      {(paperModal && paperModal.images) && (
                        <>
                          <Image
                            src={paperModal.images[0]}
                            alt={`${t(paperModal?.name ?? '')} image 1`}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        </>
                      )}
                    </div>
                    <DialogDescription>
                      {/* Verwende detailedDescription statt description */}
                      { paperModal?.detailedDescription && (
                        <div className="text-sm text-gray-600 mb-2 rte-content">
                          {parse(t(paperModal?.detailedDescription))}
                        </div>
                      )}
                    </DialogDescription>
                  </div>
              </DialogContent>
            </Dialog>
          </div>
        )
      case 'lamination':
        return (
          <div className="relative" onClick={() => setShowBubble(false)}>
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end">
              <button
                onClick={toggleBubble}
                className="w-6 h-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none flex items-center justify-center"
              >
                <span className="text-xl font-bold">?</span>
              </button>
              {showBubble && (
                <div
                  className="absolute right-2 top-full mt-2 w-72 bg-white p-3 border border-gray-200 rounded-lg shadow-md z-10"
                >
                  {/* Beispieltext, idealerweise über deine Übersetzungen */}
                  <p className="text-sm">
                    {t('laminationExplanation')}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-10">
              <RadioGroup value={selections.lamination} onValueChange={(value) => handleSelection('lamination', value)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getAvailableLaminationOptions().map((option) => (
                      <motion.label
                        key={option.id}
                        className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selections.lamination === option.id ? 'bg-blue-50 border-blue-500' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                          <span className="font-medium">{t(option.name)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{t(option.description)}</p>
                      </motion.label>
                    ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case 'materialfinish':
        return (
          <div className="relative" onClick={() => setShowBubble(false)}>
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end">
              <button
                onClick={toggleBubble}
                className="w-6 h-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none flex items-center justify-center"
              >
                <span className="text-xl font-bold">?</span>
              </button>
              {showBubble && (
                <div
                  className="absolute right-2 top-full mt-2 w-72 bg-white p-3 border border-gray-200 rounded-lg shadow-md z-10"
                >
                  {/* Beispieltext, idealerweise über deine Übersetzungen */}
                  <p className="text-sm">
                    {t('materialfinishExplanation')}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-10">
              <RadioGroup value={selections.materialfinish} onValueChange={(value) => handleSelection('materialfinish', value)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {materialFinishOptions
                    .filter(option => option.conditions.includes(selections.product))
                    .map((option) => (
                      <motion.label
                        key={option.id}
                        className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selections.materialfinish === option.id ? 'bg-blue-50 border-blue-500' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                          <span className="font-medium">{t(option.name)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{t(option.description)}</p>
                      </motion.label>
                    ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case 'glass':
        return (
          <RadioGroup value={selections.glass} onValueChange={(value) => handleSelection('glass', value)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAvailableGlassOptions().map(option => (
                <motion.label
                  key={option.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    selections.glass === option.id ? "bg-blue-50 border-blue-500" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                    <span className="font-medium">{t(option.name)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{t(option.description)}</p>
                </motion.label>
              ))}
            </div>
          </RadioGroup>
        )
      case 'hanginghardware':
        return (
          <div className="relative" onClick={() => setShowBubble(false)}>
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end">
              <button
                onClick={toggleBubble}
                className="w-6 h-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none flex items-center justify-center"
              >
                <span className="text-xl font-bold">?</span>
              </button>
              {showBubble && (
                <div
                  className="absolute right-2 top-full mt-2 w-72 bg-white p-3 border border-gray-200 rounded-lg shadow-md z-10"
                >
                  {/* Beispieltext, idealerweise über deine Übersetzungen */}
                  <p className="text-sm">
                    {t('hanginghardwareExplanation')}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-10">
              <RadioGroup value={selections.hanginghardware} onValueChange={(value) => handleSelection('hanginghardware', value)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getAvailableHangingHardwareOptions().map((option) => (
                    <motion.label
                      key={option.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        selections.hanginghardware === option.id
                          ? 'bg-blue-50 border-blue-500'
                          : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="sr-only"
                        />
                        <span className="font-medium">{t(option.name)}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t(option.description)}
                      </p>
                    </motion.label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case 'motifborder':
        return (
          <div className="relative" onClick={() => setShowBubble(false)}>
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end">
              <button
                onClick={toggleBubble}
                className="w-6 h-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none flex items-center justify-center"
              >
                <span className="text-xl font-bold">?</span>
              </button>
              {showBubble && (
                <div
                  className="absolute right-2 top-full mt-2 w-72 bg-white p-3 border border-gray-200 rounded-lg shadow-md z-10"
                >
                  {/* Beispieltext, idealerweise über deine Übersetzungen */}
                  <p className="text-sm">
                    {t('motifborderExplanation')}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-10">
              <RadioGroup value={selections.motifborder} onValueChange={(value) => handleSelection('motifborder', value)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getAvailableMotifBorderOptions().map((option) => (
                    <motion.label
                      key={option.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        selections.motifborder === option.id ? 'bg-blue-50 border-blue-500' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="sr-only"
                        />
                        <span className="font-medium">{t(option.name)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{t(option.description)}</p>
                    </motion.label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case 'corners':
        return (
          <div className="relative" onClick={() => setShowBubble(false)}>
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end">
              <button
                onClick={toggleBubble}
                className="w-6 h-6 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none flex items-center justify-center"
              >
                <span className="text-xl font-bold">?</span>
              </button>
              {showBubble && (
                <div
                  className="absolute right-2 top-full mt-2 w-72 bg-white p-3 border border-gray-200 rounded-lg shadow-md z-10"
                >
                  {/* Beispieltext, idealerweise über deine Übersetzungen */}
                  <p className="text-sm">
                    {t('cornerExplanation')}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-10">
              {getAvailableCornersOptions().length > 0 ? (
                <RadioGroup
                  value={selections.corners}
                  onValueChange={(value) => handleSelection('corners', value)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getAvailableCornersOptions().map((corner) => (
                      <motion.label
                        key={corner.id}
                        className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                          selections.corners === corner.id ? 'bg-blue-50 border-blue-500' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={corner.id}
                            id={corner.id}
                            className="sr-only"
                          />
                          <span className="font-medium">{t(corner.name)}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {t(corner.description)}
                        </p>
                      </motion.label>
                    ))}
                  </div>
                </RadioGroup>
              ) : (
                <p className="text-red-500">
                  Corners options are only available when no frame and no border are selected.
                </p>
              )}
            </div>
          </div>
        )
      case 'stretcherframe':
        return (
          <RadioGroup value={selections.stretcherframe} onValueChange={(value) => handleSelection('stretcherframe', value)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAvailableStretcherFrames().map(option => (
                <motion.label
                  key={option.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    selections.stretcherframe === option.id ? "bg-blue-50 border-blue-500" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                    <span className="font-medium">{t(option.name)}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t(option.description)}
                  </p>
                </motion.label>
              ))}
            </div>
          </RadioGroup>
        )
      case 'sideappearance':
        return (
          <RadioGroup value={selections.sideappearance} onValueChange={(value) => handleSelection('sideappearance', value)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sideAppearanceOptions.map(option => (
                <motion.label
                  key={option.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    selections.sideappearance === option.id ? "bg-blue-50 border-blue-500" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                    <span className="font-medium">{t(option.name)}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t(option.description)}
                  </p>
                </motion.label>
              ))}
            </div>
          </RadioGroup>
        )
      case 'summary':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="space-y-4">
              {Object.entries(selections).map(([key, value]) => {
                if (!value) return null;
                // Hier können Sie den Anzeige-Text, ggf. über Mappings anpassen.
                let displayValue = value;
                if (key === 'product') {
                  const product = products.find(p => p.id === value)
                  displayValue = product?.name || value
                } else if (key === 'size') {
                  const sizeOption = sizeOptions[initialFormat].find(f => f.id === value)
                  displayValue = sizeOption?.name || value // Size is already in the correct format
                } else if (key === 'mounting') {
                  const mounting = mountingOptions.find(f => f.id === value)
                  displayValue = mounting?.name || value
                } else if (key === 'imagecarrier') {
                  const imagecarrier = imageCarrierOptions.find(f => f.id === value)
                  displayValue = imagecarrier?.name || value
                } else if (key === 'stretcherframe') {
                  const stretcher = stretcherFrameOptions.find(f => f.id === value)
                  displayValue = stretcher?.name || value
                } else if (key === 'sideappearance') {
                  const sideappearance = sideAppearanceOptions.find(f => f.id === value)
                  displayValue = sideappearance?.name || value
                } else if (key === 'frame') {
                  const frame = frameOptions.find(f => f.id === value)
                  displayValue = frame?.name || value
                } else if (key === 'passepartoutColor') {
                  const passepartout = passepartoutColors.find(f => f.id === value)
                  displayValue = passepartout?.name || value
                } else if (key === 'passepartoutWidth') {
                  const passepartout = passepartoutWidths.find(f => f.id === value)
                  displayValue = passepartout?.label || value
                } else if (key === 'frameColor') { // Handle frameColor
                  const color = frameColorOptions.find(f => f.id === value)
                  displayValue = color?.name || value
                } else if (key === 'acrylglass') {
                  const acrylglass = acrylglassOptions.find(a => a.id === value)
                  displayValue = acrylglass?.name || value
                } else if (key === 'paper') {
                  const paper = paperOptions.find(a => a.id === value)
                  displayValue = paper?.name || value
                } else if (key === 'glass') {
                  const glass = glassOptions.find(a => a.id === value)
                  displayValue = glass?.name || value
                } else if (key === 'lamination') { // Added lamination
                  const lamination = laminationOptions.find(a => a.id === value)
                  displayValue = lamination?.name || value
                } else if (key === 'materialfinish') { // Added materialfinish
                  const materialfinish = materialFinishOptions.find(a => a.id === value)
                  displayValue = materialfinish?.name || value
                } else if (key === 'hanginghardware') {
                  const hanginghardware = hangingHardwareOptions.find(a => a.id === value)
                  displayValue = hanginghardware?.name || value
                } else if (key === 'motifborder') {
                  const motifborder = motifBorderOptions.find(a => a.id === value)
                  displayValue = motifborder?.name || value
                } else if (key === 'corners') {
                  if (steps.indexOf('corners') === -1) return null
                  const corners = cornersOptions.find(a => a.id === value)
                  displayValue = corners?.name || value
                }
                // Weitere Schlüsselbehandlungen… 
                return (
                  <div key={key} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{t(stepNames.find(name => name.id === key)?.name ?? key)}</p>
                      <p className="text-gray-600">{t(displayValue)}</p>
                    </div>
                    <button
                      onClick={() => handleEditOption(key)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {t('edit')}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const ArtworkPreviewDialog = (recordId, format, physicalWidth, physicalHeight, overallPhysicalWidth, overallPhysicalHeight, newSelections) => {
    const [artworkImages, setArtworkImages] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
      if (recordId && format) {
        fetchArtwork(recordId, format, physicalWidth, physicalHeight, overallPhysicalWidth, overallPhysicalHeight, newSelections).then(images => {
          if (images) {
            if (images?.finalUrl) {
              setArtworkImages([images.finalUrl, images.watermarkedUrl])
            } else {
              setArtworkImages([images.watermarkedUrl])
            }
          }
        });
      }
    }, [recordId, format, physicalWidth, physicalHeight, newSelections.motifborder, newSelections.paper, newSelections.corners, newSelections.hanginghardware, newSelections.product, newSelections.materialfinish])

    const handlePrev = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + artworkImages.length) % artworkImages.length)
    }

    const handleNext = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % artworkImages.length)
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <div 
            className="relative bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
            style={{
              width: '100%',
              aspectRatio: getAspectRatio('landscape'),
              maxWidth: '100%',
              maxHeight: '512px',
            }}
          >
            {artworkImages.length > 0 ? (
              <>
                <Image
                  src={artworkImages[currentIndex]}
                  alt="Artwork preview"
                  fill
                  className="rounded-lg"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
                {artworkImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <TailSpin color="#2663EB" height="60" width="60"/>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className={`max-w-[90vw] max-h-[90vh] ${syne.className}`}>
          <DialogTitle>{t('artworkPreview')}</DialogTitle>
          <div className="relative bg-gray-200 rounded-lg w-full h-full overflow-hidden" style={{ aspectRatio: getAspectRatio('landscape') }}>
            {artworkImages.length > 0 ? (
              <>
                <Image
                  src={artworkImages[currentIndex]}
                  alt="Artwork preview"
                  fill
                  className="rounded-lg"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
                {artworkImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <TailSpin color="#2663EB" height="60" width="60"/>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const currentStepData = stepNames.find(step => step.id === steps[currentStep])
  const translationKey =
  currentStepData?.moreDetailed !== undefined
    ? currentStepData.moreDetailed
    : (currentStepData?.name ?? currentStep.toString())
  return (
    <div className={`flex flex-col w-full max-w-7xl mx-auto gap-8 p-4 bg-gray-50 ${syne.className}`}>
      <Card className="shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{t('artworkPreview')}</CardTitle>
        </CardHeader>
        <CardContent>
          {ArtworkPreviewDialog(imageId, initialFormat, artworkWidth, artworkHeight, overallWidth, overallHeight, selections)}
        </CardContent>
      </Card>
      {steps[currentStep] === "summary" ? (
        <Card className="shadow-lg bg-white w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('customize')}</CardTitle>
            <CardDescription className="text-lg">
              {t('step')} {currentStep + 1} {t('of')} {steps.length}: {
                t(translationKey)
              }
            </CardDescription>
            <div className="flex w-full mt-4">
              {steps.map((step, index) => (
                <div 
                  key={step} 
                  className={`flex-1 flex flex-col items-center ${
                    // Erlaube Klicks für den Step vor 'size' und alle abgeschlossenen Steps
                    hasVisitedSummary || (index <= currentStep + 1 && selections.size) || steps[index] === 'size' || index <= steps.indexOf('size')
                      ? 'cursor-pointer hover:opacity-80' 
                      : 'opacity-50'
                  }`}
                  onClick={() => {
                    // Erlaube Navigation zum Step vor 'size' und zu abgeschlossenen Steps
                    if (hasVisitedSummary || (selections.size && index <= currentStep + 1) || steps[index] === 'size' || index <= steps.indexOf('size')) {
                      setCurrentStep(index);
                    }
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      index <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : index === currentStep + 1 && (selections.size || steps[index] === 'size' || index <= steps.indexOf('size'))
                          ? 'bg-gray-200 text-gray-500 hover:bg-blue-100'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-1 capitalize hidden md:block text-center ${
                    index <= currentStep + 1 && (selections.size || steps[index] === 'size' || index <= steps.indexOf('size'))
                      ? 'text-gray-700' 
                      : 'text-gray-400'
                  }`}>
                    {t(stepNames.find(item => item.id === step)?.name ?? step)}
                  </span>
                </div>             
              ))}
            </div>
          </CardHeader>
          <CardContent className="overflow-y-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex space-x-4">
              {currentStep > 0 && (
                <Button onClick={prevStep} variant="outline" className="transition-all duration-200 hover:bg-gray-100">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('previous')}
                </Button>
              )}
              {currentStep === steps.length - 1 ? (
                selections.product && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200" onClick={addToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> {t('addToCart')}
                  </Button>
                )
              ) : (
                selections.product && selections.size && (
                  <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                    {t('next')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )
              )}
            </div>
            {selections.product && (
              <div>
                <div className="mt-4 md:mt-0 text-2xl font-bold">
                  {t('total')}: €{totalPrice.toFixed(2)}
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1"> 
                  <span className="font-bold">{country === 'CH' ? t('excl') : t('incl')} {countryVAT.find(c => c.id === country)?.vat} {t('vat')}</span>
                  {country === 'DE' && (
                    <span className="text-gray-500">{t('inclFreeShipping')}</span>
                  )}
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="shadow-lg bg-white w-full lg:w-[75%]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('customize')}</CardTitle>
            <CardDescription className="text-lg">
              {t('step')} {currentStep + 1} {t('of')} {steps.length}: {
                t(translationKey)
              }
            </CardDescription>
            <div className="flex w-full mt-4">
              {steps.map((step, index) => (
                <div 
                  key={step} 
                  className={`flex-1 flex flex-col items-center ${
                    // Erlaube Klicks für den Step vor 'size' und alle abgeschlossenen Steps
                    hasVisitedSummary || (index <= currentStep + 1 && selections.size) || steps[index] === 'size' || index <= steps.indexOf('size')
                      ? 'cursor-pointer hover:opacity-80' 
                      : 'opacity-50'
                  }`}
                  onClick={() => {
                    // Erlaube Navigation zum Step vor 'size' und zu abgeschlossenen Steps
                    if (hasVisitedSummary || (selections.size && index <= currentStep + 1) || steps[index] === 'size' || index <= steps.indexOf('size')) {
                      setCurrentStep(index);
                    }
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      index <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : index === currentStep + 1 && (selections.size || steps[index] === 'size' || index <= steps.indexOf('size'))
                          ? 'bg-gray-200 text-gray-500 hover:bg-blue-100'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-1 capitalize hidden md:block text-center ${
                    index <= currentStep + 1 && (selections.size || steps[index] === 'size' || index <= steps.indexOf('size'))
                      ? 'text-gray-700' 
                      : 'text-gray-400'
                  }`}>
                    {t(stepNames.find(item => item.id === step)?.name ?? step)}
                  </span>
                </div>             
              ))}
            </div>
          </CardHeader>
          <CardContent className="overflow-y-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex space-x-4">
              {currentStep > 0 && (
                <Button onClick={prevStep} variant="outline" className="transition-all duration-200 hover:bg-gray-100">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('previous')}
                </Button>
              )}
              {currentStep === steps.length - 1 ? (
                selections.product && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200" onClick={addToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> {t('addToCart')}
                  </Button>
                )
              ) : (
                selections.product && selections.size && (
                  <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                    {t('next')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )
              )}
            </div>
            {selections.product && (
              <div>
                <div className="mt-4 md:mt-0 text-2xl font-bold">
                  {t('total')}: €{totalPrice.toFixed(2)}
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1"> 
                <span className="font-bold">{country === 'CH' ? t('excl') : t('incl')} {countryVAT.find(c => c.id === country)?.vat} {t('vat')}</span>
                {country === 'DE' && (
                    <span className="text-gray-500">{t('inclFreeShipping')}</span>
                  )}
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
        <div className="hidden md:block lg:w-[25%]">
          <Card className="shadow-lg bg-white sticky top-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{t('selectedOptions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(selections).map(([key, value]) => {
                    if (!value) return null
                    let displayValue = value
                    let detailValue = ''
                    if (key === 'product') {
                      const product = products.find(p => p.id === value)
                      displayValue = product?.name || value
                    } else if (key === 'size') {
                      const sizeOption = sizeOptions[initialFormat].find(f => f.id === value)
                      displayValue = sizeOption?.name || value // Size is already in the correct format
                      detailValue = t('overallSize') + ': ' + (overallWidth + (frameWidth * 2)) + ' x ' + (overallHeight+ (frameWidth * 2)) + ' cm'
                    } else if (key === 'mounting') {
                      const mounting = mountingOptions.find(f => f.id === value)
                      displayValue = mounting?.name || value
                    } else if (key === 'imagecarrier') {
                      const imagecarrier = imageCarrierOptions.find(f => f.id === value)
                      displayValue = imagecarrier?.name || value
                    } else if (key === 'stretcherframe') {
                      const stretcher = stretcherFrameOptions.find(f => f.id === value)
                      displayValue = stretcher?.name || value
                    } else if (key === 'sideappearance') {
                      const sideappearance = sideAppearanceOptions.find(f => f.id === value)
                      displayValue = sideappearance?.name || value
                    } else if (key === 'frame') {
                      const frame = frameOptions.find(f => f.id === value)
                      displayValue = frame?.name || value
                    } else if (key === 'passepartoutColor') {
                      const passepartout = passepartoutColors.find(f => f.id === value)
                      displayValue = passepartout?.name || value
                    } else if (key === 'passepartoutWidth') {
                      const passepartout = passepartoutWidths.find(f => f.id === value)
                      displayValue = passepartout?.label || value
                    } else if (key === 'frameColor') { // Handle frameColor
                      const color = frameColorOptions.find(f => f.id === value)
                      displayValue = color?.name || value
                    } else if (key === 'acrylglass') {
                      const acrylglass = acrylglassOptions.find(a => a.id === value)
                      displayValue = acrylglass?.name || value
                    } else if (key === 'paper') {
                      const paper = paperOptions.find(a => a.id === value)
                      displayValue = paper?.name || value
                    } else if (key === 'glass') {
                      const glass = glassOptions.find(a => a.id === value)
                      displayValue = glass?.name || value
                    } else if (key === 'lamination') { // Added lamination
                      const lamination = laminationOptions.find(a => a.id === value)
                      displayValue = lamination?.name || value
                    } else if (key === 'materialfinish') { // Added materialfinish
                      const materialfinish = materialFinishOptions.find(a => a.id === value)
                      displayValue = materialfinish?.name || value
                    } else if (key === 'hanginghardware') {
                      const hanginghardware = hangingHardwareOptions.find(a => a.id === value)
                      displayValue = hanginghardware?.name || value
                    } else if (key === 'motifborder') {
                      const motifborder = motifBorderOptions.find(a => a.id === value)
                      displayValue = motifborder?.name || value
                    } else if (key === 'corners') {
                      const corners = cornersOptions.find(a => a.id === value)
                      displayValue = corners?.name || value
                    }
                    return (
                      <AccordionItem key={key} value={key}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-medium capitalize text-left">{t(stepNames.find(s => s.id === key)?.name ?? key)}</p>
                              <p className="text-sm text-gray-600 text-left">{t(displayValue)}</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-gray-600 mb-2">{detailValue}</p>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              {hasVisitedSummary && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200" onClick={addToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> {t('addToCart')}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      )}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-4 right-4 md:hidden bg-blue-600 hover:bg-blue-700 transition-all duration-200">
            {t('viewSelections')}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">{t('selectedOptions')}</h2>
            <ScrollArea className="h-[50vh]">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(selections).map(([key, value]) => {
                  if (!value) return null
                  let displayValue = value
                  let detailValue = value
                  if (key === 'product') {
                    const product = products.find(p => p.id === value)
                    displayValue = product?.name || value
                  } else if (key === 'size') {
                    const sizeOption = sizeOptions[initialFormat].find(f => f.id === value)
                    displayValue = sizeOption?.name || value // Size is already in the correct format
                    detailValue = t('overallSize') + ': ' + (overallWidth + (frameWidth * 2)) + ' x ' + (overallHeight+ (frameWidth * 2)) + ' cm'
                  } else if (key === 'mounting') {
                    const mounting = mountingOptions.find(f => f.id === value)
                    displayValue = mounting?.name || value
                  } else if (key === 'imagecarrier') {
                    const imagecarrier = imageCarrierOptions.find(f => f.id === value)
                    displayValue = imagecarrier?.name || value
                  } else if (key === 'stretcherframe') {
                    const stretcher = stretcherFrameOptions.find(f => f.id === value)
                    displayValue = stretcher?.name || value
                  } else if (key === 'sideappearance') {
                    const sideappearance = sideAppearanceOptions.find(f => f.id === value)
                    displayValue = sideappearance?.name || value
                  } else if (key === 'frame') {
                    const frame = frameOptions.find(f => f.id === value)
                    displayValue = frame?.name || value
                  } else if (key === 'passepartoutColor') {
                    const passepartout = passepartoutColors.find(f => f.id === value)
                    displayValue = passepartout?.name || value
                  } else if (key === 'passepartoutWidth') {
                    const passepartout = passepartoutWidths.find(f => f.id === value)
                    displayValue = passepartout?.label || value
                  } else if (key === 'frameColor') { // Handle frameColor
                    const color = frameColorOptions.find(f => f.id === value)
                    displayValue = color?.name || value
                  } else if (key === 'acrylglass') {
                    const acrylglass = acrylglassOptions.find(a => a.id === value)
                    displayValue = acrylglass?.name || value
                  } else if (key === 'paper') {
                    const paper = paperOptions.find(a => a.id === value)
                    displayValue = paper?.name || value
                  } else if (key === 'glass') {
                    const glass = glassOptions.find(a => a.id === value)
                    displayValue = glass?.name || value
                  } else if (key === 'lamination') { // Added lamination
                    const lamination = laminationOptions.find(a => a.id === value)
                    displayValue = lamination?.name || value
                  } else if (key === 'materialfinish') { // Added materialfinish
                    const materialfinish = materialFinishOptions.find(a => a.id === value)
                    displayValue = materialfinish?.name || value
                  } else if (key === 'hanginghardware') {
                    const hanginghardware = hangingHardwareOptions.find(a => a.id === value)
                    displayValue = hanginghardware?.name || value
                  } else if (key === 'motifborder') {
                    const motifborder = motifBorderOptions.find(a => a.id === value)
                    displayValue = motifborder?.name || value
                  } else if (key === 'corners') {
                    const corners = cornersOptions.find(a => a.id === value)
                    displayValue = corners?.name || value
                  }
                  return (
                    <AccordionItem key={key} value={key}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium capitalize text-left">{t(stepNames.find(s => s.id === key)?.name ?? key)}</p>
                            <p className="text-sm text-gray-600 text-left">{t(displayValue)}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-gray-600 mb-2">{detailValue}</p>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
      {/* Overlay, das blockiert, falls ein Fehler vorliegt */}
      {/* {hasError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center pointer-events-auto">
          <div className="bg-white p-8 rounded shadow-md text-center w-[400px] h-[200px] max-w-[95vw] max-h-[95vh]">
            <h2 className="text-2xl font-bold mb-4">{t('oops')}</h2>
            <p className="mb-4">{t('somethingWrong')}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => (window.location.href = `https://www.canvasnova.com/${lang === 'de' ? '' : lang}`)}
            >
              {t('backHome')}
            </button>
          </div>
        </div>
      )} */}
    </div>
  )
}