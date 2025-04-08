import { Size, Mounting, ImageCarrier, PassePartoutColor, PassePartoutWidth, Acrylglass, Glass, MaterialFinish, HangingHardware } from './options.types'

export const sizeOptions: Size = {
    landscape: [
      { id: 'size1', name: '16 x 9 cm' },
      { id: 'size2', name: '32 x 18 cm' },
      { id: 'size3', name: '48 x 27 cm' },
      { id: 'size4', name: '64 x 36 cm' },
      { id: 'size5', name: '80 x 45 cm' },
      { id: 'size6', name: '112 x 63 cm' },
      { id: 'size7', name: '128 x 72 cm' },
      { id: 'size8', name: '144 x 81 cm' },
      { id: 'size9', name: '160 x 90 cm' },
      { id: 'size10', name: '176 x 99 cm' },
      { id: 'size11', name: '208 x 117 cm' },
      { id: 'size12', name: '240 x 135 cm' },
      { id: 'size13', name: '288 x 162 cm' },
    ],
    portrait: [
      { id: 'size1', name: '9 x 16 cm' },
      { id: 'size2', name: '18 x 32 cm' },
      { id: 'size3', name: '27 x 48 cm' },
      { id: 'size4', name: '36 x 64 cm' },
      { id: 'size5', name: '45 x 80 cm' },
      { id: 'size6', name: '63 x 112 cm' },
      { id: 'size7', name: '72 x 128 cm' },
      { id: 'size8', name: '81 x 144 cm' },
      { id: 'size9', name: '90 x 160 cm' },
      { id: 'size10', name: '99 x 176 cm' },
      { id: 'size11', name: '117 x 208 cm' },
      { id: 'size12', name: '135 x 240 cm' },
      { id: 'size13', name: '162 x 288 cm' },
    ],
    square: [
      { id: 'size1', name: '10 x 10 cm' },
      { id: 'size2', name: '20 x 20 cm' },
      { id: 'size3', name: '30 x 30 cm' },
      { id: 'size4', name: '40 x 40 cm' },
      { id: 'size5', name: '50 x 50 cm' },
      { id: 'size6', name: '60 x 60 cm' },
      { id: 'size7', name: '80 x 80 cm' },
      { id: 'size8', name: '100 x 100 cm' },
      { id: 'size9', name: '120 x 120 cm' },
      { id: 'size10', name: '140 x 140 cm' },
      { id: 'size11', name: '150 x 150 cm' },
      { id: 'size12', name: '160 x 160 cm' },
      { id: 'size13', name: '180 x 180 cm' },
    ],
}

export const mountingOptions: Mounting[] = [
    { id: 'passe-partout1', name: 'mounting.passe-partout1.name', category: 'special', description: 'mounting.passe-partout1.description' },
    { id: 'canvas-stretcher', name: 'mounting.canvas-stretcher.name', category: 'special', description: 'mounting.canvas-stretcher.description' },
    { id: 'acrylic1', name: 'mounting.acrylic1.name', category: 'acrylic', description: 'mounting.acrylic1.description' },
    { id: 'acrylic2', name: 'mounting.acrylic2.name', category: 'acrylic', description: 'mounting.acrylic2.description' },
    { id: 'acrylic3', name: 'mounting.acrylic3.name', category: 'acrylic', description: 'mounting.acrylic3.description' },
    { id: 'acrylic4', name: 'mounting.acrylic4.name', category: 'acrylic', description: 'mounting.acrylic4.description' },
    { id: 'acrylic5', name: 'mounting.acrylic5.name', category: 'acrylic', description: 'mounting.acrylic5.description' },
    { id: 'acrylic6', name: 'mounting.acrylic6.name', category: 'acrylic', description: 'mounting.acrylic6.description' },
    { id: 'aludibond1', name: 'mounting.aludibond1.name', category: 'metal', description: 'mounting.aludibond1.description' },
    { id: 'aludibond2', name: 'mounting.aludibond2.name', category: 'metal', description: 'mounting.aludibond2.description' },
    { id: 'aludibond4', name: 'mounting.aludibond4.name', category: 'metal', description: 'mounting.aludibond4.description' },
    { id: 'aludibond5', name: 'mounting.aludibond5.name', category: 'metal', description: 'mounting.aludibond5.description' },
    { id: 'aludibond6', name: 'mounting.aludibond6.name', category: 'metal', description: 'mounting.aludibond6.description' },
    { id: 'aludibond7', name: 'mounting.aludibond7.name', category: 'metal', description: 'mounting.aludibond7.description' },
]

