import { extraCharge, noExtraCharge, negativeCharge } from "./constants"

import { ProductPricing, ImageCarrierPricing, FramePricing, PassePartoutColorPricing, AcrylglassPricing, PaperPricing, GlassPricing, LaminationPricing, MaterialFinishPricing, HangingHardwarePricing, MotifBorderPricing, StretcherFramePricing } from "@/data/options.types"

export const productPrices: ProductPricing[] = [
  {
    id: 'acrylic1',
    category: 'acrylic',
    basePrices: {
      landscape: {
        size1: 21,
        size2: 48,
        size3: 95,
        size4: 133,
        size5: 187,
        size6: 325,
        size7: 404,
        size8: 508,
        size9: 614,
        size10: 736,
        size11: 1267,
        size12: 1642,
        size13: 2103,
      },
      portrait: {
        size1: 21,
        size2: 45,
        size3: 95,
        size4: 133,
        size5: 187,
        size6: 325,
        size7: 404,
        size8: 508,
        size9: 614,
        size10: 736,
        size11: 1267,
        size12: 1642,
        size13: 2103,
      },
      square: {
        size1: 12,
        size2: 39,
        size3: 66,
        size4: 97,
        size5: 127,
        size6: 168,
        size7: 269,
        size8: 397,
        size9: 553,
        size10: 772,
        size11: 946,
        size12: 1170,
        size13: 1396,
      },
    },
  },
  {
    id: 'acrylic2',
    category: 'acrylic',
    basePricesReferenceProductId: 'acrylic1',
  },
  {
    id: 'acrylic3',
    category: 'acrylic',
    basePricesReferenceProductId: 'acrylic1',
  },
  {
    id: 'acrylic4',
    category: 'acrylic',
    basePricesReferenceProductId: 'acrylic1',
  },
  {
    id: 'acrylic5',
    category: 'acrylic',
    basePricesReferenceProductId: 'acrylic1',
  },
  {
    id: 'acrylic6',
    category: 'acrylic',
    basePricesReferenceProductId: 'acrylic1',
  },
  {
    id: 'aludibond1',
    category: 'metal',
    basePrices: {
      landscape: {
        size1: 12,
        size2: 29,
        size3: 51,
        size4: 80,
        size5: 114,
        size6: 181,
        size7: 223,
        size8: 272,
        size9: 363,
        size10: 433,
      },
      portrait: {
        size1: 12,
        size2: 26,
        size3: 51,
        size4: 80,
        size5: 114,
        size6: 181,
        size7: 223,
        size8: 272,
        size9: 363,
        size10: 433,
      },
      square: {
        size1: 7,
        size2: 23,
        size3: 35,
        size4: 54,
        size5: 74,
        size6: 100,
        size7: 150,
        size8: 213,
        size9: 326,
        size10: 528,
      },
    },
  },
  {
    id: 'aludibond2',
    category: 'metal',
    basePrices: {
      landscape: {
        size1: 17,
        size2: 40,
        size3: 65,
        size4: 98,
        size5: 141,
        size6: 234,
        size7: 288,
        size8: 353,
        size9: 468,
        size10: 562,
        size11: 943,
      },
      portrait: {
        size1: 17,
        size2: 37,
        size3: 65,
        size4: 98,
        size5: 141,
        size6: 234,
        size7: 288,
        size8: 353,
        size9: 468,
        size10: 562,
        size11: 943,
      },
      square: {
        size1: 9,
        size2: 33,
        size3: 45,
        size4: 69,
        size5: 93,
        size6: 127,
        size7: 196,
        size8: 278,
        size9: 424,
      },
    },
  },
  {
    id: 'aludibond4',
    category: 'metal',
    basePricesReferenceProductId: 'aludibond2',
  },
  {
    id: 'aludibond5',
    category: 'metal',
    basePricesReferenceProductId: 'aludibond2',
  },
  {
    id: 'aludibond6',
    category: 'metal',
    basePrices: {
      landscape: {
        size1: 14,
        size2: 36,
        size3: 60,
        size4: 93,
        size5: 136,
        size6: 238,
        size7: 287,
        size8: 352,
        size9: 433,
        size10: 546,
      },
      portrait: {
        size1: 14,
        size2: 33,
        size3: 60,
        size4: 93,
        size5: 136,
        size6: 238,
        size7: 287,
        size8: 352,
        size9: 433,
        size10: 546,
      },
      square: {
        size1: 8,
        size2: 29,
        size3: 43,
        size4: 68,
        size5: 95,
        size6: 133,
        size7: 215,
        size8: 293,
        size9: 421,
        size10: 666,
      },
    },
  },
  {
    id: 'aludibond7',
    category: 'metal',
    basePricesReferenceProductId: 'aludibond1',
  },
  {
    id: 'framed1',
    category: 'framed',
  },
  {
    id: 'framed2',
    category: 'framed',
  },
  {
    id: 'framed3',
    category: 'framed',
  },
  {
    id: 'framed4',
    category: 'framed',
  },
  {
    id: 'framed5',
    category: 'framed',
  },
  {
    id: 'framed6',
    category: 'framed',
  },
  {
    id: 'framed7',
    category: 'framed',
  },
  {
    id: 'framed8',
    category: 'framed',
  },
  {
    id: 'framed9',
    category: 'framed',
    basePrices: {
      landscape: {
        size1: 17,
        size2: 40,
        size3: 65,
        size4: 98,
        size5: 141,
        size6: 234,
        size7: 288,
        size8: 353,
        size9: 468,
        size10: 562,
        size11: 943,
      },
      portrait: {
        size1: 17,
        size2: 37,
        size3: 65,
        size4: 98,
        size5: 141,
        size6: 234,
        size7: 288,
        size8: 353,
        size9: 468,
        size10: 562,
        size11: 943,
      },
      square: {
        size1: 9,
        size2: 33,
        size3: 45,
        size4: 69,
        size5: 93,
        size6: 127,
        size7: 196,
        size8: 278,
        size9: 424,
      },
    },
  },
  {
    id: 'canvas1',
    category: 'canvas',
    basePrices: {
      landscape: {
        size3: 43,
        size4: 62,
        size5: 76,
        size6: 113,
        size7: 136,
        size8: 166,
        size9: 194,
        size10: 225,
      },
      portrait: {
        size3: 43,
        size4: 62,
        size5: 76,
        size6: 113,
        size7: 136,
        size8: 166,
        size9: 194,
        size10: 225,
      },
      square: {
        size3: 34,
        size4: 44,
        size5: 64,
        size6: 75,
        size7: 105,
        size8: 147,
        size9: 193,
      },
    },
  },
  {
    id: 'canvas2',
    category: 'canvas',
    basePrices: {
      landscape: {
        size3: 48,
        size4: 69,
        size5: 85,
        size6: 127,
        size7: 153,
        size8: 189,
        size9: 223,
        size10: 259,
      },
      portrait: {
        size3: 48,
        size4: 69,
        size5: 85,
        size6: 127,
        size7: 153,
        size8: 189,
        size9: 223,
        size10: 259,
      },
      square: {
        size3: 38,
        size4: 55,
        size5: 72,
        size6: 84,
        size7: 118,
        size8: 167,
        size9: 222,
      },
    },
  },
  {
    id: 'canvas3',
    category: 'canvas',
    basePrices: {
      landscape: {
        size3: 54,
        size4: 78,
        size5: 96,
        size6: 143,
        size7: 174,
        size8: 216,
      },
      portrait: {
        size3: 54,
        size4: 78,
        size5: 96,
        size6: 143,
        size7: 174,
        size8: 216,
      },
      square: {
        size3: 42,
        size4: 61,
        size5: 81,
        size6: 95,
        size7: 133,
        size8: 191,
        size9: 255,
      },
    },
  },
  {
    id: 'photoprint1',
    category: 'photoprint',
    basePrices: {
      landscape: {
        size1: 6,
        size2: 10,
        size3: 12,
        size4: 15,
        size5: 22,
        size6: 42,
        size7: 55,
        size8: 69,
        size9: 85,
        size10: 108,
        size11: 171,
      },
      portrait: {
        size1: 6,
        size2: 10,
        size3: 12,
        size4: 15,
        size5: 22,
        size6: 42,
        size7: 55,
        size8: 69,
        size9: 85,
        size10: 108,
        size11: 171,
      },
      square: {
        size1: 4,
        size2: 9,
        size3: 10,
        size4: 13,
        size5: 15,
        size6: 22,
        size7: 39,
        size8: 59,
        size9: 85,
      },
    },
  },
  {
    id: 'photoprint2',
    category: 'photoprint',
    basePricesReferenceProductId: 'photoprint1',
  },
  {
    id: 'photoprint3',
    category: 'photoprint',
    basePricesReferenceProductId: 'photoprint1',
  },
  {
    id: 'photoprint4',
    category: 'photoprint',
    basePricesReferenceProductId: 'photoprint1',
  },
  {
    id: 'photoprint5',
    category: 'photoprint',
    basePricesReferenceProductId: 'photoprint1',
  },
  {
    id: 'photoprint6',
    category: 'photoprint',
    basePricesReferenceProductId: 'photoprint1',
  },
  {
    id: 'fineart',
    category: 'giclee',
    basePrices: {
      landscape: {
        size1: 11,
        size2: 17,
        size3: 23,
        size4: 31,
        size5: 44,
        size6: 85,
        size7: 111,
        size8: 140,
        size9: 172,
        size10: 222,
      },
      portrait: {
        size1: 11,
        size2: 17,
        size3: 23,
        size4: 31,
        size5: 44,
        size6: 85,
        size7: 111,
        size8: 140,
        size9: 172,
        size10: 222,
      },
      square: {
        size1: 9,
        size2: 16,
        size3: 21,
        size4: 24,
        size5: 33,
        size6: 44,
        size7: 78,
        size8: 120,
      },
    },
  },
  {
    id: 'digital1',
    category: 'digital',
    basePrices: {
      landscape: { size1: -1 },
      portrait: { size1: -1 },
      square: { size1: -1 }
    }
  },
  {
    id: 'passe-partout1',
    category: 'special',
  },
  {
    id: 'canvas-stretcher',
    category: 'special',
  },
]

