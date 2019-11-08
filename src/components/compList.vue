<template>
    <div class="comp-list" @dragstart="handle_start">
        <div class="comp-item" draggable="true" data-index="0">
            <i></i>
            <div>文本</div>
        </div>
        <div class="comp-item" draggable="true" data-index="1">
            <i></i>
            <div>布局</div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
	export default {
		mounted() {
			// let dragSrc = document.querySelector('.comp-item')
			// dragSrc.ondragstart = handle_start
			// dragSrc.ondrag = handle_drag
			// dragSrc.ondragend = handle_end
            //
			// function handle_start(e) {
            //     let dataTransfer = e.dataTransfer;
            //     dataTransfer.setData('TEXT', '11112222222222')
			// 	console.log('dragstart-在元素开始被拖动时候触发')
			// }
            //
			// function handle_drag() {
			// 	// console.log('drag-在元素被拖动时候反复触发')
			// }
            //
			// function handle_end(e) {
			// 	console.log('dragend-在拖动操作完成时触发')
			// }
		},
        methods: {
	        handle_start(e) {
	        	console.log(e.target)
	        	console.log(e.target.dataset.index)
	        	console.log(e.target.dataset)
                let dataTransfer = e.dataTransfer;
                dataTransfer.setData('index', e.target.dataset.index)
            	console.log('dragstart-在元素开始被拖动时候触发')
            }
        }
	}
</script>
<style lang="scss">
    .comp-list {
        display: flex;
        width: 300px;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .comp-item {
        flex: 1;
        width: 150px;
        border: none;
        height: 150px;
    }
</style>
