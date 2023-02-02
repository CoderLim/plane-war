import { _decorator, Component, Node, resources, SpriteFrame, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyController')
export class enemyController extends Component {
    @property
    speed = 100

    start() {

    }

    update(deltaTime: number) {
        const worldPos = this.node.getWorldPosition();
        this.node.setWorldPosition(new Vec3(worldPos.x, worldPos.y - this.speed * deltaTime));
        // 离开屏幕销毁子弹
        if (this.node.getPosition().y < -800) {
            this.node.destroy();
        }
        
    }

    die() {
        resources.load('enemy0_die/spriteFrame', SpriteFrame, (error, data) => {
            console.log('error ->', error);
            this.node.getComponent(Sprite).spriteFrame = data;
            // 销毁需要放到下一帧，否则会报错
            // https://forum.cocos.org/t/topic/110183/4
            setTimeout(() => {
                this.node.destroy();
            }, 50);
        });

    }
}