export const imageCarrierPrices: ImageCarrierPricing[] = [
  {
    id: 'imagecarrier1',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'imagecarrier2',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'imagecarrier3',
    pricing: {
      default: {
        functionType: 'linear',
        surcharge: extraCharge,
        parameters: { m: 0.01706547, t: 11.95759 }
      },
    },
  },
  {
    id: 'imagecarrier4',
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3000) {
            return 5
          } else {
            return 19 // For all values above 4500
          }
        }
      }
    },
  },
]

export const framePrices: FramePricing[] = [
  {
    id: 'noframe',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'whamburg20',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 95829.34, b: 0.526622, c: 560369.1, d: 16.58148, f: 0.01051255 }
      },
    },
  },
  {
    id: 'whamburg40',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 149803.9, b: 0.5305118, c: 844388.5, d: 27.01263, f: 0.01173118 }
      },
    },
  },
  {
    id: 'wbern20',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 118497.1, b: 0.539611, c: 640492.3, d: 27.19851, f: 0.0130779 }
      },
    },
  },
  {
    id: 'wbern50',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 1385.425, b: 0.556428, c: 1486476000, d: 47.51092, f: 142.4496 }
      },
    },
  },
  {
    id: 'wstockholm30',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 127776.9, b: 0.5297697, c: 751938.3, d: 26.81662, f: 0.01055433 }
      },
    },
  },
  {
    id: 'wstockholm50',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 161773.8, b: 0.5292289, c: 891214.1, d: 37.81483, f: 0.01236449 }
      },
    },
  },
  {
    id: 'wvienna27',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 208563.6, b: 0.6077577, c: 1083289, d: 41.29321, f: 0.01746276 }
      },
    },
  },
  {
    id: 'wbasel6',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 8.085027999999999e-19, b: -3.981446e-14, c: 7.102724e-10, d: -0.000005664038, e: 0.02363978, f: 45.73207 },
        notNegative: true
      },
    },
  },
  {
    id: 'wbasel15',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 8.724008e-21, b: -1.453287e-15, c: 7.737968e-11, d: -0.000001520989, e: 0.01503578, f: 58.19024 },
        notNegative: true
      },
      canvas: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 103578.8, b: 0.485259, c: 584918.9, d: 46.85211, f: 0.009217979 },
      },
    },
  },
  {
    id: 'wbasel31',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 2.104718e-20, b: -2.971657e-15, c: 1.427575e-10, d: -0.000002706157, e: 0.02743257, f: 78.13277 },
        notNegative: true
      },
    },
  },
  {
    id: 'wartbox4',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 236.627, b: 3.946962, c: 3772.527, d: 33.00901, f: 0.1397083 }
      },
    },
  },
  {
    id: 'wtokyo20',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 4.2737619999999996e-19, b: -2.628875e-14, c: 5.933185e-10, d: -0.000006294312, e: 0.04461749, f: 85.17081 },
        notNegative: true
      },
    },
  },
  {
    id: 'wbarcelona12',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 1.665016e-18, b: -8.267031e-14, c: 1.48232e-9, d: -0.00001174968, e: 0.04992076, f: 55.94433 },
        notNegative: true
      },
    },
  },
  {
    id: 'wbaselplus21',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 2151.2, b: 0.6423834, c: 7678441000, d: 119.6882, f: 1390.061 }
      },
      canvas: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 1.481638e-18, b: -9.6218e-14, c: 2.033924e-9, d: -0.00001896476, e: 0.1119876, f: 114.7225 },
        notNegative: true
      },
    },
  },
  {
    id: 'woslo12',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 52911.06, b: 0.4370427, c: 263308.7, d: 3.151853, f: 0.01118244 }
      },
    },
  },
  {
    id: 'aartbox10',
    pricing: {
      default: {
          functionType: 'polynomial',
          surcharge: extraCharge,
          parameters: { a: 5.384713e-19, b: -2.431375e-14, c: 3.802729e-10, d: -0.000002540579, e: 0.010420010, f: 33.87855 },
          notNegative: true
      },
    },
  },
  {
    id: 'aartbox25',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: -8.037703999999999e-19, b: 4.326564e-14, c: -8.507621e-10, d: 0.000007129779, e: -0.01526683, f: 70.26976 },
        notNegative: true
      },
    },
  },
  {
    id: 'aartbox50',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 34806970, b: 9.03358, c: 3123.013, d: 86.01615, f: 2.56027e-7 }
      },
    },
  },
  {
    id: 'aartbox75',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 40004690, b: 5.338629, c: 3136.808, d: 95.61417, f: 4.448563e-7 }
      },
    },
  },
  {
    id: 'asanfrancisco30',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 249643.7, b: 0.5900021, c: 1197963, d: 108.7537, f: 0.02009121 }
      },
    },
  },
  {
    id: 'aslimline',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 92944.07, b: 0.6879086, c: 748851.3, d: 16.16744, f: 0.008101292 }
      },
    },
  },
  {
    id: 'amiami9',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 15379190, b: 1.849104, c: 2432.902, d: 42.54482, f: 0.000006529475 }
      },
    },
  },
  {
    id: 'sshadowbox21',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 3286261, b: 0.558346, c: 7462.652, d: 32.037, f: 0.00007511853 }
      },
    },
  },
  {
    id: 'shamburg20',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 379591.5, b: 0.8927434, c: 1522030, d: 53.87792, f: 0.05130175 }
      },
    },
  },
  {
    id: 'slondon65',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 309743.9, b: 0.5815719, c: 1368728, d: 97.45294, f: 0.02372768 }
      },
    },
  },
  {
    id: 'stuscany68',
    pricing: {
        default: {
          functionType: 'asymmetricalSigmoidal',
          surcharge: extraCharge,
          parameters: { a: 416405.3, b: 0.6825283, c: 1830491, d: 123.7197, f: 0.02874154 }
        },
    },
  },
  {
    id: 'stuscany105',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 467694.1, b: 0.6636714, c: 1910433, d: 184.1401, f: 0.03194244 }
      },
    },
  },
  {
    id: 'sbrittany54',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 224987.1, b: 0.588676, c: 1124648, d: 56.71158, f: 0.01837694 }
      },
    },
  },
  {
    id: 'scopenhagen14',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 6981670, b: 1.098834, c: 1705.56, d: 67.73038, f: 0.00001803057 }
      },
    },
  },
  {
    id: 'spopart320',
    pricing: {
      default: {
        functionType: 'linear',
        surcharge: extraCharge,
        parameters: { m: 0, t: 42 }
      },
    },
  },
  {
    id: 'spopart340',
    pricing: {
      default: {
        functionType: 'linear',
        surcharge: extraCharge,
        parameters: { m: 0, t: 121 }
      },
    },
  },
]

