// SELECT ALL CHARTS
let valueBoxes = document.querySelectorAll('.widget-value-box');

let allValueBoxes = [...valueBoxes];

// REUSABLE RESIZE OBSERVER
var ro = new ResizeObserver(entries => {
    for (let entry of entries) {
        const crWidth = entry.borderBoxSize[0].inlineSize;
        const crHeight = entry.borderBoxSize[0].blockSize;
        const widgetHeader = entry.target.children[0];
        const widgetBody = entry.target.children[1];
        const valueBox = widgetBody.children[0];
        const valueBoxItem = valueBox.children[0];
        const valueBoxItemAmount = valueBoxItem.children[0];
        const valueBoxItemText = valueBoxItem.children[1];

        // let valueBoxYP = crWidth * .12;
        // let sizeWidget = Math.max(crWidth, crHeight);
        let scale = 0;
        let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

        console.log((parseInt(getComputedStyle(valueBoxItemAmount).fontSize)) * ((valueBoxItem.clientWidth / valueBoxItemAmount.clientWidth) / rem))



        if (crWidth <= crHeight) {
            scale = (crWidth) / 233;
        } else {
            scale = (crHeight - widgetHeader.clientHeight) / 188;
        }

        valueBox.style.fontSize = `${scale}em`;
        //valueBoxItemAmount.style.fontSize = `${((parseInt(getComputedStyle(valueBoxItemAmount).fontSize) / scale) * ((valueBoxItem.clientWidth / valueBoxItemAmount.clientWidth) / rem))}em`

        // valueBox.style.paddingTop = `${valueBoxYP}px`;
        // valueBox.style.paddingBottom = `${valueBoxYP}px`;

        // console.log('MAX', valueBox)
        // console.log('WIDTH', crWidth)
        // console.log('HEIGHT', crHeight)

        //Update sizes

        // if (valueBoxItemAmount.clientWidth >= valueBoxItem.clientWidth) {
        //     fitty(entry.target)
        // }
    }
});

allValueBoxes.forEach(e => {
    ro.observe(e);
});

