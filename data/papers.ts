import { Paper, Lamination } from './options.types'

export const paperOptions: Paper[] = [
    {
      id: 'fcrystalarchiveg',
      name: 'paper.fcrystalarchiveg.name',
      description: 'paper.fcrystalarchiveg.description',
      detailedDescription: 'paper.fcrystalarchiveg.detailedDescription',
      category: 'photoprintC',
      conditions: ['passe-partout1', 'aludibond2', 'photoprint1', 'acrylic1', 'acrylic4'],
      imageCarrierConditions: ['imagecarrier1', 'imagecarrier2', 'imagecarrier3', 'imagecarrier4'],
      images: ['/images/papers/fcrystalarchiveg.webp'],
    },
    {
      id: 'fcrystalarchivem',
      name: 'paper.fcrystalarchivem.name',
      description: 'paper.fcrystalarchivem.description',
      detailedDescription: 'paper.fcrystalarchivem.detailedDescription',
      category: 'photoprintC',
      conditions: ['passe-partout1', 'aludibond2', 'photoprint1'],
      imageCarrierConditions: ['imagecarrier1', 'imagecarrier2', 'imagecarrier3', 'imagecarrier4'],
      images: ['/images/papers/fcrystalarchivem.webp'],
    },
    {
      id: 'uhdphotoprint',
      name: 'paper.uhdphotoprint.name',
      description: 'paper.uhdphotoprint.description',
      detailedDescription: 'paper.uhdphotoprint.detailedDescription',
      category: 'photoprintC',
      conditions: ['passe-partout1', 'aludibond3', 'photoprint2', 'acrylic2'],
      images: ['/images/papers/uhdphotoprint.webp'],
    },
    {
      id: 'fcrystalarchives',
      name: 'paper.fcrystalarchives.name',
      description: 'paper.fcrystalarchives.description',
      detailedDescription: 'paper.fcrystalarchives.detailedDescription',
      category: 'photoprintC',
      conditions: ['passe-partout1', 'photoprint1'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/fcrystalarchives.webp'],
    },
    {
      id: 'fvelvet',
      name: 'paper.fvelvet.name',
      description: 'paper.fvelvet.description',
      detailedDescription: 'paper.fvelvet.detailedDescription',
      category: 'photoprintC',
      conditions: ['passe-partout1', 'photoprint1'],
      images: ['/images/papers/fvelvet.webp'],
    },
    {
      id: 'muhdphotoprint',
      name: 'paper.muhdphotoprint.name',
      description: 'paper.muhdphotoprint.description',
      detailedDescription: 'paper.muhdphotoprint.detailedDescription',
      category: 'photoprintC',
      conditions: ['passe-partout1', 'photoprint4', 'acrylic3'],
      images: ['/images/papers/muhdphotoprint.webp'],
    },
    {
      id: 'fflex',
      name: 'paper.fflex.name',
      description: 'paper.fflex.description',
      detailedDescription: 'paper.fflex.detailedDescription',
      category: 'photoprintC',
      conditions: ['passe-partout1', 'photoprint3'],
      images: ['/images/papers/fflex.webp'],
    },
    {
      id: 'ibwg',
      name: 'paper.ibwg.name',
      description: 'paper.ibwg.description',
      detailedDescription: 'paper.ibwg.detailedDescription',
      category: 'photoprintBW',
      conditions: ['passe-partout1', 'aludibond2', 'aludibond4', 'photoprint6', 'acrylic1', 'acrylic4', 'acrylic5'],
      acrylicGlassConditions: ['', 'a2g', 'a2m'],
      images: ['/images/papers/ibwg.webp'],
    },
    {
      id: 'ibwm',
      name: 'paper.ibwm.name',
      description: 'paper.ibwm.description',
      detailedDescription: 'paper.ibwm.detailedDescription',
      category: 'photoprintBW',
      conditions: ['passe-partout1', 'photoprint6'],
      images: ['/images/papers/ibwm.webp'],
    },
    {
      id: 'baryta',
      name: 'paper.baryta.name',
      description: 'paper.baryta.description',
      detailedDescription: 'paper.baryta.detailedDescription',
      category: 'photoprintBW',
      conditions: ['passe-partout1', 'photoprint5'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/baryta.webp'],
    },
    {
      id: 'hfapearl',
      name: 'paper.hfapearl.name',
      description: 'paper.hfapearl.description',
      additionalInfo: 'paper.hfapearl.additionalInfo',
      detailedDescription: 'paper.hfapearl.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'aludibond5', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/hfapearl.webp'],
    },
    {
      id: 'hwilliamturner',
      name: 'paper.hwilliamturner.name',
      description: 'paper.hwilliamturner.description',
      additionalInfo: 'paper.hwilliamturner.additionalInfo',
      detailedDescription: 'paper.hwilliamturner.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/hwilliamturner.webp'],
    },
    {
      id: 'hphotorag',
      name: 'paper.hphotorag.name',
      description: 'paper.hphotorag.description',
      additionalInfo: 'paper.hphotorag.additionalInfo',
      detailedDescription: 'paper.hphotorag.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/hphotorag.webp'],
    },
    {
      id: 'htorchon',
      name: 'paper.htorchon.name',
      description: 'paper.htorchon.description',
      additionalInfo: 'paper.htorchon.additionalInfo',
      detailedDescription: 'paper.htorchon.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/htorchon.webp'],
    },
    {
      id: 'hfabaryta',
      name: 'paper.hfabaryta.name',
      description: 'paper.hfabaryta.description',
      additionalInfo: 'paper.hfabaryta.additionalInfo',
      detailedDescription: 'paper.hfabaryta.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'aludibond5', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/hfabaryta.webp'],
    },
    {
      id: 'hpsilkbarytax',
      name: 'paper.hpsilkbarytax.name',
      description: 'paper.hpsilkbarytax.description',
      additionalInfo: 'paper.hpsilkbarytax.additionalInfo',
      detailedDescription: 'paper.hpsilkbarytax.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      images: ['/images/papers/hpsilkbarytax.webp'],
    },
    {
      id: 'carchesarag',
      name: 'paper.carchesarag.name',
      description: 'paper.carchesarag.description',
      additionalInfo: 'paper.carchesarag.additionalInfo',
      detailedDescription: 'paper.carchesarag.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'aludibond5', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/carchesarag.webp'],
    },
    {
      id: 'cbarytaprestige2',
      name: 'paper.cbarytaprestige2.name',
      description: 'paper.cbarytaprestige2.description',
      additionalInfo: 'paper.cbarytaprestige2.additionalInfo',
      detailedDescription: 'paper.cbarytaprestige2.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/cbarytaprestige2.webp'],
    },
    {
      id: 'cragphotographique',
      name: 'paper.cragphotographique.name',
      description: 'paper.cragphotographique.description',
      additionalInfo: 'paper.cragphotographique.additionalInfo',
      detailedDescription: 'paper.cragphotographique.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'aludibond5', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/cragphotographique.webp'],
    },
    {
      id: 'efacottonsmooth',
      name: 'paper.efacottonsmooth.name',
      description: 'paper.efacottonsmooth.description',
      additionalInfo: 'paper.efacottonsmooth.additionalInfo',
      detailedDescription: 'paper.efacottonsmooth.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/efacottonsmooth.webp'],
    },
    {
      id: 'efacottontextured',
      name: 'paper.efacottontextured.name',
      description: 'paper.efacottontextured.description',
      additionalInfo: 'paper.efacottontextured.additionalInfo',
      detailedDescription: 'paper.efacottontextured.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/efacottontextured.webp'],
    },
    {
      id: 'etraditionalpp',
      name: 'paper.etraditionalpp.name',
      description: 'paper.etraditionalpp.description',
      additionalInfo: 'paper.etraditionalpp.additionalInfo',
      detailedDescription: 'paper.etraditionalpp.detailedDescription',
      category: 'fineart',
      conditions: ['passe-partout1', 'fineart'],
      imageCarrierConditions: ['imagecarrier2'],
      images: ['/images/papers/etraditionalpp.webp'],
    },
    {
      id: 'fineartpaper',
      name: 'paper.fineartpaper.name',
      conditions: ['acrylic6'],
      description: '',
    },
    {
      id: 'cprintm',
      name: 'paper.cprintm.name',
      conditions: ['canvas-stretcher'],
      description: '',
    },
    {
      id: 'cprintg',
      name: 'paper.cprintg.name',
      conditions: ['canvas-stretcher'],
      description: '',
    },
]

export const laminationOptions: Lamination[] = [
  {
    id: 'nolam',
    name: 'lamination.nolam.name',
    description: 'lamination.nolam.description',
    productConditions: ['photoprint1', 'photoprint2', 'photoprint3', 'photoprint4', 'photoprint5', 'photoprint6'],
    paperConditions: ['fcrystalarchiveg', 'fcrystalarchivem', 'uhdphotoprint', 'fcrystalarchives', 'fvelvet', 'muhdphotoprint', 'fflex', 'ibwg', 'ibwm', 'baryta'],
  },
  {
    id: 'glossylam',
    name: 'lamination.glossylam.name',
    description: 'lamination.glossylam.description',
    productConditions: ['aludibond2', 'aludibond3', 'aludibond4', 'photoprint1', 'photoprint6'],
    paperConditions: ['fcrystalarchiveg', 'ibwg'],
  },
  {
    id: 'mattelam',
    name: 'lamination.mattelam.name',
    description: 'lamination.mattelam.description',
    productConditions: ['aludibond2', 'aludibond3', 'aludibond4', 'photoprint1', 'photoprint6'],
    paperConditions: ['fcrystalarchivem', 'ibwg'],
  },
]