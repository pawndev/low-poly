export default class CanvasUtil {
    static copyImageData(ctx, src) {
        let dst = ctx.createImageData(src.width, src.height);
        dst.data.set(src.data);
        return dst;
    }
}