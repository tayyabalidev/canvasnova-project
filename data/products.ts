import { Product, ProductCategory } from './options.types'

export const products: Product[] = [
    {
      id: 'acrylic1',
      name: 'product.acrylic1.name',
      description: 'product.acrylic1.description',
      category: 'acrylic',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: 'a2g',
        paper: 'fcrystalarchiveg',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'acrylglass', 'paper', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.acrylic1.detailedDescription',
      recursiveDescription: 'product.acrylic1.recursiveDescription',
      images: ['/images/products/acrylic1_detail.webp', '/images/products/acrylic1_full.webp'],
    },
    {
      id: 'acrylic2',
      name: 'product.acrylic2.name',
      description: 'product.acrylic2.description',
      category: 'acrylic',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: 'a2g',
        paper: 'uhdphotoprint',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'acrylglass', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.acrylic2.detailedDescription',
      recursiveDescription: 'product.acrylic2.recursiveDescription',
      images: ['/images/products/acrylic2_detail.webp', '/images/products/acrylic2_full.webp'],
    },
    {
      id: 'acrylic3',
      name: 'product.acrylic3.name',
      description: 'product.acrylic3.description',
      category: 'acrylic',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: 'a2g',
        paper: 'muhdphotoprint',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.acrylic3.detailedDescription',
      recursiveDescription: 'product.acrylic3.recursiveDescription',
      images: ['/images/products/acrylic3_detail.webp', '/images/products/acrylic3_full.webp'],
    },
    {
      id: 'acrylic4',
      name: 'product.acrylic4.name',
      description: 'product.acrylic4.description',
      category: 'acrylic',
      maxSize: {
        landscape: { width: 180, height: 122 },
        portrait: { width: 122, height: 180 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: 'a2m',
        paper: 'fcrystalarchiveg',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'paper', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.acrylic4.detailedDescription',
      recursiveDescription: 'product.acrylic4.recursiveDescription',
      images: ['/images/products/acrylic4_detail.webp', '/images/products/acrylic4_full.webp'],
    },
    {
      id: 'acrylic5',
      name: 'product.acrylic5.name',
      description: 'product.acrylic5.description',
      category: 'acrylic',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: 'a2g',
        paper: 'ibwg',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'acrylglass', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.acrylic5.detailedDescription',
      recursiveDescription: 'product.acrylic5.recursiveDescription',
      images: ['/images/products/acrylic5_detail.webp', '/images/products/acrylic5_full.webp'],
    },
    {
      id: 'acrylic6',
      name: 'product.acrylic6.name',
      description: 'product.acrylic6.description',
      category: 'acrylic',
      maxSize: {
        landscape: { width: 290, height: 180 },
        portrait: { width: 180, height: 290 },
        square: { width: 180, height: 180 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: 'a2g',
        paper: 'fineartpaper',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'acrylglass', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.acrylic6.detailedDescription',
      recursiveDescription: 'product.acrylic6.recursiveDescription',
      images: ['/images/products/acrylic6_detail.webp', '/images/products/acrylic6_full.webp'],
    },
    {
      id: 'aludibond1',
      name: 'product.aludibond1.name',
      description: 'product.aludibond1.description',
      category: 'metal',
      maxSize: {
        landscape: { width: 190, height: 145 },
        portrait: { width: 145, height: 190 },
        square: { width: 145, height: 145 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: '',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.aludibond1.detailedDescription',
      recursiveDescription: 'product.aludibond1.recursiveDescription',
      images: ['/images/products/aludibond1_detail.webp', '/images/products/aludibond1_full.webp'],
    },
    {
      id:'aludibond2',
      name: 'product.aludibond2.name',
      description: 'product.aludibond2.description',
      category:'metal',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 }
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: 'fcrystalarchiveg',
        lamination: 'glossylam',
        materialfinish: '',
        motifborder: 'noborder',
        corners: '',
        stretcherframe: '',
      },
      steps:['size', 'frame', 'paper', 'lamination', 'hanginghardware', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.aludibond2.detailedDescription',
      recursiveDescription: 'product.aludibond2.recursiveDescription',
      images: ['/images/products/aludibond2_detail.webp', '/images/products/aludibond2_full.webp'],
    },
    {
      id:'aludibond4',
      name: 'product.aludibond4.name',
      description: 'product.aludibond4.description',
      category:'metal',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 }
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: 'ibwg',
        lamination: 'mattelam',
        materialfinish: '',
        motifborder: 'noborder',
        corners: '',
        stretcherframe: '',
      },
      steps:['size', 'frame', 'lamination', 'hanginghardware', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.aludibond4.detailedDescription',
      recursiveDescription: 'product.aludibond4.recursiveDescription',
      images: ['/images/products/aludibond4_detail.webp', '/images/products/aludibond4_full.webp'],
    },
    {
      id:'aludibond5',
      name: 'product.aludibond5.name',
      description: 'product.aludibond5.description',
      category:'metal',
      maxSize: {
        landscape: { width: 240, height: 105 },
        portrait: { width: 105, height: 224 },
        square: { width: 105, height: 105 }
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: 'hfapearl',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        corners: '',
        stretcherframe: '',
      },
      steps:['size', 'frame', 'paper', 'hanginghardware', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.aludibond5.detailedDescription',
      recursiveDescription: 'product.aludibond5.recursiveDescription',
      images: ['/images/products/aludibond5_detail.webp', '/images/products/aludibond5_full.webp'],
    },
    {
      id: 'aludibond6',
      name: 'product.aludibond6.name',
      description: 'product.aludibond6.description',
      category: 'metal',
      maxSize: {
        landscape: { width: 190, height: 145 },
        portrait: { width: 145, height: 190 },
        square: { width: 145, height: 145 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: '',
        lamination: '',
        materialfinish: 'bsilver',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'materialfinish', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.aludibond6.detailedDescription',
      recursiveDescription: 'product.aludibond6.recursiveDescription',
      images: ['/images/products/aludibond6_bsilver_detail.webp', '/images/products/aludibond6_bgold_detail.webp', '/images/products/aludibond6_bsilver_full.webp', '/images/products/aludibond6_bgold_full.webp'],
    },
    {
      id: 'aludibond7',
      name: 'product.aludibond7.name',
      description: 'product.aludibond7.description',
      category: 'metal',
      maxSize: {
        landscape: { width: 150, height: 100 },
        portrait: { width: 100, height: 150 },
        square: { width: 100, height: 100 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: '',
        lamination: '',
        materialfinish: 'glossy',
        motifborder: 'noborder',
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'materialfinish', 'hanginghardware', 'motifborder', 'corners', 'summary'],
      detailedDescriptionKey: 'product.aludibond7.detailedDescription',
      recursiveDescription: 'product.aludibond7.recursiveDescription',
      images: ['/images/products/aludibond7_detail.webp', '/images/products/aludibond7_full.webp'],
    },
    {
      id: 'framed1',
      name: 'product.framed1.name',
      description: 'product.framed1.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 120, height: 80 },
        portrait: { width: 80, height: 120 },
        square: { width: 80, height: 80 },
      },
      defaultOptions: {
        mounting: 'passe-partout1',
        imagecarrier: '',
        frame: 'amiami9',
        paper: 'hfapearl',
        lamination: '',
        glass: 'glossyfloat',
        materialfinish: '',
        motifborder: 'noborder',
        stretcherframe: '',
        corners: '',
      },
      availableMountings: ['passe-partout1'],
      steps: ['size', 'frame', 'passepartoutcw', 'paper', 'glass', 'motifborder', 'summary'], // Base steps
      detailedDescriptionKey: 'product.framed1.detailedDescription',
      recursiveDescription: 'product.framed1.recursiveDescription',
      images: ['/images/products/framed1_detail.webp'],
    },
    {
      id: 'framed2',
      name: 'product.framed2.name',
      description: 'product.framed2.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 180, height: 122 },
        portrait: { width: 122, height: 180 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: 'acrylic1',
        imagecarrier: '',
        frame: 'shamburg20',
        paper: '',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
        stretcherframe: '',
      },
      availableMountings: [
        'passe-partout1', 'acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5',
        'acrylic6', 'aludibond1', 'aludibond2', 'aludibond3', 'aludibond4', 'aludibond5',
        'aludibond6', 'aludibond7'
      ],
      steps: ['size', 'mounting', 'frame'], // Base steps
      detailedDescriptionKey: 'product.framed2.detailedDescription',
      recursiveDescription: 'product.framed2.recursiveDescription',
      images: ['/images/products/framed2_detail.webp'],
    },
    {
      id: 'framed3',
      name: 'product.framed3.name',
      description: 'product.framed3.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: 'acrylic1', // Default mounting can be set here
        imagecarrier: '',
        frame: 'wbasel15', // Default frame option
        paper: '', // Default paper option
        lamination: '', // Default lamination option
        materialfinish: '', // Default material finish
        motifborder: 'noborder', // Default motif border
        stretcherframe: '',
      },
      availableMountings: [
        'acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6',
        'aludibond1', 'aludibond2', 'aludibond3', 'aludibond4', 'aludibond5',
        'aludibond6', 'aludibond7', 'canvas-stretcher'
      ],
      steps: ['size', 'mounting', 'frame'], // Base steps
      detailedDescriptionKey: 'product.framed3.detailedDescription',
      recursiveDescription: 'product.framed3.recursiveDescription',
      images: ['/images/products/framed3_detail.webp', '/images/products/framed3_full.webp'],
    },
    {
      id: 'framed4',
      name: 'product.framed4.name',
      description: 'product.framed4.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 200, height: 122 },
        portrait: { width: 122, height: 200 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: 'acrylic1', // Default mounting can be set here
        imagecarrier: '',
        frame: 'aartbox25', // Default frame option
        paper: '', // Default paper option
        lamination: '', // Default lamination option
        materialfinish: '', // Default material finish
        motifborder: 'noborder', // Default motif border
        stretcherframe: '',
      },
      availableMountings: [
        'acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6',
        'aludibond1', 'aludibond2', 'aludibond3', 'aludibond4', 'aludibond5',
        'aludibond6', 'aludibond7'
      ],
      steps: ['size', 'mounting', 'frame'], // Base steps
      detailedDescriptionKey: 'product.framed4.detailedDescription',
      recursiveDescription: 'product.framed4.recursiveDescription',
      images: ['/images/products/framed4_detail.webp', '/images/products/framed4_full.webp'],
    },
    {
      id: 'framed5',
      name: 'product.framed5.name',
      description: 'product.framed5.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 200, height: 122 },
        portrait: { width: 122, height: 200 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: 'acrylic1', // Default mounting can be set here
        imagecarrier: '',
        frame: 'wartbox4', // Default frame option
        paper: '', // Default paper option
        lamination: '', // Default lamination option
        materialfinish: '', // Default material finish
        motifborder: 'noborder', // Default motif border
        stretcherframe: '',
      },
      availableMountings: [
        'acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6',
        'aludibond1', 'aludibond2', 'aludibond3', 'aludibond4', 'aludibond5',
        'aludibond6'
      ],
      steps: ['size', 'mounting', 'frame'], // Base steps
      detailedDescriptionKey: 'product.framed5.detailedDescription',
      recursiveDescription: 'product.framed5.recursiveDescription',
      images: ['/images/products/framed5_detail.webp', '/images/products/framed5_full.webp'],
    },
    {
      id: 'framed6',
      name: 'product.framed6.name',
      description: 'product.framed6.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 180, height: 122 },
        portrait: { width: 122, height: 180 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: 'acrylic1', // Default mounting can be set here
        imagecarrier: '',
        frame: 'whamburg20', // Default frame option
        paper: '', // Default paper option
        lamination: '', // Default lamination option
        materialfinish: '', // Default material finish
        motifborder: 'noborder', // Default motif border
        stretcherframe: '',
      },
      availableMountings: [
        'acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6',
        'aludibond1', 'aludibond2', 'aludibond3', 'aludibond4', 'aludibond5',
        'aludibond6', 'aludibond7', 'canvas-stretcher'
      ],
      steps: ['size', 'mounting', 'frame'], // Base steps
      detailedDescriptionKey: 'product.framed6.detailedDescription',
      recursiveDescription: 'product.framed6.recursiveDescription',
      images: ['/images/products/framed6_detail.webp', '/images/products/framed6_full.webp'],
    },
    {
      id: 'framed7',
      name: 'product.framed7.name',
      description: 'product.framed7.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 120, height: 80 },
        portrait: { width: 80, height: 120 },
        square: { width: 80, height: 80 },
      },
      defaultOptions: {
        mounting: 'passe-partout1',
        imagecarrier: '',
        frame: 'whamburg20',
        paper: 'hfapearl',
        lamination: '',
        glass: 'glossyfloat',
        materialfinish: '',
        motifborder: 'noborder',
        stretcherframe: '',
      },
      availableMountings: ['passe-partout1'],
      steps: ['size', 'frame', 'passepartoutcw', 'paper', 'glass', 'motifborder'], // Base steps
      detailedDescriptionKey: 'product.framed7.detailedDescription',
      recursiveDescription: 'product.framed7.recursiveDescription',
      images: ['/images/products/framed7_detail.webp', '/images/products/framed7_full.webp'],
    },
    {
      id: 'framed8',
      name: 'product.framed8.name',
      description: 'product.framed8.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: 'acrylic1', // Default mounting can be set here
        imagecarrier: '',
        frame: 'aslimline', // Default frame option
        paper: '', // Default paper option
        lamination: '', // Default lamination option
        materialfinish: '', // Default material finish
        motifborder: 'noborder', // Default motif border
        stretcherframe: '',
      },
      availableMountings: [
        'acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6'
      ],
      steps: ['size', 'mounting', 'frame', 'acrylglass', 'paper', 'hanginghardware', 'motifborder', 'summary'], // Base steps
      detailedDescriptionKey: 'product.framed8.detailedDescription',
      recursiveDescription: 'product.framed8.recursiveDescription',
      images: ['/images/products/framed8_detail.webp', '/images/products/framed8_full.webp'],
    },
    {
      id: 'framed9',
      name: 'product.framed9.name',
      description: 'product.framed9.description',
      category: 'framed',
      maxSize: {
        landscape: { width: 120, height: 80 },
        portrait: { width: 80, height: 120 },
        square: { width: 80, height: 80 },
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: 'imagecarrier1', // Default image carrier can be set here
        frame: 'sshadowbox21', // Default frame option
        paper: 'fcrystalarchiveg', // Default paper option
        lamination: '', // Default lamination option
        motifborder: 'noborder', // Default motif border
        stretcherframe: '',
      },
      steps: ['size', 'imagecarrier', 'frame'], // Base steps
      detailedDescriptionKey: 'product.framed9.detailedDescription',
      recursiveDescription: 'product.framed9.recursiveDescription',
      images: ['/images/products/framed9_detail.webp'],
    },
    {
      id: 'canvas1',
      name: 'product.canvas1.name',
      description: 'product.canvas1.description',
      category: 'canvas',
      maxSize: {
        landscape: { width: 190, height: 127 },
        portrait: { width: 127, height: 190 },
        square: { width: 127, height: 127 },
      },
      minSize: {
        width: 27,
        height: 27,
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: '',
        lamination: '',
        materialfinish: '',
        motifborder: '',
        corners: '',
        stretcherframe: 'stretcherframe1',
        sideappearance: 'mirrored',
      },
      steps: ['size', 'stretcherframe', 'sideappearance', 'frame', 'summary'], // Steps for this product
      detailedDescriptionKey: 'product.canvas1.detailedDescription',
      recursiveDescription: 'product.canvas1.recursiveDescription',
      images: ['/images/products/canvas1_detail.webp'],
    },
    {
      id: 'canvas2',
      name: 'product.canvas2.name',
      description: 'product.canvas2.description',
      category: 'canvas',
      maxSize: {
        landscape: { width: 190, height: 127 },
        portrait: { width: 127, height: 190 },
        square: { width: 127, height: 127 },
      },
      minSize: {
        width: 27,
        height: 27,
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: '',
        lamination: '',
        materialfinish: '',
        motifborder: '',
        corners: '',
        stretcherframe: 'stretcherframe1',
        sideappearance: 'mirrored',
      },
      steps: ['size', 'stretcherframe', 'sideappearance', 'frame', 'summary'], // Steps for this product
      detailedDescriptionKey: 'product.canvas2.detailedDescription',
      recursiveDescription: 'product.canvas2.recursiveDescription',
      images: ['/images/products/canvas2_detail.webp'],
    },
    {
      id: 'canvas3',
      name: 'product.canvas3.name',
      description: 'product.canvas3.description',
      category: 'canvas',
      maxSize: {
        landscape: { width: 150, height: 120 },
        portrait: { width: 120, height: 150 },
        square: { width: 120, height: 120 },
      },
      minSize: {
        width: 27,
        height: 27,
      },
      defaultOptions: {
        mounting: '',
        imagecarrier: '',
        frame: 'noframe',
        acrylicGlass: '',
        paper: '',
        lamination: '',
        materialfinish: '',
        motifborder: '',
        corners: '',
        stretcherframe: 'stretcherframe1',
        sideappearance: 'mirrored',
      },
      steps: ['size', 'stretcherframe', 'sideappearance', 'frame', 'summary'], // Steps for this product
      detailedDescriptionKey: 'product.canvas3.detailedDescription',
      recursiveDescription: 'product.canvas3.recursiveDescription',
      images: ['/images/products/canvas3_detail.webp'],
    },
    {
      id: 'photoprint1',
      name: 'product.photoprint1.name',
      description: 'product.photoprint1.description',
      category: 'photoprint',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        paper: 'fcrystalarchiveg', // Default paper option can be set here
        frame: 'noframe', // Default frame option
        lamination: 'nolam', // Default lamination option
        motifborder: 'noborder', // Default motif border
        corners: 'normalcorners', // Default corner option
        stretcherframe: '',
      },
      steps: ['size', 'paper', 'frame', 'lamination', 'motifborder', 'corners', 'summary'], // Steps for this product
      framedSteps: ['product', 'size', 'paper', 'frame', 'passepartoutcw', 'glass', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.photoprint1.detailedDescription',
      recursiveDescription: 'product.photoprint1.recursiveDescription',
      images: ['/images/products/photoprint1_detail.webp'],
    },
    {
      id: 'photoprint2',
      name: 'product.photoprint2.name',
      description: 'product.photoprint2.description',
      category: 'photoprint',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        paper: 'uhdphotoprint',
        frame: 'noframe', // Default frame option
        motifborder: 'noborder', // Default motif border
        corners: 'normalcorners', // Default corner option
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'motifborder', 'corners', 'summary'], // Steps for this product
      framedSteps: ['product', 'size', 'frame', 'passepartoutcw', 'glass', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.photoprint2.detailedDescription',
      recursiveDescription: 'product.photoprint2.recursiveDescription',
      images: ['/images/products/photoprint2_detail.webp'],
    },
    {
      id: 'photoprint3',
      name: 'product.photoprint3.name',
      description: 'product.photoprint3.description',
      category: 'photoprint',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        paper: 'fflex',
        frame: 'noframe', // Default frame option
        motifborder: 'noborder', // Default motif border
        corners: 'normalcorners', // Default corner option
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'motifborder', 'corners', 'summary'], // Steps for this product
      framedSteps: ['product', 'size', 'frame', 'passepartoutcw', 'glass', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.photoprint3.detailedDescription',
      recursiveDescription: 'product.photoprint3.recursiveDescription',
      images: ['/images/products/photoprint3_detail.webp'],
    },
    {
      id: 'photoprint4',
      name: 'product.photoprint4.name',
      description: 'product.photoprint4.description',
      category: 'photoprint',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        paper: 'muhdphotoprint',
        frame: 'noframe', // Default frame option
        motifborder: 'noborder', // Default motif border
        corners: 'normalcorners', // Default corner option
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'motifborder', 'corners', 'summary'], // Steps for this product
      framedSteps: ['product', 'size', 'frame', 'passepartoutcw', 'glass', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.photoprint4.detailedDescription',
      recursiveDescription: 'product.photoprint4.recursiveDescription',
      images: ['/images/products/photoprint4_detail.webp'],
    },
    {
      id: 'photoprint5',
      name: 'product.photoprint5.name',
      description: 'product.photoprint5.description',
      category: 'photoprint',
      maxSize: {
        landscape: { width: 100, height: 100 },
        portrait: { width: 100, height: 100 },
        square: { width: 100, height: 100 },
      },
      defaultOptions: {
        mounting: '',
        paper: 'baryta',
        frame: 'noframe', // Default frame option
        motifborder: 'noborder', // Default motif border
        corners: 'normalcorners', // Default corner option
        stretcherframe: '',
      },
      steps: ['size', 'frame', 'motifborder', 'summary'], // Steps for this product
      framedSteps: ['product', 'size', 'frame', 'passepartoutcw', 'glass', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.photoprint5.detailedDescription',
      recursiveDescription: 'product.photoprint5.recursiveDescription',
      images: ['/images/products/photoprint5_detail.webp'],
    },
    {
      id: 'photoprint6',
      name: 'product.photoprint6.name',
      description: 'product.photoprint6.description',
      category: 'photoprint',
      maxSize: {
        landscape: { width: 240, height: 122 },
        portrait: { width: 122, height: 240 },
        square: { width: 122, height: 122 },
      },
      defaultOptions: {
        mounting: '',
        paper: 'ibwg', // Default paper option can be set here
        frame: 'noframe', // Default frame option
        lamination: 'nolam', // Default lamination option
        acrylicGlass: '',
        motifborder: 'noborder', // Default motif border
        corners: 'normalcorners', // Default corner option
        stretcherframe: '',
      },
      steps: ['size', 'paper', 'frame', 'lamination', 'motifborder', 'corners', 'summary'], // Steps for this product
      framedSteps: ['product', 'size', 'paper', 'frame', 'passepartoutcw', 'glass', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.photoprint6.detailedDescription',
      recursiveDescription: 'product.photoprint6.recursiveDescription',
      images: ['/images/products/photoprint6_detail.webp'],
    },
    {
      id: 'fineart',
      name: 'product.fineart.name',
      description: 'product.fineart.description',
      category: 'giclee',
      maxSize: {
        landscape: { width: 300, height: 105 },
        portrait: { width: 105, height: 300 },
        square: { width: 105, height: 105 },
      },
      defaultOptions: {
        mounting: '',
        paper: 'hfapearl', // Default paper option can be set here
        frame: 'noframe',
        lamination: '',
        motifborder: 'noborder', // Default motif border
        corners: 'normalcorners',
        stretcherframe: '',
      },
      steps: ['size', 'paper', 'frame', 'motifborder', 'summary'], // Steps for this product
      framedSteps: ['product', 'size', 'paper', 'frame', 'passepartoutcw', 'glass', 'motifborder', 'summary'],
      detailedDescriptionKey: 'product.fineart.detailedDescription',
      recursiveDescription: 'product.fineart.recursiveDescription',
      images: ['/images/products/fineart_detail.webp'],
    },
    {
      id: 'digital1',
      name: 'product.digital1.name',
      description: 'product.digital1.description',
      category: 'digital',
      maxSize: {
        landscape: { width: Infinity, height: Infinity},
        portrait: { width: Infinity, height: Infinity},
        square: { width: Infinity, height: Infinity},
      },
      defaultOptions: {
        mounting: '',
        paper: '', // Default paper option can be set here
        frame: '',
        lamination: '',
        motifborder: '', // Default motif border
        corners: '',
        stretcherframe: '',
      },
      steps: ['summary'],
      images: ['/images/products/digital1.webp'],
    },
    { 
      id: 'passe-partout1',
      name: 'Photo print / Fine Art Print with passe-partout',
      category: 'special',
      maxSize: {
        landscape: { width: 120, height: 80 },
        portrait: { width: 78, height: 118 },
        square: { width: 80, height: 80 },
      },
      defaultOptions: {
        frame: '',
        mounting: '', // Default mounting can be set if needed
        paper: 'hfapearl',
        lamination: '',
        materialfinish: '',
        acrylicGlass: '',
        glass: 'glossyfloat',
        motifborder: 'noborder',
        stretcherframe: '',
        corners: '',
      },
      images: []
    },
    { 
      id: 'canvas-stretcher',
      name: 'Canvas on stretcher frame 20 mm',
      category: 'special',
      maxSize: {
        landscape: { width: 190, height: 127 },
        portrait: { width: 127, height: 190 },
        square: { width: 127, height: 127 },
      },
      minSize: {
        width: 27,
        height: 27,
      },
      defaultOptions: {
        frame: 'whamburg40',
        mounting: '',
        paper: 'cprintg',
        lamination: '',
        materialfinish: '',
        motifborder: 'noborder',
      },
      images: []
    },
]

export const productCategories: ProductCategory[] = [
    { id: 'acrylic', name: 'productCategory.acrylic.name' },
    { id: 'metal', name: 'productCategory.metal.name' },
    { id: 'framed', name: 'productCategory.framed.name' },
    { id: 'canvas', name: 'productCategory.canvas.name' },
    { id: 'photoprint', name: 'productCategory.photoprint.name' },
    { id: 'giclee', name: 'productCategory.giclee.name' },
    { id: 'digital', name: 'productCategory.digital.name' }
]