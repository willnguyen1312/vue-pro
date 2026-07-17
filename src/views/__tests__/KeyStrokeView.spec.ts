import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import KeyStrokeView from '../KeyStrokeView.vue'

enableAutoUnmount(afterEach)

const pressKey = async (init: KeyboardEventInit): Promise<void> => {
  window.dispatchEvent(new KeyboardEvent('keydown', init))
  await nextTick()
}

describe('KeyStrokeView', () => {
  it('shows no match before any keystroke', () => {
    const wrapper = mount(KeyStrokeView)

    expect(wrapper.get('[data-test="match-count"]').text()).toBe('0')
    expect(wrapper.get('[data-test="last-combo"]').text()).toBe('—')
  })

  it('counts and displays a keystroke that satisfies the predicate', async () => {
    const wrapper = mount(KeyStrokeView)

    await pressKey({ key: 'A', shiftKey: true })

    expect(wrapper.get('[data-test="match-count"]').text()).toBe('1')
    expect(wrapper.get('[data-test="last-combo"]').text()).toBe('Shift + A')
  })

  it('ignores keystrokes rejected by the predicate', async () => {
    const wrapper = mount(KeyStrokeView)

    await pressKey({ key: 'a' })
    await pressKey({ key: 'B', shiftKey: true })
    await pressKey({ key: 'A', ctrlKey: true })

    expect(wrapper.get('[data-test="match-count"]').text()).toBe('0')
    expect(wrapper.get('[data-test="last-combo"]').text()).toBe('—')
  })

  it('accumulates every matching keystroke', async () => {
    const wrapper = mount(KeyStrokeView)

    await pressKey({ key: 'A', shiftKey: true })
    await pressKey({ key: 'a', shiftKey: true })

    expect(wrapper.get('[data-test="match-count"]').text()).toBe('2')
  })
})
