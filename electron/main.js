// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, clipboard, Menu, webContents } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1190, height: 800 })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // const child = new BrowserWindow({ titleBarStyle: 'hidden', parent: mainWindow, width: 300, height: 600 })
    // child.loadFile('child.html')

    // let child = new BrowserWindow({parent: mainWindow, modal: true, show: false, width: 300, height: 200 })
    // child.loadURL('https://github.com')
    // child.once('ready-to-show', () => {
    //     child.show()
    // })

    // child.webContents.openDevTools({ mode: 'bottom' })

    // devtools = new BrowserWindow({titleBarStyle: 'hidden', parent: mainWindow, width: 500, height: 200, x: 300, y: 400})
    // mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
    // mainWindow.webContents.openDevTools({mode: 'detach'})

    // mainWindow.webContents.debugger.attach('1.1');
    mainWindow.webContents.openDevTools({mode: 'undocked'});

    // setTimeout(() => {
    //     // console.dir(webContents.getAllWebContents(), {depth: 3});
    //     webContents.getAllWebContents().forEach((browser, index) => {
    //         console.log('browser = ', index, browser)
    //         if ('setDevToolsWebContents' in browser) {
    //             // if (browser.history[0] === 'https://m.dianping.com/') {
    //             //     mainWindow.webContents.setDevToolsWebContents(browser.webContents)
    //             //     mainWindow.webContents.openDevTools({mode: 'detach'})
    //             // }
    //             console.log('is browser -> ', index);
    //         }
    //     });
    //
    //
    //     let debugWb;
    //     let devToolWb;
    //     const browsers = webContents.getAllWebContents();
    //     browsers.forEach((browser, index) => {
    //         if (browser.history[0] === 'https://m.dianping.com/') {
    //             debugWb = browser;
    //             console.log('debugWb = ', index)
    //         } else if (browser.history[0].indexOf('/child.html') >= 0) {
    //             devToolWb = browser;
    //             console.log('devToolWb = ', index)
    //         }
    //     });
    //
    //     if (debugWb && devToolWb) {
    //         debugWb.webContents.setDevToolsWebContents(devToolWb.webContents);
    //         // debugWb.webContents.setDevToolsWebContents(mainWindow.webContents);
    //         // debugWb.webContents.openDevTools({ mode: 'detach' });
    //         debugWb.webContents.openDevTools();
    //     }
    //
    //     // mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
    //     // mainWindow.webContents.openDevTools({mode: 'detach'})
    //     // console.log(webContents.fromId('wb2'));
    // }, 5000);



    const template = [{
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            role: 'window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        },
        {
            role: 'help',
            submenu: [{
                label: 'Learn More',
                click() { require('electron').shell.openExternal('https://electronjs.org') }
            }]
        }
    ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        })

        // Edit menu
        template[1].submenu.push({ type: 'separator' }, {
            label: 'Speech',
            submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' }
            ]
        })

        // Window menu
        template[3].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' }
        ]
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.