/*
 * File: state.ts
 * Project: VoiceAssistant
 * File Created: Thursday, 28th March 2019 5:38:03 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Thursday, 28th March 2019 5:38:06 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

export enum Estate {
  start,
  welcome,
  session,
  yes_no,
  selection,
  main = 9,
  play = 10,
  play_end = 29,
  toc = 30,
  toc_end = 49,
  info = 50,
  info_end = 69,
  main_end = 100,
  fallback,
  no_input,
  goodbye,
}

export const state = {
  name: 'mae',
  state: Estate.start,
  range: {},
  children: [
    {
      name: "main",
      state: Estate.main,
      range: {
        begin: Estate.main,
        end: Estate.main_end,
      },
      fct: mainChoice,
      children: [
        {
          name: "play",
          state: Estate.play,
          range: {
            begin: Estate.play,
            end: Estate.play_end,
          },
          fct: play,
        }
      ]
    }
  ]
}