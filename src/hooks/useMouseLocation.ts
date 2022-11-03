import { reactive, onMounted, onUnmounted } from 'vue';
type Location = {
    mouseLocation: { x: number; y: number };
};
export default function useMouselocation(): Location {
    const mouseLocation = reactive({ x: 0, y: 0 });
    // 鼠标移动
    const mouseMove = (event: MouseEvent) => {
        const { pageX, pageY } = event;
        mouseLocation.x = pageX;
        mouseLocation.y = pageY;
    };
    onMounted(() => {
        console.log('1', new Date());
        document.addEventListener('mousemove', mouseMove);
    });
    onUnmounted(() => {
        document.removeEventListener('mousemove', mouseMove);
    });
    return {
        mouseLocation,
    };
}
