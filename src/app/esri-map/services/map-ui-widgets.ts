
export function addUIWidgets(view, Track, Search) {
    const track = new Track({ view: view });
    const searchWidget = new Search({ view: view });
    view.ui.add(track, 'top-left');
    view.ui.add(searchWidget, {
        position: 'top-left',
        index: 2
    });
}
