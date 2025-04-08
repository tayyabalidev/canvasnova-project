import { products } from "./products"
import { frameOptions } from "./frames"
import { sizeOptions } from "./other-options"
import { motifBorderOptions } from "./final-steps"

export const getMinSize = (product, frame, format, motifborder, passepartoutMargin) => {
  const selectedProduct = products.find(p => p.id === product)
  const selectedFrame = frameOptions.find(f => f.id === frame)
  let motifborderMargin = 0

  const selectedBorder = motifBorderOptions.find(m => m.id === motifborder)

  if (selectedBorder) {
    motifborderMargin = selectedBorder.margin
  }

  let minWidthCondition = selectedFrame && frame !== 'noframe' ? selectedFrame.conditions.minWidth : 0
  let minHeightCondition = selectedFrame && frame !== 'noframe' ? selectedFrame.conditions.minHeight : 0

  if (selectedProduct?.category === 'canvas' && selectedProduct.minSize) {
    minWidthCondition = Math.max(minWidthCondition, selectedProduct.minSize?.width)
    minHeightCondition = Math.max(minHeightCondition, selectedProduct.minSize?.height)
  }

  const sizes = sizeOptions[format].filter(size => {
    const [width, height] = size.name.split('x').map(dim => parseInt(dim));

    // Check if the size plus the margin is within the maximum allowed dimensions
    return (
      width + motifborderMargin + passepartoutMargin >= minWidthCondition && 
      height + motifborderMargin + passepartoutMargin >= minHeightCondition 
    )
  })

  return sizes[0].id
}