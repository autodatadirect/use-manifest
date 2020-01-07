import React from 'react'
import { storiesOf } from '@storybook/react'
import CellEpochDate from './index'
import { withKnobs, text } from '@storybook/addon-knobs/react'

const stories = storiesOf('CellEpochDate', module)
stories.addDecorator(withKnobs)
stories.add('Basic', () => (
  <CellEpochDate value={text('value', '2018-01-25T15:05:35.238Z')} />
))