export const passepartoutColorPrices: PassePartoutColorPricing[] = [
  { 
    id: 'bright-white', 
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  { 
    id: 'natural-white', 
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 4500) {
            return 2
          } else {
            return 3 // For all values above 4500
          }
        }
      }
    },
  },
  { 
    id: 'ivory', 
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2800) {
            return 4
          } else if (x >= 2800 && x < 4500) {
            return 6
          } else {
            return 9
          }
        }
      }
    },
  },
  { 
    id: 'light-grey', 
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2800) {
            return 5
          } else if (x >= 2800 && x < 4500) {
            return 8
          } else {
            return 11
          }
        }
      }
    },
  },
  { 
    id: 'dark-grey', 
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2800) {
            return 4
          } else if (x >= 2800 && x < 4500) {
            return 6
          } else {
            return 9
          }
        }
      }
    },
  },
  { 
    id: 'anthracite', 
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2800) {
            return 4
          } else if (x >= 2800 && x < 4500) {
            return 6
          } else {
            return 9
          }
        }
      }
    },
  },
  { 
    id: 'black', 
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2500) {
            return 4
          } else if (x >= 2500 && x < 3700) {
            return 6
          } else {
            return 9
          }
        }
      }
    },
  },
  { 
    id: 'linen-natural-white', 
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 17519900, b: 4.677193, c: 2654.085, d: 22.12187, f: 8.333949e-7 }
      },
    },
  },
  { 
    id: 'linen-ivory', 
    pricing: {
        default: {
          functionType: 'asymmetricalSigmoidal',
          surcharge: extraCharge,
          parameters: { a: 17519900, b: 4.677193, c: 2654.085, d: 22.12187, f: 8.333949e-7 }
        },
    },
  },
  { 
    id: 'linen-black', 
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 17519900, b: 4.677193, c: 2654.085, d: 22.12187, f: 8.333949e-7 }
      },
    },
  },
]