export const imageCarrierOptions: ImageCarrier[] = [
    {
      id: 'imagecarrier1',
      name: 'imagecarrier.imagecarrier1.name',
      detailedDescription: 'imagecarrier.imagecarrier1.detailedDescription',
      conditions: {
        maxSize: {
          landscape: { width: 120, height: 80 },
          portrait: { width: 80, height: 120 },
          square: { width: 80, height: 80 },
        },
      },
      stepsAfterFrame: ['paper', 'motifborder', 'summary'],
      images: ['/images/imagecarriers/imagecarrier1.webp'],
    },
    {
      id: 'imagecarrier2',
      name: 'imagecarrier.imagecarrier2.name',
      detailedDescription: 'imagecarrier.imagecarrier2.detailedDescription',
      conditions: {
        maxSize: {
          landscape: { width: 114, height: 74 },
          portrait: { width: 74, height: 114 },
          square: { width: 74, height: 74 },
        },
      },
      stepsAfterFrame: ['passepartoutcw', 'paper', 'motifborder', 'summary'],
      images: ['/images/imagecarriers/imagecarrier2.webp'],
    },
    {
      id: 'imagecarrier3',
      name: 'imagecarrier.imagecarrier3.name',
      detailedDescription: 'imagecarrier.imagecarrier3.detailedDescription',
      conditions: {
        maxSize: {
          landscape: { width: 118, height: 78 },
          portrait: { width: 78, height: 118 },
          square: { width: 78, height: 78 },
        },
      },
      stepsAfterFrame: ['paper', 'motifborder', 'summary'],
      images: ['/images/imagecarriers/imagecarrier3.webp'],
    },
    {
      id: 'imagecarrier4',
      name: 'imagecarrier.imagecarrier4.name',
      detailedDescription: 'imagecarrier.imagecarrier4.detailedDescription',
      conditions: {
        maxSize: {
          landscape: { width: 114, height: 74 },
          portrait: { width: 74, height: 114 },
          square: { width: 74, height: 74 },
        },
      },
      stepsAfterFrame: ['passepartoutcw', 'paper', 'motifborder', 'summary'],
      images: ['/images/imagecarriers/imagecarrier4.webp'],
    }
]

export const passepartoutColors: PassePartoutColor[] = [
    { 
      id: 'bright-white', 
      name: 'passePartoutColor.bright-white.name',
      image: '/images/passepartout/colors/bright-white.webp' 
    },
    { 
      id: 'natural-white', 
      name: 'passePartoutColor.natural-white.name',
      image: '/images/passepartout/colors/natural-white.webp' 
    },
    { 
      id: 'ivory', 
      name: 'passePartoutColor.ivory.name',
      image: '/images/passepartout/colors/ivory.webp' 
    },
    { 
      id: 'light-grey', 
      name: 'passePartoutColor.light-grey.name',
      image: '/images/passepartout/colors/light-grey.webp' 
    },
    { 
      id: 'dark-grey', 
      name: 'passePartoutColor.dark-grey.name',
      image: '/images/passepartout/colors/dark-grey.webp' 
    },
    { 
      id: 'anthracite', 
      name: 'passePartoutColor.anthracite.name',
      image: '/images/passepartout/colors/anthracite.webp' 
    },
    { 
      id: 'black', 
      name: 'passePartoutColor.black.name',
      image: '/images/passepartout/colors/black.webp' 
    },
    { 
      id: 'linen-natural-white', 
      name: 'passePartoutColor.linen-natural-white.name',
      image: '/images/passepartout/colors/linen-natural-white.webp' 
    },
    { 
      id: 'linen-ivory', 
      name: 'passePartoutColor.linen-ivory.name',
      image: '/images/passepartout/colors/linen-ivory.webp' 
    },
    { 
      id: 'linen-black', 
      name: 'passePartoutColor.linen-black.name',
      image: '/images/passepartout/colors/linen-black.webp' 
    },
]

export const passepartoutWidths: PassePartoutWidth[] = [
    { id: 4, label: 'passePartoutWidth.4.label' },
    { id: 5, label: 'passePartoutWidth.5.label' },
    { id: 6, label: 'passePartoutWidth.6.label' },
    { id: 7, label: 'passePartoutWidth.7.label' },
    { id: 8, label: 'passePartoutWidth.8.label' },
    { id: 9, label: 'passePartoutWidth.9.label' },
    { id: 10, label: 'passePartoutWidth.10.label' },
]

