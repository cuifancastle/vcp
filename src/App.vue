<template>
    <div id="app">
        <comp-list></comp-list>
        <div class="scene" @dragstart="handle_start">
        </div>
        <div class="config"></div>
    </div>
</template>
<script>
	/* eslint-disable */
	import compList from './components/compList'
	import Vue from 'vue'
    import {Page} from './core/core'

	window.Vue = Vue
    Vue.component('seText', {
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
	})

	export default {
		name: 'app',
		components: {
			compList
		},
		mounted() {
			let scene = document.querySelector('.scene')
            window.page = new Page(scene)
			window.scene = scene
            page.addComp(1,null, 'beforebegin')
            return


			scene.childlist = []
			scene.ondragenter = function (e) {
				e.preventDefault();
				console.log('scene  ondragenteree')
			}
			scene.ondragover = function (e) {
				e.preventDefault();
				// console.log('scene  ondragover')
			}
			let that = this
			scene.ondrop = function (e) {
				e.preventDefault();
				console.log(e)
				console.log(e.target)
				let dt = e.dataTransfer
				let isSceneNode = dt.getData('isSceneNode')
				let index = dt.getData('index') // compId
				let sceneIndex = dt.getData('sceneIndex')
				if (isSceneNode) {
					console.log(scene.childlist[0].$el)
					console.log(scene.childlist[sceneIndex].$el)
					for (let item of scene.childlist) {
						// 是否落点在当前元素区域的可视区域，是的话，插入到当前元素前，其他后移
						let offsetLeft = item.$el.offsetLeft - scene.offsetLeft
						let offsetTop = item.$el.offsetTop - scene.offsetTop
						let offsetRight = item.$el.offsetWidth
						let offsetBottom = item.$el.offsetHeight
						if (e.offsetX >= offsetLeft && e.offsetX <= offsetRight &&
							e.offsetY >= offsetTop && e.offsetY <= offsetBottom
						) {
							// 放后面
							if (e.offsetY >= offsetTop + (offsetBottom - offsetTop) / 2) {
								//放前面
								console.log('插入到当前位置前', item)
								item.$el.insertAdjacentElement('afterend', scene.childlist[sceneIndex].$el)
							} else {
								//放前面
								console.log('插入到当前位置前', item)
								item.$el.insertAdjacentElement('beforebegin', scene.childlist[sceneIndex].$el)
								// let i = scene.childlist.indexOf(item)
								// scene.childlist = []
								// if (i < sceneIndex) {
								// 	scene.childlist = [scene.childlist.splice(0, i), scene.childlist[sceneIndex], scene.childlist.splice(i+1,sceneIndex), scene.childlist.splice(sceneIndex + 1, scene.childlist.length - )]
								// }
								// that.moveItem(scene.childlist, i, sceneIndex)
							}
                            break

						}
					}

					// e.target.
					return
				}
				let div = document.createElement('div')
				scene.appendChild(div)
				console.log(Vue.component('seText'))
				let se = new Vue({
					el: div,
					render(h) {
						return h(Vue.component('seText'), {
							props: {
								sceneIndex: scene.childlist.length,
							}
						})
					}
				})
				// se.$mount(div)
				scene.childlist.push(se)
			}
		},
		methods: {
			handle_start(e) {
				console.log(e.target)
				console.log(e.target.dataset.index)
				console.log(e.target.dataset)
				let dataTransfer = e.dataTransfer;
				dataTransfer.setData('isSceneNode', 'true')
				dataTransfer.setData('sceneIndex', e.target.dataset.sceneIndex)
				console.log('dragstart-在元素开始被拖动时候触发')
			},
			/**
				*
				* @param arr
				* @param i
				* @param j
				* j 移动到 i 之前，其他后移
				*/
			moveItem(arr, i, j) {
				i = Number(i)
				j = Number(j)
				if (i < j) {
					// 插入到第一个节点前， 删除[j]
					// if (i === 0) {
					//     arr.unshift([arr[j]])
					//     return [arr.splice(0, j), arr.splice(j + 1)] // 数组越界没关系
					// } 0 2
					debugger
					arr = [...arr.splice(0, i), arr[j], ...arr.splice(i, j), ...arr.splice(j + 1)]
					console.log(arr)
				} else if (i > j) {
					debugger
					arr = [...arr.splice(0, j), ...arr.splice(j + 1, i - 1), arr[j], ...arr.splice(i)]
				} else {
					console.log('i === j', i)
				}
			}
		}
	}
</script>
<style lang="scss">
    #app {
        display: flex;
    }

    .scene {
        flex: 1;
        background: blue;

        height: 1000px;
    }

    .config {
        background: yellow;
        width: 300px;
        height: 1000px;
    }
</style>
