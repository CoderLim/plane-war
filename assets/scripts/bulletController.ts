import { _decorator, Component, Node, BoxCollider, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
import { enemyController } from './enemyController';
const { ccclass, property } = _decorator;

@ccclass('bulletController')
export class bulletController extends Component {
    @property
    speed: number = 800;

    start() {
        // const collider = this.getComponent(Collider2D);
        // collider.on(Contact2DType.BEGIN_CONTACT, this.onTriggerEnter, this)
    }

    update(deltaTime: number) {
        const {x, y} = this.node.position;
        // console.log(x, y);
        this.node.setPosition(x, y + this.speed * deltaTime);
        if (y > 820) {
            this.node.destroy();
        }
    }

    die() {
        setTimeout(() => {
            this.node.destroy();
        });
    }

    // onEnable() {
    // }

    // onDisable() {

    // }

    // onTriggerEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 表示敌人
    //     if (otherCollider.tag === 1) {
    //         otherCollider.getComponent(enemyController).die();
    //         this.node.destroy();
    //     }
    // }
}

