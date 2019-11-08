/* eslint-disable */
export const COMPS = {
	'0': {
		_compId: '0',
		compConfig: {
		},
		render(h) {
			return h('div', 'compId: 0')
		}
	},
	'1': {
		// template: '<div>动态节点</div>'
		props: ['sceneIndex'],
		render(h) {
			return h('div', {
				attrs: {
					draggable: true,
					'data-scene-index': this.sceneIndex
				},
				domProps: {
					innerHTML: '文本节点' + this.sceneIndex
				}
			})
		},
		data() {
			return {
				a: 0
			}
		},
		mounted() {
			// setInterval(() => {
			// 	this.a++
			// }, 1000)
			console.log('this.sceneIndex', this.sceneIndex)
		}
	}
}
