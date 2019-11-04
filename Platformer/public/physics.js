class PhysicsManager {
    // create an array showing on which side the collisions happened and collided with which rect
    // also calibrate the position to avoid overlap of colliders
    getDirectionAndCalibPos(obj, map) {
        let collision_dir = { left: null, top: null, right: null, bottom: null }
        let buffer = 5;
        let collisions = obj.isCollided(map, 1);
        if (collisions.length > 0) {
            for (let rect of collisions) {
                if (rect.y + rect.height - buffer < obj.y && rect.y + rect.height + buffer > obj.y) // bottom
                {
                    collision_dir.top = rect;
                    obj.y = rect.y + rect.height;
                }
                if (rect.y - buffer < obj.y + obj.height && rect.y + buffer > obj.y + obj.height) // top
                {
                    collision_dir.bottom = rect;
                    // obj.y = rect.y - obj.height + 1
                }
                if (rect.x + rect.width - buffer < obj.x && rect.x + rect.width + buffer > obj.x & !collision_dir.bottom) // left
                {
                    collision_dir.left = rect;
                    obj.x = rect.x + rect.width + 1
                }
                if (rect.x - buffer < obj.x + obj.width && rect.x + buffer > obj.x + obj.width & !collision_dir.bottom) // right
                {
                    collision_dir.right = rect;
                    obj.x = rect.x - obj.width - 1
                }
            }
        }
        return collision_dir;
    }

    // act of gravity, velocity and such
    apply(obj, map) {
        // check if in next frame obj will collide with map or not
        let collision_dir = this.getDirectionAndCalibPos(obj, map);

        if ((collision_dir.left || collision_dir.right) && obj.isOnAir) {
            // obj.isWallMounted = {
            //     dir: collision_dir.left ? "LEFT" : "RIGHT"
            // };
        }
        // if on wall then v = 0
        if (obj.isWallMounted != null) {
            obj.vy = 0;
        } else
            // if not collided on bottom -> on air -> apply gravity and movement
            if (!collision_dir.bottom) {
                if (obj.vy < FALL_SPEED_CAP) {
                    obj.vy += GRAVITY
                    if (obj.vy > 0) { // increase gravity when falling
                        obj.vy += GRAVITY * 0.5
                    }
                }
                obj.y += obj.vy;
            } else { // if collided on bottom - aka landed, clear velocity
                obj.isOnAir = false;
                obj.vy = 0;
                obj.vx = obj.vx > 0 ? obj.vx * 0.95 : obj.vx * 0.95;
            }


        if (collision_dir.top) { // hit on top, start falling
            obj.vy = 0;
        }

        // move left and right if posible
        if (!collision_dir.left && obj.vx < 0 && !obj.isWallMounted) {
            obj.x += obj.vx;
            //obj.isWallMounted = null;
        } else if (!collision_dir.right && obj.vx > 0 && !obj.isWallMounted) {
            obj.x += obj.vx;
            //obj.isWallMounted = null;
        }
        else {
            obj.vx = 0;
        }


    }
}