export const acrylglassPrices: AcrylglassPricing[] = [
  { 
    id: 'a2g',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  { 
    id: 'a2m', 
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 1.776284e-19, b: -8.788559e-15, c: 1.349567e-10, d: -7.382932e-7, e: 0.007710451, f: 3.678171 },
        notNegative: true
      },
    },
  },
  { 
    id: 'a4g', 
    pricing: {
      default: {
        functionType: 'linear',
        surcharge: noExtraCharge,
        parameters: { m: 0.003, t: 4.5 }
      },
    },
  },
  { 
    id: 'a6g',
    pricing: {
      default: {
        functionType: 'linear',
        surcharge: noExtraCharge,
        parameters: { m: 0.007426698, t: 7.375 }
      },
    },
  },
]

export const paperPrices: PaperPricing[] = [
  {
    id: 'fcrystalarchiveg',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'fcrystalarchivem',
    pricing: {
      default: {
        functionType: 'linear',
        surcharge: noExtraCharge,
        parameters: { m: 0, t: 1 }
      },
    },
  },
  {
    id: 'uhdphotoprint',
    pricing: {
      acrylic1: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 2.3921079999999996e-19, b: -1.238843e-14, c: 2.386004e-10, d: -0.000001982837, e: 0.02096902, f: 3.602441 }
      },
      photoprint1: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 96.39053, b: 1.508621, c: 64953970, d: 2.085539, f: 100471.1 }
      },
    },
  },
  {
    id: 'fcrystalarchives',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 5.90215e-20, b: -3.09348e-15, c: 5.082553e-11, d: -2.940897e-7, e: 0.00106058, f: 0.5599247 },
        notNegative: true
      },
    },
  },
  {
    id: 'fvelvet',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 5.304881e-20, b: -2.535772e-15, c: 3.388444e-11, d: -6.171719e-8, e: 0.002281811, f: 4.339647 },
        notNegative: true
      },
    },
  },
  {
    id: 'muhdphotoprint',
    pricing: {
      acrylic1: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 1.8555439999999999e-19, b: -9.463001e-15, c: 1.801491e-10, d: -0.000001408468, e: 0.02040428, f: 7.508661 }
      },
      photoprint1: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 454.6229, b: 1.332353, c: 109361100, d: 4.707662, f: 19292.23 }
      },
    },
  },
  {
    id: 'fflex',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: -1.3693689999999998e-19, b: 8.497736e-15, c: -1.796907e-10, d: 0.000001695661, e: 0.004918975, f: 13.95193 },
        notNegative: true
      },
    },
  },
  {
    id: 'ibwg',
    pricing: {
      acrylic1: {
        functionType: 'exponential',
        surcharge: extraCharge,
        parameters: { Y0: 4.087346, V0: -0.004125178, K: -0.00003272462 }
      },
      photoprint1: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 242.7567, b: 1.465964, c: 237291100, d: 8.167283, f: 751897.7 }
      },
      aludibond2: {
        functionType: 'exponential',
        surcharge: extraCharge,
        parameters: { Y0: 4.087346, V0: -0.004125178, K: -0.00003272462 }
      },
    },
  },
  {
    id: 'ibwm',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 221933.4, b: 1.352202, c: 891619, d: 7.048291, f: 0.09256823 }
      },
    },
  },
  {
    id: 'baryta',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 104636, b: 1.145255, c: 352090.8, d: 11.96148, f: 0.1049687 }
      },
    },
  },
  {
    id: 'hfapearl',
    pricing: {
      fineart: { functionType: 'none', surcharge: noExtraCharge, parameters: {} },
      aludibond2: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 260653.4, b: 1.151128, c: 1055669, d: 11.75659, f: 0.07244071 }
      },
    },
  },
  {
    id: 'hwilliamturner',
    pricing: {
      default: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 4500) {
            return 1
          } else if (x >= 4500 && x < 10000) {
            return 2;
          } else if (x >= 10000 && x < 18000) {
            return 4;
          } else {
            return 5; // For all values above 18000
          }
        }
      }
    },
  },
  {
    id: 'hphotorag',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }
    },
  },
  {
    id: 'htorchon',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }
    },
  },
  {
    id: 'hfabaryta',
    pricing: {
      aludibond2: {
        functionType: 'exponential',
        surcharge: extraCharge,
        parameters: { Y0: 10.79395, V0: -0.008696723, K: -0.00002588321 }
      },
      fineart: {
        functionType: 'linear',
        surcharge: noExtraCharge,
        parameters: { m: 0.0008045052, t: 1.536605 },
      },
    },
  },
  {
    id: 'hpsilkbarytax',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: negativeCharge,
        parameters: { a: -70131.7, b: 1.215836, c: 492456.2, d: -1.826084, f: 0.02552976 }
      },
    },
  },
  {
    id: 'carchesarag',
    pricing: {
      aludibond2: {
        functionType: 'exponential',
        surcharge: extraCharge,
        parameters: { Y0: 9.392864, V0: -0.007124049, K: -0.00002655284 }
      },
      fineart: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: negativeCharge,
        parameters: { a: -42030.15, b: 1.25405, c: 380836.7, d: -1.092655, f: 0.01595927 }
      },
    },
  },
  {
    id: 'cbarytaprestige2',
    pricing: {
      default: {
        functionType: 'exponential',
        surcharge: negativeCharge,
        parameters: { Y0: -0.026317, V0: 0.0007401207, K: -0.00003888676 }
      },
    },
  },
  {
    id: 'cragphotographique',
    pricing: {
      aludibond2: {
        functionType: 'exponential',
        surcharge: extraCharge,
        parameters: { Y0: 9.392864, V0: -0.007124049, K: -0.00002655284 }
      },
      fineart: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: negativeCharge,
        parameters: { a: -42030.15, b: 1.25405, c: 380836.7, d: -1.092655, f: 0.01595927 }
      },
    },
  },
  {
    id: 'efacottonsmooth',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }
    },
  },
  {
    id: 'efacottontextured',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }
    },
  },
  {
    id: 'etraditionalpp',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }
    },
  },
  {
    id: 'fineartpaper',
    pricing: {
      default: {
        functionType: 'exponential',
        surcharge: extraCharge,
        parameters: { Y0: 13.01706, V0: -0.01311191, K: -0.00003020445 }
      },
    },
  },
  {
    id: 'cprintm',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }
    },
  },
  {
    id: 'cprintg',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }
    },
  },
]

