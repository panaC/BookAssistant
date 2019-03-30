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

import { Istate } from "./interface/state.interface";

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
  end,
}

// !! maybe add a previous state in session for keep save the path to finish in this state

export const state: Istate = {
  name: 'mae',
  state: Estate.start,
  range: {
    start: Estate.start,
    end: Estate.end,
  },
  fct: mae,
  children: [
    {
      name: "main",
      state: Estate.main,
      range: {
        start: Estate.main,
        end: Estate.main_end,
      },
      fct: mainChoice,
      children: [
        {
          name: "play",
          state: Estate.play,
          range: {
            start: Estate.play,
            end: Estate.play_end,
          },
          fct: play,
          children: [],
        },
      ]
    }
  ]
}