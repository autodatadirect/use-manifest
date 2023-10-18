import { useRef } from 'react'

export enum ColorType {
  Any,
  Reddish,
  Bluish,
  Greenish,
  Grayish
}

function standardizeColor (color: string): string {
  const ctx: any = document.createElement('canvas').getContext('2d')
  ctx.fillStyle = color
  return ctx.fillStyle.slice(1)
}

function parseHex (hexColor: string): { r: number, g: number, b: number } {
  const single = (color: string): number => parseInt(color, 16)
  return {
    r: single(hexColor.slice(0, 2)),
    g: single(hexColor.slice(2, 4)),
    b: single(hexColor.slice(4, 6))
  }
}

export function getColorType (color: string): ColorType {
  const hex = standardizeColor(color)
  const { r, g, b } = parseHex(hex)

  if (r > g && r > b) {
    return ColorType.Reddish
  }

  if (g > r && g > b) {
    return ColorType.Greenish
  }

  if (b > r && b > g) {
    return ColorType.Bluish
  }

  return ColorType.Grayish
}

export const useOnce = (func: () => void): void => {
  const ref = useRef(false)
  if (!ref.current) {
    func()
    ref.current = true
  }
}

export const sleep = async (ms: number): Promise<void> => await new Promise(resolve => setTimeout(resolve, ms))
