import React from 'react'
import { render } from '@testing-library/react-native'

import { MessageImage } from '..'
import { DEFAULT_TEST_MESSAGE } from './data'

describe('MessageImage', () => {
  it('should not render <MessageImage /> and compare with snapshot', async () => {
    const { toJSON } = await render(<MessageImage currentMessage={null} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('should  render <MessageImage /> and compare with snapshot', async () => {
    const { toJSON } = await render(
      <MessageImage
        currentMessage={{
          ...DEFAULT_TEST_MESSAGE,
          image: 'url://to/image.png',
        }}
      />
    )
    expect(toJSON()).toMatchSnapshot()
  })

  // The full-screen viewer holds three shared values, the animated styles over them and a
  // SafeAreaProvider. Mounted unconditionally it sat invisible behind every image in a
  // conversation, so it is now mounted on demand. (Opening it is not asserted here: the image is
  // wrapped in a gesture-handler BaseButton, which `fireEvent.press` does not drive.)
  it('does not mount the full-screen viewer until it is opened', async () => {
    const { toJSON } = await render(
      <MessageImage
        currentMessage={{
          ...DEFAULT_TEST_MESSAGE,
          image: 'url://to/image.png',
        }}
      />
    )

    expect(JSON.stringify(toJSON())).not.toContain('OverKeyboardView')
  })
})
