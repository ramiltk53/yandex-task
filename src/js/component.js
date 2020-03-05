class Component {
    constructor() {
        if (new.target === Component) {
            throw new Error(`Can't instantiate Component`);
        }
    }
}

export default Component;
