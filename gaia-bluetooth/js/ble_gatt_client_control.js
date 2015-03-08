'use strict';

var BleCattClientControl = (function() {
    var sInstance;
    var mBluetoothManager;
    var mSettingManager;
    var mBleGatt;

    function getInstance() {
        if (sInstance == undefined) {
            sInstance = new BleCattClientControl();
        }
        return sInstance;
    }

    function BleCattClientControl(){
        mBluetoothManager = navigator.mozBluetooth;
        mBleGatt = navigator.mozBle;
        mSettingManager = navigator.mozSettings;
//        var req = mBluetoothManager.getDefaultAdapter();
//        req.onsuccess = function bt_getAdapterSuccess() {
//            mBluetoothAdapter = req.result;
//            if (mBluetoothAdapter == null) {
//                console.warn('bluetooth adapter is null');
//            }
//        };
//        req.onerror = function bt_getAdapterFailed() {
//            console.log('Can not get bluetooth adapter!');
//        };

        this.getBluetooth = function() {
            return mBluetoothManager;
        };

        this.getBleGatt = function() {
            return mBleGatt
        };

        this.getSetting = function() {
            return mSettingManager;
        }

    }

    return {
        getInstance: getInstance
    }
})();