export const glassPrices: GlassPricing[] = [
  {
    id: 'glossyfloat',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'mattefloat',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 11.10362, b: 10.22669, c: 747.813, d: 4.003567, f: 0.2413874 }
      },
    },
  },
  {
    id: 'acrylicg',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'museum',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 8472329, b: 2.114382, c: 3904.475, d: 2.424959, f: 0.00001061258 }
      },
    },
  }
]

export const laminationPrices: LaminationPricing[] = [
  {
    id: 'nolam',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'glossylam',
    pricing: {
      aludibond2: { functionType: 'none', surcharge: noExtraCharge, parameters: {} },
      photoprint1: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: -2.6462e-20, b: 1.794446e-15, c: -4.211981e-11, d: 4.207616e-7, e: -0.0003240302, f: 1.948793 },
        notNegative: true
      },
    },
  },
  {
    id: 'mattelam',
    pricing: {
      aludibond2: { functionType: 'none', surcharge: noExtraCharge, parameters: {} },
      photoprint1: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: -2.6462e-20, b: 1.794446e-15, c: -4.211981e-11, d: 4.207616e-7, e: -0.0003240302, f: 1.948793 },
        notNegative: true
      },
    },
  },
]

export const materialFinishPrices: MaterialFinishPricing[] = [
  {
    id: 'bsilver',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'bgold',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: -1.5959029999999999e-19, b: 3.413702e-15, c: -4.763723e-12, d: -3.234008e-7, e: 0.00442297, f: -1.625748 },
        notNegative: true
      },
    },
  },
  {
    id: 'glossy',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 2386643, b: 1.051346, c: 37779.44, d: 3.461539, f: 0.0003496333 }
      },
    },
  },
  {
    id: 'bglossy',
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 488109.9, b: 0.993338, c: 79479.77, d: 2.60911, f: 0.00377032 }
      },
    },
  },
]

