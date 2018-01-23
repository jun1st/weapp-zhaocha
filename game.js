import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'
import ActionCable from './js/libs/actionCable'

new Main()

const cable = new ActionCable
cable.connect('ws://zhaocha.leshibaike.com/cable')
