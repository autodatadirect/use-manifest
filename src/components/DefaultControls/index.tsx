import React from 'react'
import Pager from '../ButtonPager'
import PageSizer, { DEFAULT_PAGE_SIZES, DEFAULT_TEXT_GENERATOR, PageSizerProps } from './PageSizer'
import Status, { DEFAULT_STATUS_MESSAGE_GENERATOR } from './Status'

export interface DefaultControlsProps extends PageSizerProps {
  statusMessageGenerator?: typeof DEFAULT_STATUS_MESSAGE_GENERATOR
}

const DefaultControls = ({ className, pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR, statusMessageGenerator = DEFAULT_STATUS_MESSAGE_GENERATOR }: DefaultControlsProps): React.JSX.Element =>
  <div className={'manifest-controls' + (className == null ? '' : ' ' + className)}>
    <PageSizer pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} />
    <Status statusMessageGenerator={statusMessageGenerator} />
    <Pager />
  </div>

export default DefaultControls
