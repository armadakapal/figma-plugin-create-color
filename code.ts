figma.showUI(__html__);
figma.ui.resize(280, 292);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'createStyles') {
    const selectedFrame = figma.currentPage.selection[0] as FrameNode;

    if (!selectedFrame) {
      figma.notify('Pilihen salah siji frame asu raimu');
      figma.closePlugin();
      return;
    }

    const components = selectedFrame.findAll();

    if (components.length === 0) {
      figma.notify('Isien kotak ta opo ngunu seng ono wernoe asu 🖕');
      figma.closePlugin();
      return;
    }

    let styleNumber = msg.startNumber;
    let minusNumber = msg.minNumber;

    for (const component of components) {
      const style = figma.createPaintStyle();
      style.name = `${msg.groupName} / ${styleNumber}`;

      if ('fills' in component && Array.isArray(component.fills) && component.fills.length > 0) {
        const fill = component.fills[0] as SolidPaint;
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