export const hangingHardwarePrices: HangingHardwarePricing[] = [
  {
    id: 'nohangingelements',
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: negativeCharge,
        parameters: { a: 9.576939e-21, b: 5.79615e-16, c: -5.36694e-11, d: 0.000001087723, e: -0.01056318, f: 0 },
        notNegative: false
      },
    },
  },
  {
    id: 'hangingelements',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'rails',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'cylindricalspacers',
    pricing: {
      default: {
        functionType: 'linear',
        surcharge: noExtraCharge,
        parameters: { m: -0.006170554, t: 20.25944 }
      },
    },
  },
]

export const motifBorderPrices: MotifBorderPricing[] = [
  {
    id: 'noborder',
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  {
    id: 'border1',
    pricing: {
      acrylic1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3900) {
            return 11
          } else if (x >= 3900 && x < 18000) {
            return 22
          } else {
            return 30
          }
        }
      },
      aludibond1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 6800) {
            return 7
          } else if (x >= 6800 && x < 12200) {
            return 18
          } else if (x >= 12200 && x < 18000) {
            return 49
          } else {
            return 100
          }
        }
      },
      aludibond2: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3900) {
            return 9
          } else if (x === 14884) {
            return 61
          } else {
            return 21
          }
        }
      },
      aludibond6: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2800) {
            return 6
          } else if (x >= 2800 && x < 9700) {
            return 9
          } else if (x >= 9700 && x < 15000) {
            return 14
          } else {
            return 22
          }
        }
      },
      photoprint1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2800) {
            return 2
          } else if (x >= 2800 && x < 15000) {
            return 3
          } else {
            return 5
          }
        }
      },
      fineart: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3900) {
            return 3
          } else if (x >= 3900 && x < 15000) {
            return 5
          } else {
            return 10
          }
        }
      },
    },
  },
  {
    id: 'border2',
    pricing: {
      acrylic1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 600) {
            return 10
          } else if (x >= 600 && x < 7100) {
            return 23
          } else if (x >= 7100 && x < 18600) {
            return 44
          } else {
            return 65
          }
        }
      },
      aludibond1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 7100) {
            return 12
          } else if (x === 15376) {
            return 65
          } else if (x >= 7100 && x < 18600) {
            return 30
          } else {
            return 115
          }
        }
      },
      aludibond2: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2000) {
            return 11
          } else if (x >= 2000 && x < 7100) {
            return 15
          } else if (x >= 7100 && x < 18600) {
            return 37
          } else {
            return 47
          }
        }
      },
      aludibond6: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2000) {
            return 11
          } else if (x >= 2000 && x < 10100) {
            return 16
          } else if (x >= 10100 && x < 15500) {
            return 32
          } else {
            return 43
          }
        }
      },
      photoprint1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3000) {
            return 2
          } else if (x >= 3000 && x < 12600) {
            return 5
          } else {
            return 9
          }
        }
      },
      fineart: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 4200) {
            return 6
          } else if (x >= 4200 && x < 10900) {
            return 9
          } else if (x >= 10900 && x < 15500) {
            return 13
          } else {
            return 20
          }
        }
      },
    },
  },
  {
    id: 'border3',
    pricing: {
      acrylic1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 700) {
            return 15
          } else if (x >= 700 && x < 4400) {
            return 33
          } else if (x >= 4400 && x < 13100) {
            return 54
          } else if (x >= 13100 && x < 19200) {
            return 67
          } else {
            return 86
          }
        }
      },
      aludibond1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 4400) {
            return 16
          } else if (x === 15876) {
            return 78
          } else {
            return 39
          }
        }
      },
      aludibond2: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 1300) {
            return 13
          } else if (x >= 1300 && x < 4400) {
            return 22
          } else if (x >= 4400 && x < 11300) {
            return 41
          } else {
            return 51
          }
        }
      },
      aludibond6: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 1.6904e-20, b: -2.602429e-15, c: 9.749072e-11, d: -0.000001270335, e: 0.007736967, f: 7.469376 },
        notNegative: true
      },
      photoprint1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3200) {
            return 3
          } else if (x >= 3200 && x < 13100) {
            return 7
          } else {
            return 14
          }
        }
      },
      fineart: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3200) {
            return 7
          } else if (x >= 3200 && x < 8200) {
            return 12
          } else if (x >= 8200 && x < 13100) {
            return 16
          } else {
            return 30
          }
        }
      },
    },
  },
  {
    id: 'border5',
    pricing: {
      acrylic1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2501) {
            return 40
          } else if (x >= 2501 && x < 5000) {
            return 54
          } else if (x >= 5000 && x < 9000) {
            return 70
          } else if (x >= 9000 && x <= 17000) {
            return 103
          } else {
            return 237
          }
        }
      },
      aludibond1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 1601) {
            return 18
          } else if (x >= 1601 && x < 5000) {
            return 31
          } else if (x >= 5000 && x < 12101) {
            return 40
          } else if (x >= 12101 && x <= 17000) {
            return 100
          } else {
            return 137
          }
        }
      },
      aludibond2: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 1601) {
            return 22
          } else if (x >= 1601 && x < 3601) {
            return 36
          } else if (x >= 3601 && x < 5000) {
            return 41
          } else if (x >= 5000 && x < 12200) {
            return 52
          } else if (x >= 12200 && x <= 17000) {
            return 93
          } else {
            return 165
          }
        }
      },
      aludibond6: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 1601) {
            return 23
          } else if (x >= 1601 && x < 2501) {
            return 28
          } else if (x >= 2501 && x < 9000) {
            return 41
          } else {
            return Math.round(0.006456093*x - 19.90065)
          }
        }
      },
      photoprint1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2501) {
            return 5
          } else if (x >= 2501 && x < 5000) {
            return 8
          } else if (x >= 5000 && x < 14100) {
            return 13
          } else {
            return 23
          }
        }
      },
      fineart: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2501) {
            return 8
          } else if (x >= 2501 && x < 3601) {
            return 11
          } else if (x >= 3601 && x < 8101) {
            return 19
          } else if (x >= 8101 && x <= 14100) {
            return 27
          } else {
            return 40
          }
        }
      },
    },
  },
  {
    id: 'border8',
    pricing: {
      acrylic1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3200) {
            return 59
          } else if (x >= 3200 && x < 4400) {
            return 70
          } else if (x >= 4400 && x < 9300) {
            return 90
          } else if (x >= 9300 && x < 15600) {
            return 145
          } else if (x >= 15600 && x < 20000) {
            return 165
          } else {
            return 314
          }
        }
      },
      aludibond1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3200) {
            return 38
          } else if (x >= 3200 && x < 9300) {
            return 47
          } else if (x >= 9300 && x < 13500) {
            return 76
          } else {
            return 132
          }
        }
      },
      aludibond2: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3200) {
            return 44
          } else if (x >= 3200 && x < 9300) {
            return 62
          } else if (x >= 9300 && x < 11000) {
            return 75
          } else if (x >= 11000 && x < 13500) {
            return 97
          } else if (x >= 13500 && x < 18700) {
            return 151
          } else {
            return 219
          }
        }
      },
      aludibond6: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 1601) {
            return Math.round(0.01014828*x - 14.8686)
          } else if (x >= 3200 && x < 10200) {
            return 66
          } else {
            return Math.round(0.01039206*x - 39.57882)
          }
        }
      },
      photoprint1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3200) {
            return 6
          } else if (x >= 3200 && x < 5900) {
            return 13
          } else if (x >= 5900 && x < 15600) {
            return 22
          } else {
            return 34
          }
        }
      },
      fineart: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2200) {
            return 9
          } else if (x >= 2200 && x < 5900) {
            return Math.round(0.004205699*x + 2.250072)
          } else {
            return Math.round(0.002492325*x + 8.391177)
          }
        }
      },
    }
  },
  {
    id: 'border12',
    pricing: {
      acrylic1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2000) {
            return 75
          } else if (x >= 2000 && x < 4100) {
            return 91
          } else if (x >= 4100 && x < 7100) {
            return 120
          } else if (x >= 7100 && x < 10900) {
            return 153
          } else if (x >= 10900 && x < 11900) {
            return 182
          } else if (x >= 11900 && x < 17700) {
            return 228
          } else {
            return 379
          }
        }
      },
      aludibond1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2000) {
            return 42
          } else if (x >= 2000 && x < 3000) {
            return 51
          } else if (x >= 3000 && x < 7200) {
            return 69
          } else if (x >= 7200 && x < 15400) {
            return Math.round(0.02132364*x - 153.7411)
          } else {
            return Math.round(0.03391473*x - 440.2558)
          }
        }
      },
      aludibond2: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 2000) {
            return 50
          } else if (x >= 2000 && x < 3000) {
            return 58
          } else if (x >= 3000 && x < 4100) {
            return 78
          } else if (x >= 4100 && x < 10900) {
            return 94
          } else {
            return Math.round(0.01588681*x - 54.06946)
          }
        }
      },
      aludibond6: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 4100) {
            return Math.round(0.01234064*x + 29.66865)
          } else if (x >= 4100 && x < 10900) {
            return 99
          } else {
            return Math.round(0.01358886*x - 48.25669)
          }
        }
      },
      photoprint1: {
        functionType: 'step',
        surcharge: noExtraCharge,
        step(x) {
          if (x >= 0 && x < 3000) {
            return 7
          } else if (x >= 3000 && x < 4100) {
            return 12
          } else if (x >= 4100 && x < 5500) {
            return 17
          } else if (x >= 5500 && x < 7200) {
            return 20
          } else if (x >= 7200 && x < 11900) {
            return 26
          } else {
            return Math.round(0.002976527*x - 13.45835)
          }
        }
      },
      fineart: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: -5.688183999999999e-19, b: 3.013243e-14, c: -5.58691e-10, d: 0.000004267757, e: -0.007941833, f: 15.64425 },
        notNegative: true
      },
    }
  },
]

export const stretcherFramePrices: StretcherFramePricing[] = [
  { 
    id: 'stretcherframe1', 
    pricing: {
      default: { functionType: 'none', surcharge: noExtraCharge, parameters: {} }, // No extra cost
    },
  },
  { 
    id: 'stretcherframe2', 
    pricing: {
      default: {
        functionType: 'polynomial',
        surcharge: extraCharge,
        parameters: { a: 1.5979999999999998e-19, b: -6.759421e-15, c: 9.912735e-11, d: -6.09245e-7, e: 0.002255722, f: 2.658678 },
        notNegative: true
      },
    },
  },
  { 
    id: 'stretcherframe3', 
    pricing: {
      default: {
        functionType: 'asymmetricalSigmoidal',
        surcharge: extraCharge,
        parameters: { a: 520254.7, b: 0.7178177, c: 22486.71, d: 11.69254, f: 0.0001783223 }
      },
    },
  },
]