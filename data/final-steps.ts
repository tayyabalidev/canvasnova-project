import { MotifBorder, Corner, StretcherFrame, SideAppearance } from './options.types'

export const motifBorderOptions: MotifBorder[] = [
    {
      id: 'noborder',
      name: 'motifborder.noborder.name',
      description: 'motifborder.noborder.description',
      margin: 0,
    },
    {
      id: 'border1',
      name: 'motifborder.border1.name',
      description: 'motifborder.border1.description',
      margin: 2,
    },
    {
      id: 'border2',
      name: 'motifborder.border2.name',
      description: 'motifborder.border2.description',
      margin: 4,
    },
    {
      id: 'border3',
      name: 'motifborder.border3.name',
      description: 'motifborder.border3.description',
      margin: 6,
    },
    {
      id: 'border5',
      name: 'motifborder.border5.name',
      description: 'motifborder.border5.description',
      margin: 10,
    },
    {
      id: 'border8',
      name: 'motifborder.border8.name',
      description: 'motifborder.border8.description',
      margin: 16,
    },
    {
      id: 'border12',
      name: 'motifborder.border12.name',
      description: 'motifborder.border12.description',
      margin: 24,
    },
]

export const cornersOptions: Corner[] = [
    {
      id: 'normalcorners',
      name: 'corner.normalcorners.name',
      description: 'corner.normalcorners.description',
      conditions: ['acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6', 'aludibond1', 'aludibond6', 'aludibond7', 'photoprint1', 'photoprint2', 'photoprint3', 'photoprint4', 'photoprint6'],
    },
    {
      id: 'slightlyround',
      name: 'corner.slightlyround.name',
      description: 'corner.slightlyround.description',
      conditions: ['acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6', 'aludibond1', 'aludibond6', 'aludibond7'],
    },
    {
      id: 'stronglyround',
      name: 'corner.stronglyround.name',
      description: 'corner.stronglyround.description',
      conditions: ['acrylic1', 'acrylic2', 'acrylic3', 'acrylic4', 'acrylic5', 'acrylic6', 'aludibond1', 'aludibond6', 'aludibond7', 'photoprint1', 'photoprint2', 'photoprint3', 'photoprint4', 'photoprint6'],
    },
]

export const stretcherFrameOptions: StretcherFrame[] = [
    { 
      id: 'stretcherframe1', 
      name: 'stretcherframe.stretcherframe1.name',
      description: 'stretcherframe.stretcherframe1.description',
    },
    { 
      id: 'stretcherframe2', 
      name: 'stretcherframe.stretcherframe2.name',
      description: 'stretcherframe.stretcherframe2.description',
      frameCondition: 'noframe',
    },
    { 
      id: 'stretcherframe3', 
      name: 'stretcherframe.stretcherframe3.name',
      description: 'stretcherframe.stretcherframe3.description',
      frameCondition: 'noframe',
    },
]

export const sideAppearanceOptions: SideAppearance[] = [
    {
      id: 'mirrored',
      name: 'sideappearance.mirrored.name',
      description: 'sideappearance.mirrored.description',
    },
    {
      id: 'wrapped',
      name: 'sideappearance.wrapped.name',
      description: 'sideappearance.wrapped.description',
    },
]