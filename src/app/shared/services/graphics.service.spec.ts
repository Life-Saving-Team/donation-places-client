import { async, getTestBed, TestBed } from '@angular/core/testing';
import { GraphicsService } from './graphics.service';

describe('Service: Graphics ', () => {
    let service: GraphicsService;
    let view
    let SimplemarkerSymbol
    let markerSymbolOptions
    let Graphic
    let Point
    let pointDimensions
    let data
    let mapPoint
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
               GraphicsService
                
            ]
        });
        const testbed = getTestBed();
        service = testbed.get(GraphicsService);
    });


    beforeAll(()=>{
        view = {
            graphics:{
                removeAll(){

                },
                addMany(param?){

                }
            },
            popup:{
                actions:[],
                content:"",
                open(obj){
                    
                }
            }
        }

        SimplemarkerSymbol = (obj)=>({
            symbol:1
        })

        markerSymbolOptions ={ obj:1}

        Graphic = (graphicOptions) => ({
            newGraphics:1
        })

        Point = (pointDimentions) =>({
            dimensions:1
        })

        pointDimensions = {}

        data = [
            {
                firstName: "Ashraf",
                lastName: "Ahmad",
                telephone: "+200000000000",
                location: {
                    coordinates: [30,31]
                },
                bloodGroup: "A",
                email: "fg@gmail.com"
            }
        ]

        mapPoint= {
            longitude:30,
            latitude: 30
        }
    })
 
    it('should set view graphics when given data points', () => {
       service.setGraphicsFromData(view, SimplemarkerSymbol, Point, Graphic, data)
        
    });

    it('should show popup given the view and map point with no address', () => {
        service.showAddingPopup(view, mapPoint)
        
    });

    it('should show popup given the view and map point plus address', () => {
        service.showAddingPopup(view, mapPoint, "45 Street A")
        
    });

 });