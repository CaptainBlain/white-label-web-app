export class Page {
    public shouldShow: boolean;
    public imageAssetUrl: string;
    public name: string;

    constructor(shouldShow: boolean,
                imageAssetUrl: string,
                name: string
    ) {
        this.shouldShow = shouldShow;
        this.imageAssetUrl = imageAssetUrl;
        this.name = name;
    }
}
