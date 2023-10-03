import React from 'react'
import Pager from '../ButtonPager'
import PageSizer, { PageSizerProps } from './PageSizer'
import Status, { DEFAULT_STATUS_MESSAGE_GENERATOR } from './Status'

export interface DefaultControlsProps extends PageSizerProps {
  statusMessageGenerator?: typeof DEFAULT_STATUS_MESSAGE_GENERATOR
}

const DefaultControls = ({ className, pageSizes, pageSizeLabelGenerator, statusMessageGenerator }: DefaultControlsProps) =>
  <div className={'manifest-controls' + (className ? ' ' + className : '')}>
    <PageSizer pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} />
    <Status statusMessageGenerator={statusMessageGenerator} />
    <Pager />
  </div>

export default DefaultControls
