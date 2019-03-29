/*
 * File: mainChoice.ts
 * Project: VoiceAssistant
 * File Created: Friday, 29th March 2019 10:42:02 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Friday, 29th March 2019 10:42:31 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { DFConv } from '../../../app';
import { intentName } from '../../../intent/intent';
import { intentNamePlayAudiobookIndex } from '../../../intent/intent';
import { Estate } from '../../state';

export const mainChoice = (conv: DFConv, loop: number) => {
  if (conv.intent === intentName[intentNamePlayAudiobookIndex]) {
    conv.session.state.state = Estate.play;
    return conv.mae.mae(++loop);
  }
}

} else if (state >= Estate.play && state <= Estate.play_end) {
      // return mae play
    } else if (state >= Estate.toc && state <= Estate.toc_end) {
      // return mae toc
    } else if (state >= Estate.info && state <= Estate.info_end) {
      // return mae info
    }