import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

if (typeof window !== 'undefined') {
    window.HTMLElement.prototype.scrollIntoView = () => { }
}

expect.extend(matchers)