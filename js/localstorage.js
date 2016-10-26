/**
 * Класс для работы с localStorage
 * Использует JSON для хранения множественных значений
 */
var LocalStorage = (function () {
    /**
     *
     * @constructor
     */
    function LocalStorage() {
    }

    /**
     * Метод устанавливает значение в localStorage по индексу
     * @param index
     * @param value
     * @returns {boolean}
     */
    LocalStorage.set = function (index, value) {
        localStorage.setItem(index, value);
        return true;
    };
    /**
     * Метод достает значение в localStorage по индексу
     * @param index
     */
    LocalStorage.get = function (index) {
        return localStorage.getItem(index);
    };
    /**
     * Метод удаляет значение в localStorage по индексу
     * @param index
     * @returns {boolean}
     */
    LocalStorage.unset = function (index) {
        localStorage.removeItem(index);
        return true;
    };
    /**
     * Метод устанавливает значение в json объекте в localStorage по индексам
     * @param indexOfJson
     * @param indexInJson
     * @param value
     * @returns {boolean}
     */
    LocalStorage.addToJson = function (indexOfJson, indexInJson, value) {
        var jsonRow = this.get(indexOfJson);
        if (!jsonRow) {
            jsonRow = "{}";
        }
        try {
            var parsedJson = JSON.parse(jsonRow);
            parsedJson[indexInJson] = value;
            var stringifiedJson = JSON.stringify(parsedJson);
            this.set(indexOfJson, stringifiedJson);
            return true;
        } catch (e) {
            console.log('Поле с индексом ' + indexOfJson + 'не является корректным json');
            return false;
        }
    };
    /**
     * Метод достаёт значение в json объекте в localStorage по индексам
     * @param indexOfJson
     * @param indexInJson
     * @returns {boolean}
     */
    LocalStorage.getFromJson = function (indexOfJson, indexInJson) {
        var jsonRow = this.get(indexOfJson);
        try {
            var parsedJson = JSON.parse(jsonRow);
            if (parsedJson[indexInJson]) {
                return parsedJson[indexInJson];
            } else {
                console.log('Поля с индексом ' + indexInJson + 'не существует в данном json');
                return false;
            }
        } catch (e) {
            console.log('Поле с индексом ' + indexOfJson + 'не является корректным json');
            return false;
        }
    };
    /**
     * Метод удаляет значение в json объекте в localStorage по индексам
     * @param indexOfJson
     * @param indexInJson
     * @returns {boolean}
     */
    LocalStorage.removeFromJsonByKey = function (indexOfJson, indexInJson) {
        var jsonRow = this.get(indexOfJson);
        try {
            var parsedJson = JSON.parse(jsonRow);
            if (parsedJson[indexInJson]) {
                delete parsedJson[indexInJson];
                var stringifiedJson = JSON.stringify(parsedJson);
                this.set(indexOfJson, stringifiedJson);
                return true;
            } else {
                console.log('Поля с индексом ' + indexInJson + 'не существует в данном json');
                return false;
            }
        } catch (e) {
            console.log('Поле с индексом ' + indexOfJson + 'не является корректным json');
            return false;
        }
    };
    /**
     * Метод удаляет значение в json объекте в localStorage по индексам
     * @param indexOfJson
     * @param value
     * @returns {boolean}
     */
    LocalStorage.removeFromJson = function (indexOfJson, value) {
        var jsonRow = this.get(indexOfJson);
        try {
            var parsedJson = JSON.parse(jsonRow);
            for (var index in parsedJson) {
                var jsonValue = parsedJson[index];
                if (jsonValue == value) {
                    delete parsedJson[index];
                    var stringifiedJson = JSON.stringify(parsedJson);
                    this.set(indexOfJson, stringifiedJson);
                    return true;
                }
            }
            console.log('Поля с индексом ' + indexInJson + 'не существует в данном json');
            return false;

        } catch (e) {
            console.log('Поле с индексом ' + indexOfJson + 'не является корректным json');
            return false;
        }
    };
    /**
     *
     * @param indexOfJson
     * @returns {boolean}
     */
    LocalStorage.getJson = function (indexOfJson) {
        var jsonRow = this.get(indexOfJson);
        try {
            return JSON.parse(jsonRow);
        } catch (e) {
            console.log('Поле с индексом ' + indexOfJson + 'не является корректным json');
            return false;
        }
    };
    /**
     * Чистка localStorage
     */
    LocalStorage.clear = function () {
        localStorage.clear();
    };
    return LocalStorage;
})();
/**
 * Created by User on 26.10.2016.
 */
