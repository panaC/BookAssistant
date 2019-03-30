/*
 * File: state.ts
 * Project: VoiceAssistant
 * File Created: Saturday, 30th March 2019 2:53:52 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Saturday, 30th March 2019 2:53:55 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Istate } from './../interface/state.interface';

export const state: Istate = {
  start: {
    context: 'start',
    switch: {
      default: 'start.choice',
    },
    conv: {
      ask: 'veux-tu ton age ou ton nom ?'
    },
    return: true,
    children: {
      choice: {
        fct: 'intent',
        switch: {
          'start.name': 'start.name',
          'start.age': 'start.age',
          default: 'fallback',
        }
      },
      name: {
        switch: {
          default: 'start',
        },
        conv: {
          ask: 'ton nom est pierre',
        }
      },
      age: {
        switch: {
          default: 'start',
        },
        conv: {
          ask: 'ton age est 24 ans',
        }
      }
    }
  },
  fallback: {
    return: true,
    switch: {
      default: '',
    },
    conv: {
      close: 'pas compris'
    }
  },
  no_input: {
    return: true,
    switch: {
      default: ''
    }
  },
  error: {
    return: true,
    switch: {
      default: ''
    },
    conv: {
      close: 'Oups, erreur logiciel',
    }
  }
}