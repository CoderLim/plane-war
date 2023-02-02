import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bgController')
export class bgController extends Component {
    start() {

    }

    update(deltaTime: number) {
        for(let bgNode of this.node.children) {
            const position = bgNode.position;
            if (position.y < -850) {
                bgNode.setPosition(position.x, 852);
            } else {
                bgNode.setPosition(position.x, position.y - 50 * deltaTime);
            }
        } 
    }
}

