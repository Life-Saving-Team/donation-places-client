import { addUIWidgets } from './map-ui-widgets';

let view  = {
    ui: {
        add(tr, loc){
            
        }
    }
}

let track = (x) => {}
let search = (x) => {}
describe('Mao UI widgets helper', ()=>{
    it('should load Ui widgets', ()=>{
        const spy = spyOn(view.ui, 'add')
        addUIWidgets(view,track, search)
        expect(spy).toHaveBeenCalledTimes(2)
    })
})



