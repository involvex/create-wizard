import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar.vue'

describe('NavigationBar.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(NavigationBar, {
      global: {
        stubs: ['RouterLink'],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
