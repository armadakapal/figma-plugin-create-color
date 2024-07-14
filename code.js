"use strict";
figma.showUI(__html__);
figma.ui.resize(280, 292);
figma.ui.onmessage = (msg) => {
    if (msg.type === 'createStyles') {
        const selectedFrame = figma.currentPage.selection[0];
        if (!selectedFrame) {
            figma.notify('Select a frame');
            figma.closePlugin();
            return;
        }
        const components = selectedFrame.findAll();
        if (components.length === 0) {
            figma.notify('Select the object');
            figma.closePlugin();
            return;
        }
        let styleNumber = msg.startNumber;
        let minusNumber = msg.minNumber;
        for (const component of components) {
            const style = figma.createPaintStyle();
            style.name = `${msg.groupName} / ${styleNumber}`;
            if ('fills' in component && Array.isArray(component.fills) && component.fills.length > 0) {
                const fill = component.fills[0];
                style.paints = [
                    {
                        type: 'SOLID',
                        color: fill.color,
                        opacity: fill.opacity,
                    },
                ];
            }
            styleNumber -= minusNumber;
        }
        figma.closePlugin();
    }
};