export const acrylglassOptions: Acrylglass[] = [
    { 
      id: 'a2g', 
      name: 'acrylglass.a2g.name', 
      conditions: ['acrylic1', 'acrylic2', 'acrylic3', 'acrylic5', 'acrylic6'],
      maxSize: { 
        landscape: {width: Infinity, height: Infinity }, 
        portrait: { width: Infinity, height: Infinity },
        square: { width: Infinity, height: Infinity }, 
      },
    },
    { 
      id: 'a2m', 
      name: 'acrylglass.a2m.name', 
      conditions: ['acrylic4', 'acrylic5', 'acrylic6'],
      maxSize: { 
        landscape: {width: 180, height: 122 }, 
        portrait: { width: 122, height: 180 },
        square: { width: 122, height: 122 }, 
      },
    },
    { 
      id: 'a4g', 
      name: 'acrylglass.a4g.name', 
      conditions: ['acrylic1', 'acrylic2', 'acrylic6'], 
      frameConditions: ['noframe', 'aslimline'], 
      maxSize: { 
        landscape: { width: 195, height: 122 }, 
        portrait: { width: 122, height: 195 },
        square: { width: 122, height: 122 }, 
      },
    },
    { 
      id: 'a6g', 
      name: 'acrylglass.a6g.name', 
      conditions: ['acrylic1'], 
      frameConditions: ['noframe', 'aslimline'], 
      maxSize: { 
        landscape: {width: 180, height: 122 }, 
        portrait: { width: 122, height: 180 },
        square: { width: 122, height: 122 }, 
      },
    },
]

export const glassOptions: Glass[] = [
    {
      id: 'glossyfloat',
      name: 'glass.glossyfloat.name',
      description: 'glass.glossyfloat.description',
      conditions: {
        productConditions: ['passe-partout1', 'photoprint1', 'photoprint2', 'photoprint3', 'photoprint4', 'photoprint5', 'photoprint6', 'fineart'],
        frameCondition: 'noframe' // Not available with noframe
      },
    },
    {
      id: 'mattefloat',
      name: 'glass.mattefloat.name',
      description: 'glass.mattefloat.description',
      conditions: {
        productConditions: ['passe-partout1', 'photoprint1', 'photoprint2', 'photoprint3', 'photoprint4', 'photoprint5', 'photoprint6', 'fineart'],
        frameCondition: 'noframe' // Not available with noframe
      },
    },
    {
      id: 'acrylicg',
      name: 'glass.acrylicg.name',
      description: 'glass.acrylicg.description',
      conditions: {
        productConditions: ['passe-partout1', 'photoprint1', 'photoprint2', 'photoprint3', 'photoprint4', 'photoprint5', 'photoprint6', 'fineart'],
        paperConditions: ['fflex', 'muhdphotoprint'], // Not available with these papers
        frameCondition: 'noframe' // Not available with noframe
      },
    },
    {
      id: 'museum',
      name: 'glass.museum.name',
      description: 'glass.museum.description',
      conditions: {
        productConditions: ['passe-partout1', 'photoprint1', 'photoprint2', 'photoprint3', 'photoprint4', 'photoprint5', 'photoprint6', 'fineart'],
        frameCondition: 'noframe' // Not available with noframe
      },
    }
]

export const materialFinishOptions: MaterialFinish[] = [
    {
      id: 'bsilver',
      name: 'materialfinish.bsilver.name',
      description: 'materialfinish.bsilver.description',
      conditions: ['aludibond6'],
    },
    {
      id: 'bgold',
      name: 'materialfinish.bgold.name',
      description: 'materialfinish.bgold.description',
      conditions: ['aludibond6'],
    },
    {
      id: 'glossy',
      name: 'materialfinish.glossy.name',
      description: 'materialfinish.glossy.description',
      conditions: ['aludibond7'],
    },
    {
      id: 'bglossy',
      name: 'materialfinish.bglossy.name',
      description: 'materialfinish.bglossy.description',
      conditions: ['aludibond7'],
    },
]

export const hangingHardwareOptions: HangingHardware[] = [
    {
      id: 'nohangingelements',
      name: 'hanginghardware.nohangingelements.name',
      description: 'hanginghardware.nohangingelements.description',
      conditions: ['noframe', 'aslimline'],
    },
    {
      id: 'hangingelements',
      name: 'hanginghardware.hangingelements.name',
      description: 'hanginghardware.hangingelements.description',
    },
    {
      id: 'rails',
      name: 'hanginghardware.rails.name',
      description: 'hanginghardware.rails.description',
    },
    {
      id: 'cylindricalspacers',
      name: 'hanginghardware.cylindricalspacers.name',
      description: 'hanginghardware.cylindricalspacers.description',
      conditions: ['noframe'],
    },
]