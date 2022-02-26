"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./utils/ModalContext.js":
/*!*******************************!*\
  !*** ./utils/ModalContext.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useModal\": function() { return /* binding */ useModal; },\n/* harmony export */   \"default\": function() { return /* binding */ ModalProvider; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$();\n// create context\nvar ModalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction useModal() {\n    _s();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ModalContext);\n}\n_s(useModal, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nfunction ModalProvider(props) {\n    _s1();\n    // setup state for modal type\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isShown = ref[0], setIsShown = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(), content = ref1[0], setContent = ref1[1];\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ModalContext.Provider, {\n        value: {\n            isShown: isShown,\n            setIsShown: setIsShown,\n            setContent: setContent\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Modal, {\n                isShown: true,\n                children: content\n            }, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n                lineNumber: 21,\n                columnNumber: 13\n            }, this),\n            props.children\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n        lineNumber: 19,\n        columnNumber: 9\n    }, this));\n};\n_s1(ModalProvider, \"9IfO44HR9qXRF500kuPt0X8Jwu0=\");\n_c = ModalProvider;\nfunction Modal(props) {\n    _s2();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), loaded = ref[0], setLoaded = ref[1];\n    //const [blur, setBlur] = useState(0)\n    /*\n    useEffect(() => {\n        if (props.isShown) {\n            setLoaded(true)\n        }\n    })\n    */ return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        className: \"flex items-center justify-center absolute w-screen h-screen backdrop-blur-none z-50 transition-all duration-500 \" + (props.isShown ? \"backdrop-blur-[4px] bg-gray-500/30\" : \"backdrop-blur-none bg-transparent invisible\"),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"bg-white p-4 rounded-2xl shadow-high \" + (!props.isShown && \"invisible\"),\n            children: props.children\n        }, void 0, false, {\n            fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n            lineNumber: 45,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n        lineNumber: 44,\n        columnNumber: 9\n    }, this));\n}\n_s2(Modal, \"Hdw5EO+DplCNBEJcNuH8tsP7WZ4=\");\n_c1 = Modal;\nvar _c, _c1;\n$RefreshReg$(_c, \"ModalProvider\");\n$RefreshReg$(_c1, \"Modal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9Nb2RhbENvbnRleHQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUE0RDtBQUM1QjtBQUNROztBQUV4QyxFQUFpQjtBQUNqQixHQUFLLENBQUNLLFlBQVksaUJBQUdMLG9EQUFhO0FBRTNCLFNBQVNNLFFBQVEsR0FBRyxDQUFDOztJQUN4QixNQUFNLENBQUNMLGlEQUFVLENBQUNJLFlBQVk7QUFDbEMsQ0FBQztHQUZlQyxRQUFRO0FBSVQsUUFBUSxDQUFDQyxhQUFhLENBQUNDLEtBQUssRUFBRSxDQUFDOztJQUUxQyxFQUE2QjtJQUM3QixHQUFLLENBQXlCTCxHQUFlLEdBQWZBLCtDQUFRLENBQUMsS0FBSyxHQUFyQ00sT0FBTyxHQUFnQk4sR0FBZSxLQUE3Qk8sVUFBVSxHQUFJUCxHQUFlO0lBQzdDLEdBQUssQ0FBeUJBLElBQVUsR0FBVkEsK0NBQVEsSUFBL0JRLE9BQU8sR0FBZ0JSLElBQVUsS0FBeEJTLFVBQVUsR0FBSVQsSUFBVTtJQUV4QyxNQUFNLDZFQUNERSxZQUFZLENBQUNRLFFBQVE7UUFBQ0MsS0FBSyxFQUFFLENBQUM7WUFBQ0wsT0FBTyxFQUFQQSxPQUFPO1lBQUVDLFVBQVUsRUFBVkEsVUFBVTtZQUFFRSxVQUFVLEVBQVZBLFVBQVU7UUFBQyxDQUFDOzt3RkFFNURHLEtBQUs7Z0JBQUNOLE9BQU8sRUFBRSxJQUFJOzBCQUNmRSxPQUFPOzs7Ozs7WUFHWEgsS0FBSyxDQUFDUSxRQUFROzs7Ozs7O0FBRzNCLENBQUM7SUFoQnVCVCxhQUFhO0tBQWJBLGFBQWE7U0FrQjVCUSxLQUFLLENBQUNQLEtBQUssRUFBRSxDQUFDOztJQUVuQixHQUFLLENBQXVCTCxHQUFlLEdBQWZBLCtDQUFRLENBQUMsS0FBSyxHQUFuQ2MsTUFBTSxHQUFlZCxHQUFlLEtBQTVCZSxTQUFTLEdBQUlmLEdBQWU7SUFDM0MsRUFBcUM7SUFFckMsRUFNRTs7Ozs7O0lBQUEsR0FFRixNQUFNLDZFQUNEZ0IsQ0FBTTtRQUFDQyxTQUFTLEVBQUUsQ0FBa0gscUhBQUlaLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLENBQW9DLHNDQUFHLENBQTZDOzhGQUN4T1ksQ0FBRztZQUFDRCxTQUFTLEVBQUUsQ0FBdUMsMkNBQUtaLEtBQUssQ0FBQ0MsT0FBTyxJQUFJLENBQVc7c0JBQ25GRCxLQUFLLENBQUNRLFFBQVE7Ozs7Ozs7Ozs7O0FBSS9CLENBQUM7SUFwQlFELEtBQUs7TUFBTEEsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi91dGlscy9Nb2RhbENvbnRleHQuanM/MTUwNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcblxuLy8gY3JlYXRlIGNvbnRleHRcbmNvbnN0IE1vZGFsQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlTW9kYWwoKSB7XG4gICAgcmV0dXJuIHVzZUNvbnRleHQoTW9kYWxDb250ZXh0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb2RhbFByb3ZpZGVyKHByb3BzKSB7XG5cbiAgICAvLyBzZXR1cCBzdGF0ZSBmb3IgbW9kYWwgdHlwZVxuICAgIGNvbnN0IFtpc1Nob3duLCBzZXRJc1Nob3duXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAgIGNvbnN0IFtjb250ZW50LCBzZXRDb250ZW50XSA9IHVzZVN0YXRlKClcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxNb2RhbENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgaXNTaG93biwgc2V0SXNTaG93biwgc2V0Q29udGVudCB9fT5cblxuICAgICAgICAgICAgPE1vZGFsIGlzU2hvd249e3RydWV9ID5cbiAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgIDwvTW9kYWw+XG5cbiAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9Nb2RhbENvbnRleHQuUHJvdmlkZXI+IFxuICAgIClcbn1cblxuZnVuY3Rpb24gTW9kYWwocHJvcHMpIHtcblxuICAgIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgICAvL2NvbnN0IFtibHVyLCBzZXRCbHVyXSA9IHVzZVN0YXRlKDApXG5cbiAgICAvKlxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChwcm9wcy5pc1Nob3duKSB7XG4gICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgKi9cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGFic29sdXRlIHctc2NyZWVuIGgtc2NyZWVuIGJhY2tkcm9wLWJsdXItbm9uZSB6LTUwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBcIiArIChwcm9wcy5pc1Nob3duID8gXCJiYWNrZHJvcC1ibHVyLVs0cHhdIGJnLWdyYXktNTAwLzMwXCIgOiBcImJhY2tkcm9wLWJsdXItbm9uZSBiZy10cmFuc3BhcmVudCBpbnZpc2libGVcIikgfSA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJiZy13aGl0ZSBwLTQgcm91bmRlZC0yeGwgc2hhZG93LWhpZ2ggXCIgKyAoIXByb3BzLmlzU2hvd24gJiYgXCJpbnZpc2libGVcIikgfSA+XG4gICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIClcbn0iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImNyZWF0ZVBvcnRhbCIsIk1vZGFsQ29udGV4dCIsInVzZU1vZGFsIiwiTW9kYWxQcm92aWRlciIsInByb3BzIiwiaXNTaG93biIsInNldElzU2hvd24iLCJjb250ZW50Iiwic2V0Q29udGVudCIsIlByb3ZpZGVyIiwidmFsdWUiLCJNb2RhbCIsImNoaWxkcmVuIiwibG9hZGVkIiwic2V0TG9hZGVkIiwiYnV0dG9uIiwiY2xhc3NOYW1lIiwiZGl2Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/ModalContext.js\n");

/***/ })

});