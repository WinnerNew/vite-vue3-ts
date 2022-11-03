import { ref, Ref, onMounted, onUnmounted, watch, reactive } from 'vue';
import useMouseLocation from '@/hooks/useMouseLocation';
type EleLoacation = {
    eleX: Ref<number>;
    eleY: Ref<number>;
};
// elIds 需要控制的
export default function useMouselocation(elIds: Array<string>): EleLoacation {
    const { mouseLocation } = useMouseLocation();
    const pageData = {
        eleWidth: 0,
        eleHeight: 0,
        pageWidth: 0,
        pageHigth: 0,
    };
    const eleX = ref(-1);
    const eleY = ref(-1);
    // 点击元素时鼠标的位置
    const previous = reactive({ x: -1, y: -1 });
    // 点击时元素位置
    const preEle = reactive({ x: -1, y: -1 });
    // 点击元素的data-id
    let eleID: string | null;
    // 点击元素dom
    let ele: HTMLElement | object;
    // 鼠标按下
    const mouseDown = (event: MouseEvent) => {
        const { target, pageX, pageY } = event;
        const currentId =
            (target as HTMLElement).getAttribute('data-id') || null;
        if (
            elIds.length == 0 ||
            !currentId ||
            !elIds.includes(currentId as string)
        )
            return;
        (target as HTMLElement).style.cursor = 'move';
        ele = target as HTMLElement;
        eleID = currentId;
        pageData.eleWidth = (ele as HTMLElement).offsetWidth;
        pageData.eleHeight = (ele as HTMLElement).offsetHeight;
        pageData.pageWidth =
            document.documentElement.clientWidth || document.body.clientWidth;
        pageData.pageHigth =
            document.documentElement.clientHeight || document.body.clientHeight;
        preEle.x = (ele as HTMLElement).offsetLeft;
        preEle.y = (ele as HTMLElement).offsetTop;
        previous.x = pageX;
        previous.y = pageY;
        event.preventDefault();
    };
    // 鼠标松开
    const mouseUp = (event: MouseEvent) => {
        if (!eleID) return;
        (ele as HTMLElement).style.border = '0';
        (ele as HTMLElement).style.cursor = 'default';
        ele = {};
        eleID = null;
        event.preventDefault();
    };
    //设置元素新的位置 x y 为需要位移的位置
    const setEle = (x: number, y: number) => {
        let locationX = preEle.x + (x - previous.x);
        let locationY = preEle.y + (y - previous.y);
        if (locationX > pageData.pageWidth - pageData.eleWidth) {
            locationX = pageData.pageWidth - pageData.eleWidth;
        } else {
            locationX = locationX > 0 ? locationX : 0;
        }
        if (locationY > pageData.pageHigth - pageData.eleHeight) {
            locationY = pageData.pageHigth - pageData.eleHeight;
        } else {
            locationY = locationY > 0 ? locationY : 0;
        }
        eleX.value = locationX;
        eleY.value = locationY;
        // 消除margin带来的副作用
        (ele as HTMLElement).style.margin = '0';
        (ele as HTMLElement).style.border = '1px solid #eee';
        (ele as HTMLElement).style.position = 'fixed';
        (ele as HTMLElement).style.left = locationX + 'px';
        (ele as HTMLElement).style.top = locationY + 'px';
    };
    onMounted(() => {
        console.log('2', new Date());
        document.addEventListener('mousedown', mouseDown);
        document.addEventListener('mouseup', mouseUp);
        watch(mouseLocation, (newVal, oldVal) => {
            if (!ele || !eleID) return;
            setEle(newVal.x, newVal.y);
        });
    });
    onUnmounted(() => {
        document.removeEventListener('mouseup', mouseUp);
        document.removeEventListener('mousedown', mouseDown);
    });
    return {
        eleX,
        eleY,
    };
}
