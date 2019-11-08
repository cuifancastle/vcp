/* eslint-disable */
// Array.prototype.insert = function (index, item) {
// 	this.splice(index, 0, item);
// }
import Vue from 'vue'
// 所有 组件
import {COMPS} from './COMPS'
class Comp {
	constructor (compId, sceneId, compConfig, dom) {
		this.compId = compId
		this.sceneId = sceneId // 场景id 位置信息 规则，嵌套下标0_1_0 代表 pageConfig.childrens[0].childrens[1].childrens[0]
		this.compConfig = compConfig
		this.childrens = []
		// this.ins = null // 渲染时添加Vue实例
		this.ins = new Vue({
			el: dom,
			render(h) {
				return h(COMPS[compId])
			}
		})
	}
}

export class Page {
	constructor (el, pageConfig) {
		// title metas description
		this.$el = el
		this.pageConfig = pageConfig || {
			childrens:[]
		}
		if (pageConfig) {
			// 进入编辑页面，读取服务端pageConfig, 调用渲染
			// this.render ()
		}
	}
	/**
		* 添加组件
		* compId 新组件id
		* sceneId 插入的位置，挨着哪个组件，为null 时append到根节点
		* position: beforebegin afterbegin beforeend afterend
		*/
	addComp (compId, sceneId, position = 'afterend') {
		if (!COMPS[compId]) {
			/* eslint-disable-next-line */
			console.error('compId 不存在')
			return
		}
		sceneId = sceneId || this.pageConfig.childrens.length + ''
		// let indexs = sceneId.split('_')
		let newIndex = sceneId.split('_')
		switch (position) {
			case "beforebegin": // 同级childrens 前放入 挨着旧组件
			{
				let parentNode = this.queryParent(sceneId)
				let originNode = this.query(sceneId)
				let i = newIndex[newIndex.length - 1]
				let div = document.createElement('div')
				originNode.$el.insertAdjacentElement('beforebegin', div)
				let ins = new Comp(compId, newIndex.join('_'),{},div)
				parentNode.childrens.splice(i, 0, ins);
				// 遍历所有 同级后面的节点&子节点 计算sceneId
				let deepLength = newIndex.length
				this._traverse(parentNode.childrens.slice(i + 1, parentNode.childrens.length), (item) => {
					let sceneIds = item.sceneId.split('_')
					sceneIds[deepLength - 1] ++
					item.sceneId = sceneIds.join('_')
				})
			}
				break
			case "afterbegin": // 子级 childrens 前放入
				// 遍历所有 子级后面的节点&子节点 计算sceneId
				break
			case "beforeend": // 子级 childrens 后放入
				// 无需遍历
				break
			case "afterend": // 同级 childrens 后放入 挨着旧组件
				// 遍历 同级 后所有节点&子节点 计算sceneId
				break
			default:
				/* eslint-disable-next-line */
				console.error('position 只能为beforebegin afterbegin beforeend afterend')
				return
		}
	}

	/**
		*
		* @param sceneId
		* @returns Comp
		*/
	query (sceneId) {
		let indexs = sceneId.split('_')
		let obj = this.pageConfig
		// if (indexs.length === 1) {
		// 	return obj.childrens[item]
		// }
		debugger
		for (let item of indexs) {
			obj = obj.childrens[item]
		}
		return obj
	}
	/**
		* 返回父级
		* @param sceneId
		* @returns Comp
		*/
	queryParent (sceneId) {
		let indexs = sceneId.split('_').pop()
		let obj = this.pageConfig
		debugger
		for (let item of indexs) {
			if (obj.childrens) {
				obj = obj.childrens[item]
			}
		}
		return obj
	}
	// 遍历所有节点，cb(comp)
	traverse (cb) {
		this._traverse(this.pageConfig.childrens, cb)
	}
	_traverse (arr, cb) {
		for (let item of arr) {
			cb(item)
			if (item.childrens.length) {
				this._traverse(item.childrens, cb)
			}
		}
	}
}


/**
	* 操作：添加comp, 修改compConfig, 移动comp, 删除comp, 遍历方法
	*/

