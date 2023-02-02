/**
 * 
 *  参考 3.5：https://gitee.com/marksirl/cocos-plane-war/blob/master/assets/Scripts/game/PlayerCtrl.ts 
 * 
 */

import { _decorator, Component, Node, Vec3, Camera, Prefab, CCObject, instantiate, director, Input, System, UITransform, EventTouch, SystemEvent, systemEvent, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
import { bulletController } from './bulletController';
import { enemyController } from './enemyController';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {
    @property(Prefab)
    bulletPre: Prefab = null;

    @property(Prefab)
    enemyPre: Prefab = null;

    start() {
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        // systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove);

        this.schedule(() => {
            let bullet = instantiate(this.bulletPre);
            bullet.setParent(this.node.getParent());
            bullet.setPosition(this.node.position);
        }, 0.5);

        this.schedule(() => {
            const randomX = Math.random() * 200;

            let enemy = instantiate(this.enemyPre);
            enemy.setParent(this.node.getParent());
            // enemy.setPosition(randomX, 800);
            enemy.setWorldPosition(new Vec3(randomX, 800));
        }, 1);

        // 注册全局碰撞回调函数
        PhysicsSystem2D.instance?.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContact,
            this
        );
    }

    onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ) {
        console.debug('begin - contact');
        if (selfCollider.tag === 1) {
            selfCollider.getComponent(enemyController).die();
            otherCollider.getComponent(bulletController).die();
        }
        if (otherCollider.tag === 1) {
            selfCollider.getComponent(bulletController).die();
            otherCollider.getComponent(enemyController).die();
        }
    }

    onTouchMove(event: EventTouch) {
        // const delta = event.getDelta();
        // const pos = this.node.position;
        // this.node.setPosition(pos.x + delta.x, pos.y + delta.y);

        // const touches = event.getTouches();
        // const transform = this.node.parent.getComponent(UITransform);
        // const newPos = transform.convertToNodeSpaceAR(touches[0].getLocation());
        // console.debug(location);
        // this.node.setPosition(newPos);

        // const location = event.getLocation();
        // const transform = this.node.parent.getComponent(UITransform);
        // const newPos = transform.convertToNodeSpaceAR(new Vec3(location.x, location.y));
        // console.debug(newPos);
        // this.node.setPosition(newPos);

        this.node.setWorldPosition(
            new Vec3(event.getUILocation().x, event.getUILocation().y)
        );
    }

    update(deltaTime: number) {

        
    }
}

