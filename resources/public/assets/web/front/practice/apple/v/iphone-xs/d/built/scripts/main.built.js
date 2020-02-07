! function() {
    function e(t, i, r) {
        function n(s, a) {
            if (!i[s]) {
                if (!t[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(s, !0);
                    if (o) return o(s, !0);
                    var c = new Error("Cannot find module '" + s + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = i[s] = {
                    exports: {}
                };
                t[s][0].call(u.exports, function(e) {
                    var i = t[s][1][e];
                    return n(i ? i : e)
                }, u, u.exports, e, t, i, r)
            }
            return i[s].exports
        }
        for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) n(r[s]);
        return n
    }
    return e
}()({
    1: [function(e, t, i) {
        "use strict";
        var r = e("./helpers/TabManager"),
            n = e("./helpers/hideSiblingElements"),
            o = e("./helpers/showSiblingElements"),
            s = function(e, t) {
                t = t || {}, this._tabbables = null, this._excludeHidden = t.excludeHidden, this._firstTabbableElement = t.firstFocusElement, this._lastTabbableElement = null, this._relatedTarget = null, this.el = e, this._handleOnFocus = this._handleOnFocus.bind(this)
            },
            a = s.prototype;
        a.start = function() {
            this.updateTabbables(), n(this.el, null, this._excludeHidden), this._firstTabbableElement ? this.el.contains(document.activeElement) || this._firstTabbableElement.focus() : console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element."), this._relatedTarget = document.activeElement, document.addEventListener("focus", this._handleOnFocus, !0)
        }, a.stop = function() {
            o(this.el), document.removeEventListener("focus", this._handleOnFocus, !0)
        }, a.updateTabbables = function() {
            this._tabbables = r.getTabbableElements(this.el, this._excludeHidden), this._firstTabbableElement = this._firstTabbableElement || this._tabbables[0], this._lastTabbableElement = this._tabbables[this._tabbables.length - 1]
        }, a._handleOnFocus = function(e) {
            if (this.el.contains(e.target)) this._relatedTarget = e.target;
            else {
                if (e.preventDefault(), this.updateTabbables(), this._relatedTarget === this._lastTabbableElement || null === this._relatedTarget) return this._firstTabbableElement.focus(), void(this._relatedTarget = this._firstTabbableElement);
                if (this._relatedTarget === this._firstTabbableElement) return this._lastTabbableElement.focus(), void(this._relatedTarget = this._lastTabbableElement)
            }
        }, a.destroy = function() {
            this.stop(), this.el = null, this._tabbables = null, this._firstTabbableElement = null, this._lastTabbableElement = null, this._relatedTarget = null, this._handleOnFocus = null
        }, t.exports = s
    }, {
        "./helpers/TabManager": 2,
        "./helpers/hideSiblingElements": 4,
        "./helpers/showSiblingElements": 8
    }],
    2: [function(e, t, i) {
        "use strict";
        var r = e("./../maps/focusableElement"),
            n = function() {
                this.focusableSelectors = r.join(",")
            },
            o = n.prototype;
        o.isFocusableElement = function(e, t, i) {
            if (t && !this._isDisplayed(e)) return !1;
            var n = e.nodeName.toLowerCase(),
                o = r.indexOf(n) > -1;
            return "a" === n || (o ? !e.disabled : !e.contentEditable || (i = i || parseFloat(e.getAttribute("tabindex")), !isNaN(i)))
        }, o.isTabbableElement = function(e, t) {
            if (t && !this._isDisplayed(e)) return !1;
            var i = e.getAttribute("tabindex");
            return i = parseFloat(i), isNaN(i) ? this.isFocusableElement(e, t, i) : i >= 0
        }, o._isDisplayed = function(e) {
            var t = e.getBoundingClientRect();
            return (0 !== t.top || 0 !== t.left || 0 !== t.width || 0 !== t.height) && "hidden" !== window.getComputedStyle(e).visibility
        }, o.getTabbableElements = function(e, t) {
            for (var i = e.querySelectorAll(this.focusableSelectors), r = i.length, n = [], o = 0; o < r; o++) this.isTabbableElement(i[o], t) && n.push(i[o]);
            return n
        }, o.getFocusableElements = function(e, t) {
            for (var i = e.querySelectorAll(this.focusableSelectors), r = i.length, n = [], o = 0; o < r; o++) this.isFocusableElement(i[o], t) && n.push(i[o]);
            return n
        }, t.exports = new n
    }, {
        "./../maps/focusableElement": 10
    }],
    3: [function(e, t, i) {
        "use strict";
        var r = e("./setAttributes"),
            n = e("./../maps/ariaMap"),
            o = e("./TabManager"),
            s = "data-original-",
            a = "tabindex",
            l = function(e, t) {
                var i = e.getAttribute(s + t);
                i || (i = e.getAttribute(t) || "", r(e, s + t, i))
            };
        t.exports = function(e, t) {
            if (o.isFocusableElement(e, t)) l(e, a), r(e, a, -1);
            else
                for (var i = o.getTabbableElements(e, t), s = i.length; s--;) l(i[s], a), r(i[s], a, -1);
            l(e, n.HIDDEN), r(e, n.HIDDEN, !0)
        }
    }, {
        "./../maps/ariaMap": 9,
        "./TabManager": 2,
        "./setAttributes": 6
    }],
    4: [function(e, t, i) {
        "use strict";
        var r = e("./hide");
        t.exports = function n(e, t, i) {
            t = t || document.body;
            for (var o = e, s = e; o = o.previousElementSibling;) r(o, i);
            for (; s = s.nextElementSibling;) r(s, i);
            e.parentElement && e.parentElement !== t && n(e.parentElement)
        }
    }, {
        "./hide": 3
    }],
    5: [function(e, t, i) {
        "use strict";
        var r = function(e, t) {
                if ("string" == typeof t)
                    for (var i = t.split(/\s+/), r = 0; r < i.length; r++) e.getAttribute(i[r]) && e.removeAttribute(i[r])
            },
            n = function(e, t) {
                if (e.length)
                    for (var i = 0; i < e.length; i++) r(e[i], t);
                else r(e, t)
            };
        t.exports = n
    }, {}],
    6: [function(e, t, i) {
        "use strict";
        var r = function(e, t, i) {
                e && 1 === e.nodeType && e.setAttribute(t, i)
            },
            n = function(e, t, i) {
                if ("string" != typeof i && (i = i.toString()), e)
                    if (e.length)
                        for (var n = 0; n < e.length; n++) r(e[n], t, i);
                    else r(e, t, i)
            };
        t.exports = n
    }, {}],
    7: [function(e, t, i) {
        "use strict";
        var r = e("./removeAttributes"),
            n = e("./setAttributes"),
            o = e("./../maps/ariaMap"),
            s = "data-original-",
            a = "tabindex",
            l = function(e, t) {
                var i = e.getAttribute(s + t);
                "string" == typeof i && (i.length ? n(e, t, i) : r(e, t), r(e, s + t))
            };
        t.exports = function(e) {
            r(e, a + " " + o.HIDDEN), l(e, a), l(e, o.HIDDEN);
            for (var t = e.querySelectorAll("[" + s + a + "]"), i = t.length; i--;) l(t[i], a)
        }
    }, {
        "./../maps/ariaMap": 9,
        "./removeAttributes": 5,
        "./setAttributes": 6
    }],
    8: [function(e, t, i) {
        "use strict";
        var r = e("./show");
        t.exports = function n(e, t) {
            t = t || document.body;
            for (var i = e, o = e; i = i.previousElementSibling;) r(i);
            for (; o = o.nextElementSibling;) r(o);
            e.parentElement && e.parentElement !== t && n(e.parentElement)
        }
    }, {
        "./show": 7
    }],
    9: [function(e, t, i) {
        "use strict";
        t.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }, {}],
    10: [function(e, t, i) {
        "use strict";
        t.exports = ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "*[tabindex]", "*[contenteditable]"]
    }, {}],
    11: [function(e, t, i) {
        "use strict";
        var r = function() {
            function e(e) {
                for (var t = 0; t < l.length; t++) {
                    var r = i[t] + e;
                    if (void 0 !== a.style[r]) return r
                }
            }

            function t(e) {
                for (var t = 0; t < c.length; t++) {
                    var i = c[t] + e;
                    if (void 0 !== a.style[i]) return i
                }
            }
            var i = ["", "-webkit-", "-moz-", "-o-", "-ms-"],
                r = {
                    "animation-delay": "transitionend",
                    "-o-animation-delay": "oTransitionEnd",
                    "-moz-animation-delay": "transitionend",
                    "-webkit-animation-delay": "webkitTransitionEnd",
                    "-ms-animation-delay": "transitionend"
                },
                n = {
                    "animation-delay": "animationstart",
                    "-o-animation-delay": "oanimationstart",
                    "-moz-animation-delay": "animationstart",
                    "-webkit-animation-delay": "webkitAnimationStart",
                    "-ms-animation-delay": "MSAnimationStart"
                },
                o = {
                    "animation-delay": "animationiteration",
                    "-o-animation-delay": "oanimationiteration",
                    "-moz-animation-delay": "animationiteration",
                    "-webkit-animation-delay": "webkitAnimationIteration",
                    "-ms-animation-delay": "MSAnimationIteration"
                },
                s = {
                    "animation-delay": "animationend",
                    "-o-animation-delay": "oanimationend",
                    "-moz-animation-delay": "animationend",
                    "-webkit-animation-delay": "webkitAnimationEnd",
                    "-ms-animation-delay": "MSAnimationEnd"
                },
                a = document.createElement("_"),
                l = ["", "-webkit-", "-moz-", "-o-", "-ms-"],
                c = ["-webkit-", "", "-moz-", "-o-", "-ms-"];
            return {
                filter: t("filter"),
                transform: e("transform"),
                transformOrigin: e("transform-origin"),
                transition: e("transition"),
                transitionDelay: e("transition-delay"),
                transitionDuration: e("transition-duration"),
                transitionProperty: e("transition-property"),
                transitionTimingFunction: e("transition-timing-function"),
                transitionEnd: r[e("animation-delay")],
                animation: e("animation"),
                animationDelay: e("animation-delay"),
                animationDirection: e("animation-direction"),
                animationDuration: e("animation-duration"),
                animationFillMode: e("animation-fill-mode"),
                animationIterationCount: e("animation-iteration-count"),
                animationName: e("animation-name"),
                animationTimingFunction: e("animation-timing-function"),
                animationPlayState: e("animation-play-state"),
                animationStart: n[e("animation-delay")],
                animationIteration: o[e("animation-delay")],
                animationEnd: s[e("animation-delay")]
            }
        }();
        t.exports = r
    }, {}],
    12: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Array/prototype.slice"), e("@marcom/ac-polyfills/Element/prototype.classList");
        var r = e("./className/add");
        t.exports = function() {
            var e, t = Array.prototype.slice.call(arguments),
                i = t.shift(t);
            if (i.classList && i.classList.add) return void i.classList.add.apply(i.classList, t);
            for (e = 0; e < t.length; e++) r(i, t[e])
        }
    }, {
        "./className/add": 13,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0,
        "@marcom/ac-polyfills/Element/prototype.classList": void 0
    }],
    13: [function(e, t, i) {
        "use strict";
        var r = e("./contains");
        t.exports = function(e, t) {
            r(e, t) || (e.className += " " + t)
        }
    }, {
        "./contains": 14
    }],
    14: [function(e, t, i) {
        "use strict";
        var r = e("./getTokenRegExp");
        t.exports = function(e, t) {
            return r(t).test(e.className)
        }
    }, {
        "./getTokenRegExp": 15
    }],
    15: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return new RegExp("(\\s|^)" + e + "(\\s|$)")
        }
    }, {}],
    16: [function(e, t, i) {
        "use strict";
        var r = e("./contains"),
            n = e("./getTokenRegExp");
        t.exports = function(e, t) {
            r(e, t) && (e.className = e.className.replace(n(t), "$1").trim())
        }
    }, {
        "./contains": 14,
        "./getTokenRegExp": 15
    }],
    17: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Array/prototype.slice"), e("@marcom/ac-polyfills/Element/prototype.classList");
        var r = e("./className/remove");
        t.exports = function() {
            var e, t = Array.prototype.slice.call(arguments),
                i = t.shift(t);
            if (i.classList && i.classList.remove) return void i.classList.remove.apply(i.classList, t);
            for (e = 0; e < t.length; e++) r(i, t[e])
        }
    }, {
        "./className/remove": 16,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0,
        "@marcom/ac-polyfills/Element/prototype.classList": void 0
    }],
    18: [function(e, t, i) {
        "use strict";
        t.exports = {
            EventEmitterMicro: e("./ac-event-emitter-micro/EventEmitterMicro")
        }
    }, {
        "./ac-event-emitter-micro/EventEmitterMicro": 19
    }],
    19: [function(e, t, i) {
        "use strict";

        function r() {
            this._events = {}
        }
        var n = r.prototype;
        n.on = function(e, t) {
            this._events[e] = this._events[e] || [], this._events[e].unshift(t)
        }, n.once = function(e, t) {
            function i(n) {
                r.off(e, i), void 0 !== n ? t(n) : t()
            }
            var r = this;
            this.on(e, i)
        }, n.off = function(e, t) {
            if (this.has(e)) {
                var i = this._events[e].indexOf(t);
                i !== -1 && this._events[e].splice(i, 1)
            }
        }, n.trigger = function(e, t) {
            if (this.has(e))
                for (var i = this._events[e].length - 1; i >= 0; i--) void 0 !== t ? this._events[e][i](t) : this._events[e][i]()
        }, n.has = function(e) {
            return e in this._events != !1 && 0 !== this._events[e].length
        }, n.destroy = function() {
            for (var e in this._events) this._events[e] = null;
            this._events = null
        }, t.exports = r
    }, {}],
    20: [function(e, t, i) {
        "use strict";
        t.exports = {
            Clip: e("./ac-clip/Clip")
        }
    }, {
        "./ac-clip/Clip": 21
    }],
    21: [function(e, t, i) {
        "use strict";

        function r(e, t, i, n) {
            n = n || {}, this._options = n, this._isYoyo = n.yoyo, this._direction = 1, this._timeScale = 1, this._loop = n.loop || 0, this._loopCount = 0, this._target = e, this.duration(t), this._delay = 1e3 * (n.delay || 0), this._remainingDelay = this._delay, this._progress = 0, this._clock = n.clock || a, this._playing = !1, this._getTime = Date.now || function() {
                return (new Date).getTime()
            }, this._propsTo = i || {}, this._propsFrom = n.propsFrom || {}, this._onStart = n.onStart || null, this._onUpdate = n.onUpdate || null, this._onDraw = n.onDraw || null, this._onComplete = n.onComplete || null;
            var o = n.ease || u;
            this._ease = "function" == typeof o ? new l(o) : s(o), this._start = this._start.bind(this), this._update = this._update.bind(this), this._draw = this._draw.bind(this), this._isPrepared = !1, r._add(this), c.call(this)
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        e("@marcom/ac-polyfills/Array/isArray");
        var o = e("@marcom/ac-object/create"),
            s = e("@marcom/ac-easing").createPredefined,
            a = e("@marcom/ac-clock"),
            l = e("@marcom/ac-easing").Ease,
            c = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            u = "ease",
            h = r.prototype = o(c.prototype);
        r.COMPLETE = "complete", r.PAUSE = "pause", r.PLAY = "play", h.play = function() {
            return this._playing || (this._playing = !0, 0 === this._delay || 0 === this._remainingDelay ? this._start() : (this._isPrepared || (this._setDiff(), this._updateProps()), this._startTimeout = setTimeout(this._start, this._remainingDelay / this._timeScale), this._delayStart = this._getTime())), this
        }, h.pause = function() {
            return this._playing && (this._startTimeout && (this._remainingDelay = this._getTime() - this._delayStart, clearTimeout(this._startTimeout)), this._stop(), this.trigger(r.PAUSE, this)), this
        }, h.destroy = function() {
            return this.pause(), this._options = null, this._target = null, this._storeTarget = null, this._ease = null, this._clock = null, this._propsTo = null, this._propsFrom = null, this._storePropsTo = null, this._storePropsFrom = null, this._propsDiff = null, this._propsEase = null, this._onStart = null, this._onUpdate = null, this._onDraw = null, this._onComplete = null, r._remove(this), c.prototype.destroy.call(this), this
        }, h.reset = function() {
            if (this._isPrepared) return this._stop(), this._resetLoop(this._target, this._storeTarget), this._direction = 1, this._loop = this._options.loop || 0, this._loopCount = 0, this._propsFrom = this._storePropsFrom, this._propsTo = this._storePropsTo, this._progress = 0, this._setStartTime(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this), this
        }, h.playing = function() {
            return this._playing
        }, h.target = function() {
            return this._target
        }, h.duration = function(e) {
            return void 0 !== e && (this._duration = e, this._durationMs = 1e3 * e / this._timeScale, this._playing && this._setStartTime()), this._duration
        }, h.timeScale = function(e) {
            return void 0 !== e && (this._timeScale = e, this.duration(this._duration)), this._timeScale
        }, h.currentTime = function(e) {
            return void 0 !== e ? this.progress(e / this._duration) * this._duration : this.progress() * this._duration
        }, h.progress = function(e) {
            return void 0 !== e && (this._progress = Math.min(1, Math.max(0, e)), this._setStartTime(), this._isPrepared || this._setDiff(), this._playing && 1 === e ? (this._completeProps(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this), this._complete()) : (this._updateProps(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this))), this._progress
        }, h._resetLoop = function(e, t) {
            var i;
            for (i in t) t.hasOwnProperty(i) && null !== t[i] && ("object" === n(t[i]) ? this._resetLoop(e[i], t[i]) : e[i] = t[i])
        }, h._cloneObjects = function() {
            var e = {},
                t = {},
                i = {};
            return this._cloneObjectsLoop(this._target, this._propsTo, this._propsFrom, e, t, i), {
                target: e,
                propsTo: t,
                propsFrom: i
            }
        }, h._cloneObjectsLoop = function(e, t, i, r, o, s) {
            var a, l;
            for (l in i) i.hasOwnProperty(l) && void 0 === t[l] && void 0 !== e[l] && (r[l] = e[l], o[l] = e[l], s[l] = i[l]);
            for (l in t) e.hasOwnProperty(l) && (a = n(e[l]), null !== e[l] && "object" === a ? (Array.isArray(e[l]) ? (r[l] = [], o[l] = [], s[l] = []) : (r[l] = {}, o[l] = {}, s[l] = {}), this._cloneObjectsLoop(e[l], t[l] || {}, i[l] || {}, r[l], o[l], s[l])) : null !== t[l] && "number" === a && (r[l] = e[l], o[l] = t[l], i && void 0 !== i[l] && (s[l] = i[l])))
        }, h._prepareProperties = function() {
            if (!this._isPrepared) {
                var e = this._cloneObjects();
                this._storeTarget = e.target, this._propsTo = e.propsTo, this._storePropsTo = this._propsTo, this._propsFrom = e.propsFrom, this._storePropsFrom = this._propsFrom, this._isPrepared = !0
            }
        }, h._setStartTime = function() {
            this._startTime = this._getTime() - this.progress() * this._durationMs
        }, h._setDiff = function() {
            this._isPrepared || this._prepareProperties(), this._propsDiff = {}, this._setDiffLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff)
        }, h._setDiffLoop = function(e, t, i, r) {
            var o, s;
            for (s in e) e.hasOwnProperty(s) && (o = n(e[s]), null !== e[s] && "object" === o ? (t[s] = t[s] || {}, r[s] = r[s] || {}, this._setDiffLoop(e[s], t[s], i[s], r[s])) : "number" === o && void 0 !== i[s] ? (void 0 !== t[s] ? i[s] = t[s] : t[s] = i[s], r[s] = e[s] - i[s]) : (e[s] = null, t[s] = null))
        }, h._start = function() {
            this._startTimeout = null, this._remainingDelay = 0, this._setStartTime(), this._clock.on("update", this._update), this._clock.on("draw", this._draw), this._clock.isRunning() || this._clock.start(), this._setDiff(), this._playing = !0, this._running = !0, this._onStart && this._onStart.call(this, this), this.trigger(r.PLAY, this)
        }, h._stop = function() {
            this._playing = !1, this._running = !1, this._clock.off("update", this._update), this._clock.off("draw", this._draw)
        }, h._updateProps = function() {
            var e;
            e = 1 === this._direction ? this._ease.getValue(this._progress) : 1 - this._ease.getValue(1 - this._progress), this._updatePropsLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff, e)
        }, h._updatePropsLoop = function(e, t, i, r, n) {
            var o;
            for (o in e) e.hasOwnProperty(o) && null !== e[o] && ("number" != typeof e[o] ? this._updatePropsLoop(e[o], t[o], i[o], r[o], n) : i[o] = t[o] + r[o] * n)
        }, h._completeProps = function() {
            this._completePropsLoop(this._propsTo, this._target)
        }, h._completePropsLoop = function(e, t) {
            var i;
            for (i in e) e.hasOwnProperty(i) && null !== e[i] && ("number" != typeof e[i] ? this._completePropsLoop(e[i], t[i]) : t[i] = e[i])
        }, h._complete = function() {
            this._isYoyo && (this._loop > 0 && this._loopCount <= this._loop || 0 === this._loop && 0 === this._loopCount) ? (this._propsFrom = 1 === this._direction ? this._storePropsTo : this._storePropsFrom, this._propsTo = 1 === this._direction ? this._storePropsFrom : this._storePropsTo, this._direction *= -1, this._direction === -1 && ++this._loopCount, this.progress(0), this._start()) : this._loopCount < this._loop ? (++this._loopCount, this.progress(0), this._start()) : (this.trigger(r.COMPLETE, this), this._onComplete && this._onComplete.call(this, this), this._options && this._options.destroyOnComplete && this.destroy())
        }, h._update = function(e) {
            this._running && (this._progress = (e.timeNow - this._startTime) / this._durationMs, this._progress >= 1 ? (this._progress = 1, this._running = !1, this._completeProps()) : this._updateProps(), this._onUpdate && this._onUpdate.call(this, this))
        }, h._draw = function(e) {
            this._onDraw && this._onDraw.call(this, this), this._running || (this._stop(), 1 === this._progress && this._complete())
        }, r._instantiate = function() {
            return this._clips = [], this
        }, r._add = function(e) {
            this._clips.push(e)
        }, r._remove = function(e) {
            var t = this._clips.indexOf(e);
            t > -1 && this._clips.splice(t, 1)
        }, r.getAll = function(e) {
            if (void 0 !== e) {
                for (var t = [], i = this._clips.length; i--;) this._clips[i].target() === e && t.push(this._clips[i]);
                return t
            }
            return Array.prototype.slice.call(this._clips)
        }, r.destroyAll = function(e) {
            var t = this.getAll(e);
            this._clips.length === t.length && (this._clips = []);
            for (var i = t.length; i--;) t[i].destroy();
            return t
        }, r.to = function(e, t, i, n) {
            return n = n || {}, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(e, t, i, n).play()
        }, r.from = function(e, t, i, n) {
            return n = n || {}, n.propsFrom = i, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(e, t, n.propsTo, n).play()
        }, t.exports = r._instantiate()
    }, {
        "@marcom/ac-clock": 22,
        "@marcom/ac-easing": 86,
        "@marcom/ac-event-emitter-micro": 18,
        "@marcom/ac-object/create": 184,
        "@marcom/ac-polyfills/Array/isArray": void 0
    }],
    22: [function(e, t, i) {
        "use strict";
        var r = e("./ac-clock/Clock"),
            n = e("./ac-clock/ThrottledClock"),
            o = e("./ac-clock/sharedClockInstance");
        o.Clock = r, o.ThrottledClock = n, t.exports = o
    }, {
        "./ac-clock/Clock": 23,
        "./ac-clock/ThrottledClock": 24,
        "./ac-clock/sharedClockInstance": 25
    }],
    23: [function(e, t, i) {
        "use strict";

        function r() {
            o.call(this), this.lastFrameTime = null, this._animationFrame = null, this._active = !1, this._startTime = null, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._getTime = Date.now || function() {
                return (new Date).getTime()
            }
        }
        e("@marcom/ac-polyfills/Function/prototype.bind"), e("@marcom/ac-polyfills/requestAnimationFrame");
        var n, o = e("@marcom/ac-event-emitter-micro").EventEmitterMicro;
        (new Date).getTime();
        n = r.prototype = new o(null), n.start = function() {
            this._active || this._tick()
        }, n.stop = function() {
            this._active && window.cancelAnimationFrame(this._animationFrame), this._animationFrame = null, this.lastFrameTime = null, this._active = !1
        }, n.destroy = function() {
            this.stop(), this.off();
            var e;
            for (e in this) this.hasOwnProperty(e) && (this[e] = null)
        }, n.isRunning = function() {
            return this._active
        }, n._tick = function() {
            this._active || (this._active = !0), this._animationFrame = window.requestAnimationFrame(this._boundOnAnimationFrame)
        }, n._onAnimationFrame = function(e) {
            null === this.lastFrameTime && (this.lastFrameTime = e);
            var t = e - this.lastFrameTime,
                i = 0;
            if (t >= 1e3 && (t = 0), 0 !== t && (i = 1e3 / t), this._firstFrame === !0 && (t = 0, this._firstFrame = !1), 0 === i) this._firstFrame = !0;
            else {
                var r = {
                    time: e,
                    delta: t,
                    fps: i,
                    naturalFps: i,
                    timeNow: this._getTime()
                };
                this.trigger("update", r), this.trigger("draw", r)
            }
            this._animationFrame = null, this.lastFrameTime = e, this._active !== !1 ? this._tick() : this.lastFrameTime = null
        }, t.exports = r
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-polyfills/Function/prototype.bind": void 0,
        "@marcom/ac-polyfills/requestAnimationFrame": void 0
    }],
    24: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            null !== e && (s.call(this), t = t || {}, this._fps = e || null, this._clock = t.clock || o, this._lastThrottledTime = null, this._clockEvent = null, this._boundOnClockDraw = this._onClockDraw.bind(this), this._boundOnClockUpdate = this._onClockUpdate.bind(this), this._clock.on("update", this._boundOnClockUpdate))
        }
        e("@marcom/ac-polyfills/requestAnimationFrame");
        var n, o = e("./sharedClockInstance"),
            s = e("@marcom/ac-event-emitter-micro").EventEmitterMicro;
        n = r.prototype = new s(null), n.setFps = function(e) {
            return this._fps = e, this
        }, n.getFps = function() {
            return this._fps
        }, n.start = function() {
            return this._clock.start(), this
        }, n.stop = function() {
            return this._clock.stop(), this
        }, n.isRunning = function() {
            return this._clock.isRunning()
        }, n.destroy = function() {
            this._clock.off("update", this._boundOnClockUpdate), this._clock.destroy.call(this)
        }, n._onClockUpdate = function(e) {
            null === this._lastThrottledTime && (this._lastThrottledTime = this._clock.lastFrameTime);
            var t = e.time - this._lastThrottledTime;
            if (!this._fps) throw new TypeError("FPS is not defined.");
            Math.ceil(1e3 / t) >= this._fps + 2 || (this._clockEvent = e, this._clockEvent.delta = t, this._clockEvent.fps = 1e3 / t, this._lastThrottledTime = this._clockEvent.time, this._clock.once("draw", this._boundOnClockDraw), this.trigger("update", this._clockEvent))
        }, n._onClockDraw = function() {
            this.trigger("draw", this._clockEvent)
        }, t.exports = r
    }, {
        "./sharedClockInstance": 25,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-polyfills/requestAnimationFrame": void 0
    }],
    25: [function(e, t, i) {
        "use strict";
        var r = e("./Clock");
        t.exports = new r
    }, {
        "./Clock": 23
    }],
    26: [function(e, t, i) {
        "use strict";
        var r = e("./ac-color/Color");
        r.decimalToHex = e("./ac-color/static/decimalToHex"), r.hexToDecimal = e("./ac-color/static/hexToDecimal"), r.hexToRgb = e("./ac-color/static/hexToRgb"), r.isColor = e("./ac-color/static/isColor"), r.isHex = e("./ac-color/static/isHex"), r.isRgb = e("./ac-color/static/isRgb"), r.isRgba = e("./ac-color/static/isRgba"), r.mixColors = e("./ac-color/static/mixColors"), r.rgbaToArray = e("./ac-color/static/rgbaToArray"), r.rgbToArray = e("./ac-color/static/rgbToArray"), r.rgbToDecimal = e("./ac-color/static/rgbToDecimal"), r.rgbToHex = e("./ac-color/static/rgbToHex"), r.rgbToHsl = e("./ac-color/static/rgbToHsl"), r.rgbToHsv = e("./ac-color/static/rgbToHsv"), r.rgbaToObject = e("./ac-color/static/rgbaToObject"), r.rgbToObject = e("./ac-color/static/rgbToObject"), r.shortToLongHex = e("./ac-color/static/shortToLongHex"), t.exports = {
            Color: r
        }
    }, {
        "./ac-color/Color": 27,
        "./ac-color/static/decimalToHex": 29,
        "./ac-color/static/hexToDecimal": 30,
        "./ac-color/static/hexToRgb": 31,
        "./ac-color/static/isColor": 32,
        "./ac-color/static/isHex": 33,
        "./ac-color/static/isRgb": 34,
        "./ac-color/static/isRgba": 35,
        "./ac-color/static/mixColors": 36,
        "./ac-color/static/rgbToArray": 37,
        "./ac-color/static/rgbToDecimal": 38,
        "./ac-color/static/rgbToHex": 39,
        "./ac-color/static/rgbToHsl": 40,
        "./ac-color/static/rgbToHsv": 41,
        "./ac-color/static/rgbToObject": 42,
        "./ac-color/static/rgbaToArray": 43,
        "./ac-color/static/rgbaToObject": 44,
        "./ac-color/static/shortToLongHex": 45
    }],
    27: [function(e, t, i) {
        "use strict";

        function r(e) {
            if (!s(e) && !n.nameToRgbObject[e]) throw new Error(e + " is not a supported color.");
            this._setColor(e)
        }
        var n = e("./helpers/cssColorNames"),
            o = e("./static/hexToRgb"),
            s = e("./static/isColor"),
            a = e("./static/isHex"),
            l = e("./static/isRgba"),
            c = e("./static/mixColors"),
            u = e("./static/rgbaToArray"),
            h = e("./static/rgbToArray"),
            m = e("./static/rgbToDecimal"),
            p = e("./static/rgbToHex"),
            d = e("./static/rgbaToObject"),
            f = e("./static/rgbToObject"),
            y = e("./static/shortToLongHex"),
            _ = r.prototype;
        _._setColor = function(e) {
            if (this._color = {}, a(e)) this._color.hex = y(e), this._color.rgb = {
                color: o(e)
            };
            else if (l(e)) {
                this._color.rgba = {
                    color: e
                };
                var t = this.rgbaObject();
                this._color.rgb = {
                    color: "rgb(" + t.r + ", " + t.g + ", " + t.b + ")"
                }
            } else if (n.nameToRgbObject[e]) {
                var i = n.nameToRgbObject[e];
                this._color.rgb = {
                    object: i,
                    color: "rgb(" + i.r + ", " + i.g + ", " + i.b + ")"
                }
            } else this._color.rgb = {
                color: e
            }
        }, _.rgb = function() {
            return this._color.rgb.color
        }, _.rgba = function() {
            if (void 0 === this._color.rgba) {
                var e = this.rgbObject();
                this._color.rgba = {
                    color: "rgba(" + e.r + ", " + e.g + ", " + e.b + ", 1)"
                }
            }
            return this._color.rgba.color
        }, _.hex = function() {
            return void 0 === this._color.hex && (this._color.hex = p.apply(this, this.rgbArray())), this._color.hex
        }, _.decimal = function() {
            return void 0 === this._color.decimal && (this._color.decimal = m(this.rgb())), this._color.decimal
        }, _.cssName = function() {
            return n.rgbToName[this.rgb()] || null
        }, _.rgbArray = function() {
            return void 0 === this._color.rgb.array && (this._color.rgb.array = h(this.rgb())), this._color.rgb.array
        }, _.rgbaArray = function() {
            return void 0 === this._color.rgba && this.rgba(), void 0 === this._color.rgba.array && (this._color.rgba.array = u(this.rgba())), this._color.rgba.array
        }, _.rgbObject = function() {
            return void 0 === this._color.rgb.object && (this._color.rgb.object = f(this.rgb())), this._color.rgb.object
        }, _.rgbaObject = function() {
            return void 0 === this._color.rgba && this.rgba(), void 0 === this._color.rgba.object && (this._color.rgba.object = d(this.rgba())), this._color.rgba.object
        }, _.getRed = function() {
            return this.rgbObject().r
        }, _.getGreen = function() {
            return this.rgbObject().g
        }, _.getBlue = function() {
            return this.rgbObject().b
        }, _.getAlpha = function() {
            return void 0 === this._color.rgba ? 1 : this.rgbaObject().a
        }, _.setRed = function(e) {
            return e !== this.getRed() && this._setColor("rgba(" + e + ", " + this.getGreen() + ", " + this.getBlue() + ", " + this.getAlpha() + ")"), this.rgbObject().r
        }, _.setGreen = function(e) {
            return e !== this.getGreen() && this._setColor("rgba(" + this.getRed() + ", " + e + ", " + this.getBlue() + ", " + this.getAlpha() + ")"), this.rgbObject().g
        }, _.setBlue = function(e) {
            return e !== this.getBlue() && this._setColor("rgba(" + this.getRed() + ", " + this.getGreen() + ", " + e + ", " + this.getAlpha() + ")"), this.rgbObject().b
        }, _.setAlpha = function(e) {
            return e !== this.getAlpha() && this._setColor("rgba(" + this.getRed() + ", " + this.getGreen() + ", " + this.getBlue() + ", " + e + ")"), this.rgbaObject().a
        }, _.mix = function(e, t) {
            var i = f(c(this.rgb(), e, t));
            return this._setColor("rgba(" + i.r + ", " + i.g + ", " + i.b + ", " + this.getAlpha() + ")"), this.rgb()
        }, _.clone = function() {
            return new r(this.rgb())
        }, t.exports = r
    }, {
        "./helpers/cssColorNames": 28,
        "./static/hexToRgb": 31,
        "./static/isColor": 32,
        "./static/isHex": 33,
        "./static/isRgba": 35,
        "./static/mixColors": 36,
        "./static/rgbToArray": 37,
        "./static/rgbToDecimal": 38,
        "./static/rgbToHex": 39,
        "./static/rgbToObject": 42,
        "./static/rgbaToArray": 43,
        "./static/rgbaToObject": 44,
        "./static/shortToLongHex": 45
    }],
    28: [function(e, t, i) {
        "use strict";
        var r = {
                "rgb(240, 248, 255)": "aliceblue",
                "rgb(250, 235, 215)": "antiquewhite",
                "rgb(0, 0, 0)": "black",
                "rgb(0, 0, 255)": "blue",
                "rgb(0, 255, 255)": "cyan",
                "rgb(0, 0, 139)": "darkblue",
                "rgb(0, 139, 139)": "darkcyan",
                "rgb(0, 100, 0)": "darkgreen",
                "rgb(0, 206, 209)": "darkturquoise",
                "rgb(0, 191, 255)": "deepskyblue",
                "rgb(0, 128, 0)": "green",
                "rgb(0, 255, 0)": "lime",
                "rgb(0, 0, 205)": "mediumblue",
                "rgb(0, 250, 154)": "mediumspringgreen",
                "rgb(0, 0, 128)": "navy",
                "rgb(0, 255, 127)": "springgreen",
                "rgb(0, 128, 128)": "teal",
                "rgb(25, 25, 112)": "midnightblue",
                "rgb(30, 144, 255)": "dodgerblue",
                "rgb(32, 178, 170)": "lightseagreen",
                "rgb(34, 139, 34)": "forestgreen",
                "rgb(46, 139, 87)": "seagreen",
                "rgb(47, 79, 79)": "darkslategray",
                "rgb(50, 205, 50)": "limegreen",
                "rgb(60, 179, 113)": "mediumseagreen",
                "rgb(64, 224, 208)": "turquoise",
                "rgb(65, 105, 225)": "royalblue",
                "rgb(70, 130, 180)": "steelblue",
                "rgb(72, 61, 139)": "darkslateblue",
                "rgb(72, 209, 204)": "mediumturquoise",
                "rgb(75, 0, 130)": "indigo",
                "rgb(85, 107, 47)": "darkolivegreen",
                "rgb(95, 158, 160)": "cadetblue",
                "rgb(100, 149, 237)": "cornflowerblue",
                "rgb(102, 205, 170)": "mediumaquamarine",
                "rgb(105, 105, 105)": "dimgray",
                "rgb(106, 90, 205)": "slateblue",
                "rgb(107, 142, 35)": "olivedrab",
                "rgb(112, 128, 144)": "slategray",
                "rgb(119, 136, 153)": "lightslategray",
                "rgb(123, 104, 238)": "mediumslateblue",
                "rgb(124, 252, 0)": "lawngreen",
                "rgb(127, 255, 212)": "aquamarine",
                "rgb(127, 255, 0)": "chartreuse",
                "rgb(128, 128, 128)": "gray",
                "rgb(128, 0, 0)": "maroon",
                "rgb(128, 128, 0)": "olive",
                "rgb(128, 0, 128)": "purple",
                "rgb(135, 206, 250)": "lightskyblue",
                "rgb(135, 206, 235)": "skyblue",
                "rgb(138, 43, 226)": "blueviolet",
                "rgb(139, 0, 139)": "darkmagenta",
                "rgb(139, 0, 0)": "darkred",
                "rgb(139, 69, 19)": "saddlebrown",
                "rgb(143, 188, 143)": "darkseagreen",
                "rgb(144, 238, 144)": "lightgreen",
                "rgb(147, 112, 219)": "mediumpurple",
                "rgb(148, 0, 211)": "darkviolet",
                "rgb(152, 251, 152)": "palegreen",
                "rgb(153, 50, 204)": "darkorchid",
                "rgb(154, 205, 50)": "yellowgreen",
                "rgb(160, 82, 45)": "sienna",
                "rgb(165, 42, 42)": "brown",
                "rgb(169, 169, 169)": "darkgray",
                "rgb(173, 255, 47)": "greenyellow",
                "rgb(173, 216, 230)": "lightblue",
                "rgb(175, 238, 238)": "paleturquoise",
                "rgb(176, 196, 222)": "lightsteelblue",
                "rgb(176, 224, 230)": "powderblue",
                "rgb(178, 34, 34)": "firebrick",
                "rgb(184, 134, 11)": "darkgoldenrod",
                "rgb(186, 85, 211)": "mediumorchid",
                "rgb(188, 143, 143)": "rosybrown",
                "rgb(189, 183, 107)": "darkkhaki",
                "rgb(192, 192, 192)": "silver",
                "rgb(199, 21, 133)": "mediumvioletred",
                "rgb(205, 92, 92)": "indianred",
                "rgb(205, 133, 63)": "peru",
                "rgb(210, 105, 30)": "chocolate",
                "rgb(210, 180, 140)": "tan",
                "rgb(211, 211, 211)": "lightgray",
                "rgb(216, 191, 216)": "thistle",
                "rgb(218, 165, 32)": "goldenrod",
                "rgb(218, 112, 214)": "orchid",
                "rgb(219, 112, 147)": "palevioletred",
                "rgb(220, 20, 60)": "crimson",
                "rgb(220, 220, 220)": "gainsboro",
                "rgb(221, 160, 221)": "plum",
                "rgb(222, 184, 135)": "burlywood",
                "rgb(224, 255, 255)": "lightcyan",
                "rgb(230, 230, 250)": "lavender",
                "rgb(233, 150, 122)": "darksalmon",
                "rgb(238, 232, 170)": "palegoldenrod",
                "rgb(238, 130, 238)": "violet",
                "rgb(240, 255, 255)": "azure",
                "rgb(240, 255, 240)": "honeydew",
                "rgb(240, 230, 140)": "khaki",
                "rgb(240, 128, 128)": "lightcoral",
                "rgb(244, 164, 96)": "sandybrown",
                "rgb(245, 245, 220)": "beige",
                "rgb(245, 255, 250)": "mintcream",
                "rgb(245, 222, 179)": "wheat",
                "rgb(245, 245, 245)": "whitesmoke",
                "rgb(248, 248, 255)": "ghostwhite",
                "rgb(250, 250, 210)": "lightgoldenrodyellow",
                "rgb(250, 240, 230)": "linen",
                "rgb(250, 128, 114)": "salmon",
                "rgb(253, 245, 230)": "oldlace",
                "rgb(255, 228, 196)": "bisque",
                "rgb(255, 235, 205)": "blanchedalmond",
                "rgb(255, 127, 80)": "coral",
                "rgb(255, 248, 220)": "cornsilk",
                "rgb(255, 140, 0)": "darkorange",
                "rgb(255, 20, 147)": "deeppink",
                "rgb(255, 250, 240)": "floralwhite",
                "rgb(255, 215, 0)": "gold",
                "rgb(255, 105, 180)": "hotpink",
                "rgb(255, 255, 240)": "ivory",
                "rgb(255, 240, 245)": "lavenderblush",
                "rgb(255, 250, 205)": "lemonchiffon",
                "rgb(255, 182, 193)": "lightpink",
                "rgb(255, 160, 122)": "lightsalmon",
                "rgb(255, 255, 224)": "lightyellow",
                "rgb(255, 0, 255)": "magenta",
                "rgb(255, 228, 225)": "mistyrose",
                "rgb(255, 228, 181)": "moccasin",
                "rgb(255, 222, 173)": "navajowhite",
                "rgb(255, 165, 0)": "orange",
                "rgb(255, 69, 0)": "orangered",
                "rgb(255, 239, 213)": "papayawhip",
                "rgb(255, 218, 185)": "peachpuff",
                "rgb(255, 192, 203)": "pink",
                "rgb(255, 0, 0)": "red",
                "rgb(255, 245, 238)": "seashell",
                "rgb(255, 250, 250)": "snow",
                "rgb(255, 99, 71)": "tomato",
                "rgb(255, 255, 255)": "white",
                "rgb(255, 255, 0)": "yellow",
                "rgb(102, 51, 153)": "rebeccapurple"
            },
            n = {
                aqua: {
                    r: 0,
                    g: 255,
                    b: 255
                },
                aliceblue: {
                    r: 240,
                    g: 248,
                    b: 255
                },
                antiquewhite: {
                    r: 250,
                    g: 235,
                    b: 215
                },
                black: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                blue: {
                    r: 0,
                    g: 0,
                    b: 255
                },
                cyan: {
                    r: 0,
                    g: 255,
                    b: 255
                },
                darkblue: {
                    r: 0,
                    g: 0,
                    b: 139
                },
                darkcyan: {
                    r: 0,
                    g: 139,
                    b: 139
                },
                darkgreen: {
                    r: 0,
                    g: 100,
                    b: 0
                },
                darkturquoise: {
                    r: 0,
                    g: 206,
                    b: 209
                },
                deepskyblue: {
                    r: 0,
                    g: 191,
                    b: 255
                },
                green: {
                    r: 0,
                    g: 128,
                    b: 0
                },
                lime: {
                    r: 0,
                    g: 255,
                    b: 0
                },
                mediumblue: {
                    r: 0,
                    g: 0,
                    b: 205
                },
                mediumspringgreen: {
                    r: 0,
                    g: 250,
                    b: 154
                },
                navy: {
                    r: 0,
                    g: 0,
                    b: 128
                },
                springgreen: {
                    r: 0,
                    g: 255,
                    b: 127
                },
                teal: {
                    r: 0,
                    g: 128,
                    b: 128
                },
                midnightblue: {
                    r: 25,
                    g: 25,
                    b: 112
                },
                dodgerblue: {
                    r: 30,
                    g: 144,
                    b: 255
                },
                lightseagreen: {
                    r: 32,
                    g: 178,
                    b: 170
                },
                forestgreen: {
                    r: 34,
                    g: 139,
                    b: 34
                },
                seagreen: {
                    r: 46,
                    g: 139,
                    b: 87
                },
                darkslategray: {
                    r: 47,
                    g: 79,
                    b: 79
                },
                darkslategrey: {
                    r: 47,
                    g: 79,
                    b: 79
                },
                limegreen: {
                    r: 50,
                    g: 205,
                    b: 50
                },
                mediumseagreen: {
                    r: 60,
                    g: 179,
                    b: 113
                },
                turquoise: {
                    r: 64,
                    g: 224,
                    b: 208
                },
                royalblue: {
                    r: 65,
                    g: 105,
                    b: 225
                },
                steelblue: {
                    r: 70,
                    g: 130,
                    b: 180
                },
                darkslateblue: {
                    r: 72,
                    g: 61,
                    b: 139
                },
                mediumturquoise: {
                    r: 72,
                    g: 209,
                    b: 204
                },
                indigo: {
                    r: 75,
                    g: 0,
                    b: 130
                },
                darkolivegreen: {
                    r: 85,
                    g: 107,
                    b: 47
                },
                cadetblue: {
                    r: 95,
                    g: 158,
                    b: 160
                },
                cornflowerblue: {
                    r: 100,
                    g: 149,
                    b: 237
                },
                mediumaquamarine: {
                    r: 102,
                    g: 205,
                    b: 170
                },
                dimgray: {
                    r: 105,
                    g: 105,
                    b: 105
                },
                dimgrey: {
                    r: 105,
                    g: 105,
                    b: 105
                },
                slateblue: {
                    r: 106,
                    g: 90,
                    b: 205
                },
                olivedrab: {
                    r: 107,
                    g: 142,
                    b: 35
                },
                slategray: {
                    r: 112,
                    g: 128,
                    b: 144
                },
                slategrey: {
                    r: 112,
                    g: 128,
                    b: 144
                },
                lightslategray: {
                    r: 119,
                    g: 136,
                    b: 153
                },
                lightslategrey: {
                    r: 119,
                    g: 136,
                    b: 153
                },
                mediumslateblue: {
                    r: 123,
                    g: 104,
                    b: 238
                },
                lawngreen: {
                    r: 124,
                    g: 252,
                    b: 0
                },
                aquamarine: {
                    r: 127,
                    g: 255,
                    b: 212
                },
                chartreuse: {
                    r: 127,
                    g: 255,
                    b: 0
                },
                gray: {
                    r: 128,
                    g: 128,
                    b: 128
                },
                grey: {
                    r: 128,
                    g: 128,
                    b: 128
                },
                maroon: {
                    r: 128,
                    g: 0,
                    b: 0
                },
                olive: {
                    r: 128,
                    g: 128,
                    b: 0
                },
                purple: {
                    r: 128,
                    g: 0,
                    b: 128
                },
                lightskyblue: {
                    r: 135,
                    g: 206,
                    b: 250
                },
                skyblue: {
                    r: 135,
                    g: 206,
                    b: 235
                },
                blueviolet: {
                    r: 138,
                    g: 43,
                    b: 226
                },
                darkmagenta: {
                    r: 139,
                    g: 0,
                    b: 139
                },
                darkred: {
                    r: 139,
                    g: 0,
                    b: 0
                },
                saddlebrown: {
                    r: 139,
                    g: 69,
                    b: 19
                },
                darkseagreen: {
                    r: 143,
                    g: 188,
                    b: 143
                },
                lightgreen: {
                    r: 144,
                    g: 238,
                    b: 144
                },
                mediumpurple: {
                    r: 147,
                    g: 112,
                    b: 219
                },
                darkviolet: {
                    r: 148,
                    g: 0,
                    b: 211
                },
                palegreen: {
                    r: 152,
                    g: 251,
                    b: 152
                },
                darkorchid: {
                    r: 153,
                    g: 50,
                    b: 204
                },
                yellowgreen: {
                    r: 154,
                    g: 205,
                    b: 50
                },
                sienna: {
                    r: 160,
                    g: 82,
                    b: 45
                },
                brown: {
                    r: 165,
                    g: 42,
                    b: 42
                },
                darkgray: {
                    r: 169,
                    g: 169,
                    b: 169
                },
                darkgrey: {
                    r: 169,
                    g: 169,
                    b: 169
                },
                greenyellow: {
                    r: 173,
                    g: 255,
                    b: 47
                },
                lightblue: {
                    r: 173,
                    g: 216,
                    b: 230
                },
                paleturquoise: {
                    r: 175,
                    g: 238,
                    b: 238
                },
                lightsteelblue: {
                    r: 176,
                    g: 196,
                    b: 222
                },
                powderblue: {
                    r: 176,
                    g: 224,
                    b: 230
                },
                firebrick: {
                    r: 178,
                    g: 34,
                    b: 34
                },
                darkgoldenrod: {
                    r: 184,
                    g: 134,
                    b: 11
                },
                mediumorchid: {
                    r: 186,
                    g: 85,
                    b: 211
                },
                rosybrown: {
                    r: 188,
                    g: 143,
                    b: 143
                },
                darkkhaki: {
                    r: 189,
                    g: 183,
                    b: 107
                },
                silver: {
                    r: 192,
                    g: 192,
                    b: 192
                },
                mediumvioletred: {
                    r: 199,
                    g: 21,
                    b: 133
                },
                indianred: {
                    r: 205,
                    g: 92,
                    b: 92
                },
                peru: {
                    r: 205,
                    g: 133,
                    b: 63
                },
                chocolate: {
                    r: 210,
                    g: 105,
                    b: 30
                },
                tan: {
                    r: 210,
                    g: 180,
                    b: 140
                },
                lightgray: {
                    r: 211,
                    g: 211,
                    b: 211
                },
                lightgrey: {
                    r: 211,
                    g: 211,
                    b: 211
                },
                thistle: {
                    r: 216,
                    g: 191,
                    b: 216
                },
                goldenrod: {
                    r: 218,
                    g: 165,
                    b: 32
                },
                orchid: {
                    r: 218,
                    g: 112,
                    b: 214
                },
                palevioletred: {
                    r: 219,
                    g: 112,
                    b: 147
                },
                crimson: {
                    r: 220,
                    g: 20,
                    b: 60
                },
                gainsboro: {
                    r: 220,
                    g: 220,
                    b: 220
                },
                plum: {
                    r: 221,
                    g: 160,
                    b: 221
                },
                burlywood: {
                    r: 222,
                    g: 184,
                    b: 135
                },
                lightcyan: {
                    r: 224,
                    g: 255,
                    b: 255
                },
                lavender: {
                    r: 230,
                    g: 230,
                    b: 250
                },
                darksalmon: {
                    r: 233,
                    g: 150,
                    b: 122
                },
                palegoldenrod: {
                    r: 238,
                    g: 232,
                    b: 170
                },
                violet: {
                    r: 238,
                    g: 130,
                    b: 238
                },
                azure: {
                    r: 240,
                    g: 255,
                    b: 255
                },
                honeydew: {
                    r: 240,
                    g: 255,
                    b: 240
                },
                khaki: {
                    r: 240,
                    g: 230,
                    b: 140
                },
                lightcoral: {
                    r: 240,
                    g: 128,
                    b: 128
                },
                sandybrown: {
                    r: 244,
                    g: 164,
                    b: 96
                },
                beige: {
                    r: 245,
                    g: 245,
                    b: 220
                },
                mintcream: {
                    r: 245,
                    g: 255,
                    b: 250
                },
                wheat: {
                    r: 245,
                    g: 222,
                    b: 179
                },
                whitesmoke: {
                    r: 245,
                    g: 245,
                    b: 245
                },
                ghostwhite: {
                    r: 248,
                    g: 248,
                    b: 255
                },
                lightgoldenrodyellow: {
                    r: 250,
                    g: 250,
                    b: 210
                },
                linen: {
                    r: 250,
                    g: 240,
                    b: 230
                },
                salmon: {
                    r: 250,
                    g: 128,
                    b: 114
                },
                oldlace: {
                    r: 253,
                    g: 245,
                    b: 230
                },
                bisque: {
                    r: 255,
                    g: 228,
                    b: 196
                },
                blanchedalmond: {
                    r: 255,
                    g: 235,
                    b: 205
                },
                coral: {
                    r: 255,
                    g: 127,
                    b: 80
                },
                cornsilk: {
                    r: 255,
                    g: 248,
                    b: 220
                },
                darkorange: {
                    r: 255,
                    g: 140,
                    b: 0
                },
                deeppink: {
                    r: 255,
                    g: 20,
                    b: 147
                },
                floralwhite: {
                    r: 255,
                    g: 250,
                    b: 240
                },
                fuchsia: {
                    r: 255,
                    g: 0,
                    b: 255
                },
                gold: {
                    r: 255,
                    g: 215,
                    b: 0
                },
                hotpink: {
                    r: 255,
                    g: 105,
                    b: 180
                },
                ivory: {
                    r: 255,
                    g: 255,
                    b: 240
                },
                lavenderblush: {
                    r: 255,
                    g: 240,
                    b: 245
                },
                lemonchiffon: {
                    r: 255,
                    g: 250,
                    b: 205
                },
                lightpink: {
                    r: 255,
                    g: 182,
                    b: 193
                },
                lightsalmon: {
                    r: 255,
                    g: 160,
                    b: 122
                },
                lightyellow: {
                    r: 255,
                    g: 255,
                    b: 224
                },
                magenta: {
                    r: 255,
                    g: 0,
                    b: 255
                },
                mistyrose: {
                    r: 255,
                    g: 228,
                    b: 225
                },
                moccasin: {
                    r: 255,
                    g: 228,
                    b: 181
                },
                navajowhite: {
                    r: 255,
                    g: 222,
                    b: 173
                },
                orange: {
                    r: 255,
                    g: 165,
                    b: 0
                },
                orangered: {
                    r: 255,
                    g: 69,
                    b: 0
                },
                papayawhip: {
                    r: 255,
                    g: 239,
                    b: 213
                },
                peachpuff: {
                    r: 255,
                    g: 218,
                    b: 185
                },
                pink: {
                    r: 255,
                    g: 192,
                    b: 203
                },
                red: {
                    r: 255,
                    g: 0,
                    b: 0
                },
                seashell: {
                    r: 255,
                    g: 245,
                    b: 238
                },
                snow: {
                    r: 255,
                    g: 250,
                    b: 250
                },
                tomato: {
                    r: 255,
                    g: 99,
                    b: 71
                },
                white: {
                    r: 255,
                    g: 255,
                    b: 255
                },
                yellow: {
                    r: 255,
                    g: 255,
                    b: 0
                },
                rebeccapurple: {
                    r: 102,
                    g: 51,
                    b: 153
                }
            };
        t.exports = {
            rgbToName: r,
            nameToRgbObject: n
        }
    }, {}],
    29: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return "#" + e.toString(16)
        }
    }, {}],
    30: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return parseInt(e.substr(1), 16)
        }
    }, {}],
    31: [function(e, t, i) {
        "use strict";
        var r = e("./shortToLongHex");
        t.exports = function(e) {
            e = r(e);
            var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return t ? "rgb(" + parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) + ")" : null
        }
    }, {
        "./shortToLongHex": 45
    }],
    32: [function(e, t, i) {
        "use strict";
        var r = e("./isRgb"),
            n = e("./isRgba"),
            o = e("./isHex");
        t.exports = function(e) {
            return o(e) || r(e) || n(e)
        }
    }, {
        "./isHex": 33,
        "./isRgb": 34,
        "./isRgba": 35
    }],
    33: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
            return t.test(e)
        }
    }, {}],
    34: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = /^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
            return null !== t.exec(e)
        }
    }, {}],
    35: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = /^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
            return null !== t.exec(e)
        }
    }, {}],
    36: [function(e, t, i) {
        "use strict";
        var r = e("./isHex"),
            n = e("./hexToRgb"),
            o = e("./rgbToObject");
        t.exports = function(e, t, i) {
            e = r(e) ? n(e) : e, t = r(t) ? n(t) : t, e = o(e), t = o(t);
            var s = e.r + (t.r - e.r) * i,
                a = e.g + (t.g - e.g) * i,
                l = e.b + (t.b - e.b) * i;
            return "rgb(" + Math.round(s) + ", " + Math.round(a) + ", " + Math.round(l) + ")"
        }
    }, {
        "./hexToRgb": 31,
        "./isHex": 33,
        "./rgbToObject": 42
    }],
    37: [function(e, t, i) {
        "use strict";
        var r = e("./rgbToObject");
        t.exports = function(e) {
            var t = r(e);
            return [t.r, t.g, t.b]
        }
    }, {
        "./rgbToObject": 42
    }],
    38: [function(e, t, i) {
        "use strict";
        var r = e("./hexToDecimal"),
            n = e("./rgbToArray"),
            o = e("./rgbToHex");
        t.exports = function(e) {
            var t = o.apply(this, n(e));
            return r(t)
        }
    }, {
        "./hexToDecimal": 30,
        "./rgbToArray": 37,
        "./rgbToHex": 39
    }],
    39: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t, i) {
            return "#" + ((1 << 24) + (e << 16) + (t << 8) + i).toString(16).slice(1)
        }
    }, {}],
    40: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t, i) {
            if (3 !== arguments.length) return !1;
            e /= 255, t /= 255, i /= 255;
            var r, n, o = Math.max(e, t, i),
                s = Math.min(e, t, i),
                a = o + s,
                l = o - s,
                c = a / 2;
            if (o === s) r = n = 0;
            else {
                switch (n = c > .5 ? l / (2 - o - s) : l / a, o) {
                    case e:
                        r = (t - i) / l;
                        break;
                    case t:
                        r = 2 + (i - e) / l;
                        break;
                    case i:
                        r = 4 + (e - t) / l
                }
                r *= 60, r < 0 && (r += 360)
            }
            return [r, Math.round(100 * n), Math.round(100 * c)]
        }
    }, {}],
    41: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t, i) {
            if (3 !== arguments.length) return !1;
            var r, n, o = e / 255,
                s = t / 255,
                a = i / 255,
                l = Math.max(o, s, a),
                c = Math.min(o, s, a),
                u = l,
                h = l - c;
            if (n = 0 === l ? 0 : h / l, l === c) r = 0;
            else {
                switch (l) {
                    case o:
                        r = (s - a) / h + (s < a ? 6 : 0);
                        break;
                    case s:
                        r = (a - o) / h + 2;
                        break;
                    case a:
                        r = (o - s) / h + 4
                }
                r /= 6
            }
            return [Math.round(360 * r), Math.round(100 * n), Math.round(100 * u)]
        }
    }, {}],
    42: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/,
                i = t.exec(e);
            return {
                r: Number(i[1]),
                g: Number(i[2]),
                b: Number(i[3])
            }
        }
    }, {}],
    43: [function(e, t, i) {
        "use strict";
        var r = e("./rgbaToObject");
        t.exports = function(e) {
            var t = r(e);
            return [t.r, t.g, t.b, t.a]
        }
    }, {
        "./rgbaToObject": 44
    }],
    44: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = /rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/,
                i = t.exec(e);
            return {
                r: Number(i[1]),
                g: Number(i[2]),
                b: Number(i[3]),
                a: Number(i[4])
            }
        }
    }, {}],
    45: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            return e = e.replace(t, function(e, t, i, r) {
                return "#" + t + t + i + i + r + r
            })
        }
    }, {}],
    46: [function(e, t, i) {
        "use strict";
        t.exports = e("./internal/expose")("error")
    }, {
        "./internal/expose": 47
    }],
    47: [function(e, t, i) {
        "use strict";
        var r, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = "f7c9180f-5c45-47b4-8de4-428015f096c0",
            s = window || self;
        try {
            r = !!s.localStorage.getItem(o)
        } catch (a) {}
        t.exports = function(e) {
            return function() {
                if (r && "object" === n(window.console)) return console[e].apply(console, Array.prototype.slice.call(arguments, 0))
            }
        }
    }, {}],
    48: [function(e, t, i) {
        "use strict";
        t.exports = e("./internal/expose")("log")
    }, {
        "./internal/expose": 47
    }],
    49: [function(e, t, i) {
        "use strict";
        t.exports = e("./internal/expose")("warn")
    }, {
        "./internal/expose": 47
    }],
    50: [function(e, t, i) {
        "use strict";
        var r = e("./utils/addEventListener"),
            n = e("./shared/getEventType");
        t.exports = function(e, t, i, o) {
            return t = n(e, t), r(e, t, i, o)
        }
    }, {
        "./shared/getEventType": 52,
        "./utils/addEventListener": 54
    }],
    51: [function(e, t, i) {
        "use strict";
        var r = e("./utils/removeEventListener"),
            n = e("./shared/getEventType");
        t.exports = function(e, t, i, o) {
            return t = n(e, t), r(e, t, i, o)
        }
    }, {
        "./shared/getEventType": 52,
        "./utils/removeEventListener": 55
    }],
    52: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-prefixer/getEventType");
        t.exports = function(e, t) {
            var i, n;
            return i = "tagName" in e ? e.tagName : e === window ? "window" : "document", n = r(t, i), n ? n : t
        }
    }, {
        "@marcom/ac-prefixer/getEventType": 191
    }],
    53: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return e = e || window.event, "undefined" != typeof e.target ? e.target : e.srcElement
        }
    }, {}],
    54: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t, i, r) {
            return e.addEventListener ? e.addEventListener(t, i, !!r) : e.attachEvent("on" + t, i), e
        }
    }, {}],
    55: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t, i, r) {
            return e.removeEventListener ? e.removeEventListener(t, i, !!r) : e.detachEvent("on" + t, i), e
        }
    }, {}],
    56: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t) {
            var i;
            return t ? (i = e.getBoundingClientRect(), {
                width: i.width,
                height: i.height
            }) : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
    }, {}],
    57: [function(e, t, i) {
        "use strict";
        var r = e("./getDimensions"),
            n = e("./getScrollX"),
            o = e("./getScrollY");
        t.exports = function(e, t) {
            var i, s, a, l;
            if (t) return i = e.getBoundingClientRect(), s = n(), a = o(), {
                top: i.top + a,
                right: i.right + s,
                bottom: i.bottom + a,
                left: i.left + s
            };
            for (l = r(e, t), i = {
                    top: e.offsetTop,
                    left: e.offsetLeft,
                    width: l.width,
                    height: l.height
                }; e = e.offsetParent;) i.top += e.offsetTop, i.left += e.offsetLeft;
            return {
                top: i.top,
                right: i.left + i.width,
                bottom: i.top + i.height,
                left: i.left
            }
        }
    }, {
        "./getDimensions": 56,
        "./getScrollX": 60,
        "./getScrollY": 61
    }],
    58: [function(e, t, i) {
        "use strict";
        var r = e("./getDimensions"),
            n = e("./getPixelsInViewport");
        t.exports = function(e, t) {
            var i = n(e, t),
                o = r(e, t).height;
            return i / o
        }
    }, {
        "./getDimensions": 56,
        "./getPixelsInViewport": 59
    }],
    59: [function(e, t, i) {
        "use strict";
        var r = e("./getViewportPosition");
        t.exports = function(e, t) {
            var i, n = window.innerHeight,
                o = r(e, t);
            return o.top >= n || o.bottom <= 0 ? 0 : (i = o.bottom - o.top, o.top < 0 && (i += o.top), o.bottom > n && (i -= o.bottom - n), i)
        }
    }, {
        "./getViewportPosition": 62
    }],
    60: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return e = e || window, e === window ? window.scrollX || window.pageXOffset : e.scrollLeft
        }
    }, {}],
    61: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return e = e || window, e === window ? window.scrollY || window.pageYOffset : e.scrollTop
        }
    }, {}],
    62: [function(e, t, i) {
        "use strict";
        var r = e("./getPagePosition"),
            n = e("./getScrollX"),
            o = e("./getScrollY");
        t.exports = function(e, t) {
            var i, s, a;
            return t ? (i = e.getBoundingClientRect(), {
                top: i.top,
                right: i.right,
                bottom: i.bottom,
                left: i.left
            }) : (i = r(e), s = n(), a = o(), {
                top: i.top - a,
                right: i.right - s,
                bottom: i.bottom - a,
                left: i.left - s
            })
        }
    }, {
        "./getPagePosition": 57,
        "./getScrollX": 60,
        "./getScrollY": 61
    }],
    63: [function(e, t, i) {
        "use strict";
        var r = e("./getPixelsInViewport"),
            n = e("./getPercentInViewport");
        t.exports = function(e, t, i) {
            var o;
            return i = i || 0, "string" == typeof i && "px" === i.slice(-2) ? (i = parseInt(i, 10), o = r(e, t)) : o = n(e, t), o > 0 && o >= i
        }
    }, {
        "./getPercentInViewport": 58,
        "./getPixelsInViewport": 59
    }],
    64: [function(e, t, i) {
        "use strict";
        t.exports = 8
    }, {}],
    65: [function(e, t, i) {
        "use strict";
        t.exports = 11
    }, {}],
    66: [function(e, t, i) {
        "use strict";
        t.exports = 9
    }, {}],
    67: [function(e, t, i) {
        "use strict";
        t.exports = 1
    }, {}],
    68: [function(e, t, i) {
        "use strict";
        t.exports = 3
    }, {}],
    69: [function(e, t, i) {
        "use strict";
        var r = e("../isNode");
        t.exports = function(e, t) {
            return !!r(e) && ("number" == typeof t ? e.nodeType === t : t.indexOf(e.nodeType) !== -1)
        }
    }, {
        "../isNode": 73
    }],
    70: [function(e, t, i) {
        "use strict";
        var r = e("./isNodeType"),
            n = e("../COMMENT_NODE"),
            o = e("../DOCUMENT_FRAGMENT_NODE"),
            s = e("../ELEMENT_NODE"),
            a = e("../TEXT_NODE"),
            l = [s, a, n, o],
            c = " must be an Element, TextNode, Comment, or Document Fragment",
            u = [s, a, n],
            h = " must be an Element, TextNode, or Comment",
            m = [s, o],
            p = " must be an Element, or Document Fragment",
            d = " must have a parentNode";
        t.exports = {
            parentNode: function(e, t, i, n) {
                if (n = n || "target", (e || t) && !r(e, m)) throw new TypeError(i + ": " + n + p)
            },
            childNode: function(e, t, i, n) {
                if (n = n || "target", (e || t) && !r(e, u)) throw new TypeError(i + ": " + n + h)
            },
            insertNode: function(e, t, i, n) {
                if (n = n || "node", (e || t) && !r(e, l)) throw new TypeError(i + ": " + n + c)
            },
            hasParentNode: function(e, t, i) {
                if (i = i || "target", !e.parentNode) throw new TypeError(t + ": " + i + d)
            }
        }
    }, {
        "../COMMENT_NODE": 64,
        "../DOCUMENT_FRAGMENT_NODE": 65,
        "../ELEMENT_NODE": 67,
        "../TEXT_NODE": 68,
        "./isNodeType": 69
    }],
    71: [function(e, t, i) {
        "use strict";
        var r = e("./internal/isNodeType"),
            n = e("./DOCUMENT_FRAGMENT_NODE");
        t.exports = function(e) {
            return r(e, n)
        }
    }, {
        "./DOCUMENT_FRAGMENT_NODE": 65,
        "./internal/isNodeType": 69
    }],
    72: [function(e, t, i) {
        "use strict";
        var r = e("./internal/isNodeType"),
            n = e("./ELEMENT_NODE");
        t.exports = function(e) {
            return r(e, n)
        }
    }, {
        "./ELEMENT_NODE": 67,
        "./internal/isNodeType": 69
    }],
    73: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return !(!e || !e.nodeType)
        }
    }, {}],
    74: [function(e, t, i) {
        "use strict";
        var r = e("./internal/validate");
        t.exports = function(e) {
            return r.childNode(e, !0, "remove"), e.parentNode ? e.parentNode.removeChild(e) : e
        }
    }, {
        "./internal/validate": 70
    }],
    75: [function(e, t, i) {
        "use strict";
        t.exports = {
            getStyle: e("./getStyle"),
            setStyle: e("./setStyle")
        }
    }, {
        "./getStyle": 76,
        "./setStyle": 78
    }],
    76: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-prefixer/getStyleProperty"),
            n = e("@marcom/ac-prefixer/stripPrefixes");
        t.exports = function() {
            var e, t, i, o, s = Array.prototype.slice.call(arguments),
                a = s.shift(s),
                l = window.getComputedStyle(a),
                c = {};
            for ("string" != typeof s[0] && (s = s[0]), o = 0; o < s.length; o++) e = s[o], t = r(e), t ? (e = n(t), i = l[t], i && "auto" !== i || (i = null), i && (i = n(i))) : i = null, c[e] = i;
            return c
        }
    }, {
        "@marcom/ac-prefixer/getStyleProperty": 193,
        "@marcom/ac-prefixer/stripPrefixes": 201
    }],
    77: [function(e, t, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.exports = function(e) {
            var t, i, n;
            if (!e && 0 !== e) return "";
            if (Array.isArray(e)) return e + "";
            if ("object" === ("undefined" == typeof e ? "undefined" : r(e))) {
                for (t = "", i = Object.keys(e), n = 0; n < i.length; n++) t += i[n] + "(" + e[i[n]] + ") ";
                return t.trim()
            }
            return e
        }
    }, {}],
    78: [function(e, t, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            n = e("@marcom/ac-prefixer/getStyleCSS"),
            o = e("@marcom/ac-prefixer/getStyleProperty"),
            s = e("./internal/normalizeValue");
        t.exports = function(e, t) {
            var i, a, l, c, u, h = "";
            if ("object" !== ("undefined" == typeof t ? "undefined" : r(t))) throw new TypeError("setStyle: styles must be an Object");
            for (a in t) c = s(t[a]), c || 0 === c ? (i = n(a, c), i !== !1 && (h += " " + i)) : (l = o(a), "removeAttribute" in e.style ? e.style.removeAttribute(l) : e.style[l] = "");
            return h.length && (u = e.style.cssText, ";" !== u.charAt(u.length - 1) && (u += ";"), u += h, e.style.cssText = u), e
        }
    }, {
        "./internal/normalizeValue": 77,
        "@marcom/ac-prefixer/getStyleCSS": 192,
        "@marcom/ac-prefixer/getStyleProperty": 193
    }],
    79: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-dom-nodes/isElement"),
            n = e("./matchesSelector"),
            o = e("./internal/validate");
        t.exports = function(e, t, i, s) {
            var a = [];
            if (o.childNode(e, !0, "ancestors"), o.selector(t, !1, "ancestors"), i && r(e) && (!t || n(e, t)) && a.push(e), s = s || document.body, e !== s)
                for (;
                    (e = e.parentNode) && r(e) && (t && !n(e, t) || a.push(e), e !== s););
            return a
        }
    }, {
        "./internal/validate": 81,
        "./matchesSelector": 82,
        "@marcom/ac-dom-nodes/isElement": 72
    }],
    80: [function(e, t, i) {
        "use strict";
        t.exports = window.Element ? function(e) {
            return e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector
        }(Element.prototype) : null
    }, {}],
    81: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Array/prototype.indexOf");
        var r = e("@marcom/ac-dom-nodes/isNode"),
            n = e("@marcom/ac-dom-nodes/COMMENT_NODE"),
            o = e("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE"),
            s = e("@marcom/ac-dom-nodes/DOCUMENT_NODE"),
            a = e("@marcom/ac-dom-nodes/ELEMENT_NODE"),
            l = e("@marcom/ac-dom-nodes/TEXT_NODE"),
            c = function(e, t) {
                return !!r(e) && ("number" == typeof t ? e.nodeType === t : t.indexOf(e.nodeType) !== -1)
            },
            u = [a, s, o],
            h = " must be an Element, Document, or Document Fragment",
            m = [a, l, n],
            p = " must be an Element, TextNode, or Comment",
            d = " must be a string";
        t.exports = {
            parentNode: function(e, t, i, r) {
                if (r = r || "node", (e || t) && !c(e, u)) throw new TypeError(i + ": " + r + h)
            },
            childNode: function(e, t, i, r) {
                if (r = r || "node", (e || t) && !c(e, m)) throw new TypeError(i + ": " + r + p)
            },
            selector: function(e, t, i, r) {
                if (r = r || "selector", (e || t) && "string" != typeof e) throw new TypeError(i + ": " + r + d)
            }
        }
    }, {
        "@marcom/ac-dom-nodes/COMMENT_NODE": 64,
        "@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE": 65,
        "@marcom/ac-dom-nodes/DOCUMENT_NODE": 66,
        "@marcom/ac-dom-nodes/ELEMENT_NODE": 67,
        "@marcom/ac-dom-nodes/TEXT_NODE": 68,
        "@marcom/ac-dom-nodes/isNode": 73,
        "@marcom/ac-polyfills/Array/prototype.indexOf": void 0
    }],
    82: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-dom-nodes/isElement"),
            n = e("./internal/validate"),
            o = e("./internal/nativeMatches"),
            s = e("./shims/matchesSelector");
        t.exports = function(e, t) {
            return n.selector(t, !0, "matchesSelector"), !!r(e) && (o ? o.call(e, t) : s(e, t))
        }
    }, {
        "./internal/nativeMatches": 80,
        "./internal/validate": 81,
        "./shims/matchesSelector": 84,
        "@marcom/ac-dom-nodes/isElement": 72
    }],
    83: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Array/prototype.slice");
        var r = e("./internal/validate"),
            n = e("./shims/querySelectorAll"),
            o = "querySelectorAll" in document;
        t.exports = function(e, t) {
            return t = t || document, r.parentNode(t, !0, "querySelectorAll", "context"), r.selector(e, !0, "querySelectorAll"), o ? Array.prototype.slice.call(t.querySelectorAll(e)) : n(e, t)
        }
    }, {
        "./internal/validate": 81,
        "./shims/querySelectorAll": 85,
        "@marcom/ac-polyfills/Array/prototype.slice": void 0
    }],
    84: [function(e, t, i) {
        "use strict";
        var r = e("../querySelectorAll");
        t.exports = function(e, t) {
            var i, n = e.parentNode || document,
                o = r(t, n);
            for (i = 0; i < o.length; i++)
                if (o[i] === e) return !0;
            return !1
        }
    }, {
        "../querySelectorAll": 83
    }],
    85: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Array/prototype.indexOf");
        var r = e("@marcom/ac-dom-nodes/isElement"),
            n = e("@marcom/ac-dom-nodes/isDocumentFragment"),
            o = e("@marcom/ac-dom-nodes/remove"),
            s = "_ac_qsa_",
            a = function(e, t) {
                var i;
                if (t === document) return !0;
                for (i = e;
                    (i = i.parentNode) && r(i);)
                    if (i === t) return !0;
                return !1
            },
            l = function(e) {
                "recalc" in e ? e.recalc(!1) : document.recalc(!1), window.scrollBy(0, 0)
            };
        t.exports = function(e, t) {
            var i, r = document.createElement("style"),
                c = s + (Math.random() + "").slice(-6),
                u = [];
            for (t = t || document, document[c] = [], n(t) ? t.appendChild(r) : document.documentElement.firstChild.appendChild(r), r.styleSheet.cssText = "*{display:recalc;}" + e + '{ac-qsa:expression(document["' + c + '"] && document["' + c + '"].push(this));}', l(t); document[c].length;) i = document[c].shift(), i.style.removeAttribute("ac-qsa"), u.indexOf(i) === -1 && a(i, t) && u.push(i);
            return document[c] = null, o(r), l(t), u
        }
    }, {
        "@marcom/ac-dom-nodes/isDocumentFragment": 71,
        "@marcom/ac-dom-nodes/isElement": 72,
        "@marcom/ac-dom-nodes/remove": 74,
        "@marcom/ac-polyfills/Array/prototype.indexOf": void 0
    }],
    86: [function(e, t, i) {
        "use strict";
        t.exports = {
            createBezier: e("./ac-easing/createBezier"),
            createPredefined: e("./ac-easing/createPredefined"),
            createStep: e("./ac-easing/createStep"),
            Ease: e("./ac-easing/Ease")
        }
    }, {
        "./ac-easing/Ease": 87,
        "./ac-easing/createBezier": 88,
        "./ac-easing/createPredefined": 89,
        "./ac-easing/createStep": 90
    }],
    87: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if ("function" != typeof e) throw new TypeError(n);
            this.easingFunction = e, this.cssString = t || null
        }
        var n = "Ease expects an easing function.",
            o = r.prototype;
        o.getValue = function(e) {
            return this.easingFunction(e, 0, 1, 1)
        }, t.exports = r
    }, {}],
    88: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Array/prototype.every");
        var r = e("./Ease"),
            n = e("./helpers/KeySpline"),
            o = "Bezier curve expects exactly four (4) numbers. Given: ";
        t.exports = function(e, t, i, s) {
            var a = Array.prototype.slice.call(arguments),
                l = a.every(function(e) {
                    return "number" == typeof e
                });
            if (4 !== a.length || !l) throw new TypeError(o + a);
            var c = new n(e, t, i, s),
                u = function(e, t, i, r) {
                    return c.get(e / r) * i + t
                },
                h = "cubic-bezier(" + a.join(", ") + ")";
            return new r(u, h)
        }
    }, {
        "./Ease": 87,
        "./helpers/KeySpline": 91,
        "@marcom/ac-polyfills/Array/prototype.every": void 0
    }],
    89: [function(e, t, i) {
        "use strict";
        var r = e("./createStep"),
            n = e("./helpers/cssAliases"),
            o = e("./helpers/easingFunctions"),
            s = e("./Ease"),
            a = 'Easing function "%TYPE%" not recognized among the following: ' + Object.keys(o).join(", ");
        t.exports = function(e) {
            var t;
            if ("step-start" === e) return r(1, "start");
            if ("step-end" === e) return r(1, "end");
            if (t = o[e], !t) throw new Error(a.replace("%TYPE%", e));
            return new s(t, n[e])
        }
    }, {
        "./Ease": 87,
        "./createStep": 90,
        "./helpers/cssAliases": 92,
        "./helpers/easingFunctions": 93
    }],
    90: [function(e, t, i) {
        "use strict";
        var r = e("./Ease"),
            n = "Step function expects a numeric value greater than zero. Given: ",
            o = 'Step function direction must be either "start" or "end" (default). Given: ';
        t.exports = function(e, t) {
            if (t = t || "end", "number" != typeof e || e < 1) throw new TypeError(n + e);
            if ("start" !== t && "end" !== t) throw new TypeError(o + t);
            var i = function(i, r, n, o) {
                    var s = n / e,
                        a = Math["start" === t ? "floor" : "ceil"](i / o * e);
                    return r + s * a
                },
                s = "steps(" + e + ", " + t + ")";
            return new r(i, s)
        }
    }, {
        "./Ease": 87
    }],
    91: [function(e, t, i) {
        "use strict";

        function r(e, t, i, r) {
            function n(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function o(e, t) {
                return 3 * t - 6 * e
            }

            function s(e) {
                return 3 * e
            }

            function a(e, t, i) {
                return ((n(t, i) * e + o(t, i)) * e + s(t)) * e
            }

            function l(e, t, i) {
                return 3 * n(t, i) * e * e + 2 * o(t, i) * e + s(t)
            }

            function c(t) {
                for (var r = t, n = 0; n < 4; ++n) {
                    var o = l(r, e, i);
                    if (0 === o) return r;
                    var s = a(r, e, i) - t;
                    r -= s / o
                }
                return r
            }
            this.get = function(n) {
                return e === t && i === r ? n : a(c(n), t, r)
            }
        }
        t.exports = r
    }, {}],
    92: [function(e, t, i) {
        "use strict";
        var r = {
            linear: "cubic-bezier(0, 0, 1, 1)",
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
            "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
            "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
            "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
            "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
            "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
            "ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
            "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
            "ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
            "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
            "ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
            "ease-in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
            "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
            "ease-in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
            "ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
            "ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
            "ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
            "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
            "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
            "ease-in-out-expo": "cubic-bezier(1, 0, 0, 1)",
            "ease-in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
            "ease-out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
            "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
            "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        };
        r.easeIn = r["ease-in"], r.easeOut = r["ease-out"], r.easeInOut = r["ease-in-out"], r.easeInCubic = r["ease-in-cubic"], r.easeOutCubic = r["ease-out-cubic"], r.easeInOutCubic = r["ease-in-out-cubic"], r.easeInQuad = r["ease-in-quad"], r.easeOutQuad = r["ease-out-quad"], r.easeInOutQuad = r["ease-in-out-quad"], r.easeInQuart = r["ease-in-quart"], r.easeOutQuart = r["ease-out-quart"], r.easeInOutQuart = r["ease-in-out-quart"], r.easeInQuint = r["ease-in-quint"], r.easeOutQuint = r["ease-out-quint"], r.easeInOutQuint = r["ease-in-out-quint"], r.easeInSine = r["ease-in-sine"], r.easeOutSine = r["ease-out-sine"], r.easeInOutSine = r["ease-in-out-sine"], r.easeInExpo = r["ease-in-expo"], r.easeOutExpo = r["ease-out-expo"], r.easeInOutExpo = r["ease-in-out-expo"], r.easeInCirc = r["ease-in-circ"], r.easeOutCirc = r["ease-out-circ"], r.easeInOutCirc = r["ease-in-out-circ"], r.easeInBack = r["ease-in-back"], r.easeOutBack = r["ease-out-back"], r.easeInOutBack = r["ease-in-out-back"], t.exports = r
    }, {}],
    93: [function(e, t, i) {
        "use strict";
        var r = e("../createBezier"),
            n = r(.25, .1, .25, 1).easingFunction,
            o = r(.42, 0, 1, 1).easingFunction,
            s = r(0, 0, .58, 1).easingFunction,
            a = r(.42, 0, .58, 1).easingFunction,
            l = function(e, t, i, r) {
                return i * e / r + t
            },
            c = function(e, t, i, r) {
                return i * (e /= r) * e + t
            },
            u = function(e, t, i, r) {
                return -i * (e /= r) * (e - 2) + t
            },
            h = function(e, t, i, r) {
                return (e /= r / 2) < 1 ? i / 2 * e * e + t : -i / 2 * (--e * (e - 2) - 1) + t
            },
            m = function(e, t, i, r) {
                return i * (e /= r) * e * e + t
            },
            p = function(e, t, i, r) {
                return i * ((e = e / r - 1) * e * e + 1) + t
            },
            d = function(e, t, i, r) {
                return (e /= r / 2) < 1 ? i / 2 * e * e * e + t : i / 2 * ((e -= 2) * e * e + 2) + t
            },
            f = function(e, t, i, r) {
                return i * (e /= r) * e * e * e + t
            },
            y = function(e, t, i, r) {
                return -i * ((e = e / r - 1) * e * e * e - 1) + t
            },
            _ = function(e, t, i, r) {
                return (e /= r / 2) < 1 ? i / 2 * e * e * e * e + t : -i / 2 * ((e -= 2) * e * e * e - 2) + t
            },
            g = function(e, t, i, r) {
                return i * (e /= r) * e * e * e * e + t
            },
            v = function(e, t, i, r) {
                return i * ((e = e / r - 1) * e * e * e * e + 1) + t
            },
            b = function(e, t, i, r) {
                return (e /= r / 2) < 1 ? i / 2 * e * e * e * e * e + t : i / 2 * ((e -= 2) * e * e * e * e + 2) + t
            },
            E = function(e, t, i, r) {
                return -i * Math.cos(e / r * (Math.PI / 2)) + i + t
            },
            w = function(e, t, i, r) {
                return i * Math.sin(e / r * (Math.PI / 2)) + t
            },
            S = function(e, t, i, r) {
                return -i / 2 * (Math.cos(Math.PI * e / r) - 1) + t
            },
            T = function(e, t, i, r) {
                return 0 === e ? t : i * Math.pow(2, 10 * (e / r - 1)) + t
            },
            C = function(e, t, i, r) {
                return e === r ? t + i : i * (-Math.pow(2, -10 * e / r) + 1) + t
            },
            P = function(e, t, i, r) {
                return 0 === e ? t : e === r ? t + i : (e /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + t : i / 2 * (-Math.pow(2, -10 * --e) + 2) + t
            },
            O = function(e, t, i, r) {
                return -i * (Math.sqrt(1 - (e /= r) * e) - 1) + t
            },
            x = function(e, t, i, r) {
                return i * Math.sqrt(1 - (e = e / r - 1) * e) + t
            },
            A = function(e, t, i, r) {
                return (e /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - e * e) - 1) + t : i / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
            },
            k = function(e, t, i, r) {
                var n = 1.70158,
                    o = 0,
                    s = i;
                return 0 === e ? t : 1 === (e /= r) ? t + i : (o || (o = .3 * r), s < Math.abs(i) ? (s = i, n = o / 4) : n = o / (2 * Math.PI) * Math.asin(i / s), -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - n) * (2 * Math.PI) / o)) + t)
            },
            I = function(e, t, i, r) {
                var n = 1.70158,
                    o = 0,
                    s = i;
                return 0 === e ? t : 1 === (e /= r) ? t + i : (o || (o = .3 * r), s < Math.abs(i) ? (s = i, n = o / 4) : n = o / (2 * Math.PI) * Math.asin(i / s), s * Math.pow(2, -10 * e) * Math.sin((e * r - n) * (2 * Math.PI) / o) + i + t)
            },
            M = function(e, t, i, r) {
                var n = 1.70158,
                    o = 0,
                    s = i;
                return 0 === e ? t : 2 === (e /= r / 2) ? t + i : (o || (o = r * (.3 * 1.5)), s < Math.abs(i) ? (s = i, n = o / 4) : n = o / (2 * Math.PI) * Math.asin(i / s), e < 1 ? -.5 * (s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - n) * (2 * Math.PI) / o)) + t : s * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * r - n) * (2 * Math.PI) / o) * .5 + i + t)
            },
            D = function(e, t, i, r, n) {
                return void 0 === n && (n = 1.70158), i * (e /= r) * e * ((n + 1) * e - n) + t
            },
            R = function(e, t, i, r, n) {
                return void 0 === n && (n = 1.70158), i * ((e = e / r - 1) * e * ((n + 1) * e + n) + 1) + t
            },
            F = function(e, t, i, r, n) {
                return void 0 === n && (n = 1.70158), (e /= r / 2) < 1 ? i / 2 * (e * e * (((n *= 1.525) + 1) * e - n)) + t : i / 2 * ((e -= 2) * e * (((n *= 1.525) + 1) * e + n) + 2) + t
            },
            L = function(e, t, i, r) {
                return (e /= r) < 1 / 2.75 ? i * (7.5625 * e * e) + t : e < 2 / 2.75 ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
            },
            N = function(e, t, i, r) {
                return i - L(r - e, 0, i, r) + t
            },
            j = function(e, t, i, r) {
                return e < r / 2 ? .5 * N(2 * e, 0, i, r) + t : .5 * L(2 * e - r, 0, i, r) + .5 * i + t
            };
        t.exports = {
            linear: l,
            ease: n,
            easeIn: o,
            "ease-in": o,
            easeOut: s,
            "ease-out": s,
            easeInOut: a,
            "ease-in-out": a,
            easeInCubic: m,
            "ease-in-cubic": m,
            easeOutCubic: p,
            "ease-out-cubic": p,
            easeInOutCubic: d,
            "ease-in-out-cubic": d,
            easeInQuad: c,
            "ease-in-quad": c,
            easeOutQuad: u,
            "ease-out-quad": u,
            easeInOutQuad: h,
            "ease-in-out-quad": h,
            easeInQuart: f,
            "ease-in-quart": f,
            easeOutQuart: y,
            "ease-out-quart": y,
            easeInOutQuart: _,
            "ease-in-out-quart": _,
            easeInQuint: g,
            "ease-in-quint": g,
            easeOutQuint: v,
            "ease-out-quint": v,
            easeInOutQuint: b,
            "ease-in-out-quint": b,
            easeInSine: E,
            "ease-in-sine": E,
            easeOutSine: w,
            "ease-out-sine": w,
            easeInOutSine: S,
            "ease-in-out-sine": S,
            easeInExpo: T,
            "ease-in-expo": T,
            easeOutExpo: C,
            "ease-out-expo": C,
            easeInOutExpo: P,
            "ease-in-out-expo": P,
            easeInCirc: O,
            "ease-in-circ": O,
            easeOutCirc: x,
            "ease-out-circ": x,
            easeInOutCirc: A,
            "ease-in-out-circ": A,
            easeInBack: D,
            "ease-in-back": D,
            easeOutBack: R,
            "ease-out-back": R,
            easeInOutBack: F,
            "ease-in-out-back": F,
            easeInElastic: k,
            "ease-in-elastic": k,
            easeOutElastic: I,
            "ease-out-elastic": I,
            easeInOutElastic: M,
            "ease-in-out-elastic": M,
            easeInBounce: N,
            "ease-in-bounce": N,
            easeOutBounce: L,
            "ease-out-bounce": L,
            easeInOutBounce: j,
            "ease-in-out-bounce": j
        }
    }, {
        "../createBezier": 88
    }],
    94: [function(e, t, i) {
        "use strict";
        var r = e("./utils/getBoundingClientRect");
        t.exports = function(e, t) {
            var i;
            return t ? (i = r(e), {
                width: i.width,
                height: i.height
            }) : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
    }, {
        "./utils/getBoundingClientRect": 95
    }],
    95: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = e.getBoundingClientRect();
            return {
                top: t.top,
                right: t.right,
                bottom: t.bottom,
                left: t.left,
                width: t.width || t.right - t.left,
                height: t.height || t.bottom - t.top
            }
        }
    }, {}],
    96: [function(e, t, i) {
        "use strict";

        function r(e, t, i, r) {
            return e.nodeType ? void 0 === n || r && r.inlineStyles ? new a(e, t, i, r) : new l(e, t, i, r) : new s(e, t, i, r)
        }
        e("./helpers/Float32Array");
        var n = e("./helpers/transitionEnd"),
            o = e("@marcom/ac-clip").Clip,
            s = e("./clips/ClipEasing"),
            a = e("./clips/ClipInlineCss"),
            l = e("./clips/ClipTransitionCss");
        for (var c in o) "function" == typeof o[c] && "_" !== c.substr(0, 1) && (r[c] = o[c].bind(o));
        r.to = function(e, t, i, n) {
            return n = n || {}, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(e, t, i, n).play()
        }, r.from = function(e, t, i, n) {
            return n = n || {}, n.propsFrom = i, void 0 === n.destroyOnComplete && (n.destroyOnComplete = !0), new r(e, t, n.propsTo, n).play()
        }, t.exports = r
    }, {
        "./clips/ClipEasing": 99,
        "./clips/ClipInlineCss": 100,
        "./clips/ClipTransitionCss": 101,
        "./helpers/Float32Array": 104,
        "./helpers/transitionEnd": 113,
        "@marcom/ac-clip": 20
    }],
    97: [function(e, t, i) {
        "use strict";
        t.exports = e("./timeline/Timeline")
    }, {
        "./timeline/Timeline": 115
    }],
    98: [function(e, t, i) {
        "use strict";
        t.exports = {
            Clip: e("./Clip"),
            Timeline: e("./Timeline")
        }
    }, {
        "./Clip": 96,
        "./Timeline": 97
    }],
    99: [function(e, t, i) {
        "use strict";

        function r(e, t, i, r) {
            r && a(r.ease) && (r.ease = l.create(r.ease).toEasingFunction()), r = r || {}, this._propsEase = r.propsEase || {}, c.call(this, e, t, i, r)
        }
        var n = e("@marcom/ac-object/clone"),
            o = e("@marcom/ac-object/create"),
            s = e("@marcom/ac-easing").createPredefined,
            a = e("../helpers/isCssCubicBezierString"),
            l = e("../helpers/BezierCurveCssManager"),
            c = e("@marcom/ac-clip").Clip,
            u = e("@marcom/ac-easing").Ease,
            h = c.prototype,
            m = r.prototype = o(h);
        m.reset = function() {
            var e = h.reset.call(this);
            if (this._clips)
                for (var t = this._clips.length; t--;) this._clips[t].reset();
            return e
        }, m.destroy = function() {
            if (this._clips) {
                for (var e = this._clips.length; e--;) this._clips[e].destroy();
                this._clips = null
            }
            return this._eases = null, this._storeOnUpdate = null, h.destroy.call(this)
        }, m._prepareProperties = function() {
            var e, t, i = 0,
                r = {},
                o = {},
                m = {};
            if (this._propsEase) {
                for (e in this._propsTo) this._propsTo.hasOwnProperty(e) && (t = this._propsEase[e], a(t) && (t = l.create(t).toEasingFunction()), void 0 === t ? (void 0 === r[this._ease] && (r[this._ease] = {}, o[this._ease] = {}, m[this._ease] = this._ease.easingFunction, i++), r[this._ease][e] = this._propsTo[e], o[this._ease][e] = this._propsFrom[e]) : "function" == typeof t ? (r[i] = {}, o[i] = {}, r[i][e] = this._propsTo[e], o[i][e] = this._propsFrom[e], m[i] = t, i++) : (void 0 === r[t] && (r[t] = {}, o[t] = {}, m[t] = t, i++), r[t][e] = this._propsTo[e], o[t][e] = this._propsFrom[e]));
                if (i > 1) {
                    var p = n(this._options || {}, !0),
                        d = .001 * this._duration;
                    this._storeOnUpdate = this._onUpdate, this._onUpdate = this._onUpdateClips, p.onStart = null, p.onUpdate = null, p.onDraw = null, p.onComplete = null, this._clips = [];
                    for (t in r) r.hasOwnProperty(t) && (p.ease = m[t], p.propsFrom = o[t], this._clips.push(new c(this._target, d, r[t], p)));
                    t = "linear", this._propsTo = {}, this._propsFrom = {}
                } else
                    for (e in m) m.hasOwnProperty(e) && (t = m[e]);
                void 0 !== t && (this._ease = "function" == typeof t ? new u(t) : s(t))
            }
            return h._prepareProperties.call(this)
        }, m._onUpdateClips = function(e) {
            for (var t = 1 === this._direction ? e.progress() : 1 - e.progress(), i = this._clips.length; i--;) this._clips[i].progress(t);
            "function" == typeof this._storeOnUpdate && this._storeOnUpdate.call(this, this)
        }, t.exports = r;
    }, {
        "../helpers/BezierCurveCssManager": 103,
        "../helpers/isCssCubicBezierString": 109,
        "@marcom/ac-clip": 20,
        "@marcom/ac-easing": 86,
        "@marcom/ac-object/clone": 183,
        "@marcom/ac-object/create": 184
    }],
    100: [function(e, t, i) {
        "use strict";

        function r(e, t, i, r) {
            r = r || {}, this._el = e, this._storeOnStart = r.onStart || null, this._storeOnDraw = r.onDraw || null, this._storeOnComplete = r.onComplete || null, r.onStart = this._onStart, r.onDraw = this._onDraw, r.onComplete = this._onComplete, u.call(this, {}, t, i, r)
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = e("@marcom/ac-dom-styles/setStyle"),
            s = e("../helpers/convertToStyleObject"),
            a = e("../helpers/convertToTransitionableObjects"),
            l = e("@marcom/ac-object/create"),
            c = e("../helpers/removeTransitions"),
            u = e("./ClipEasing"),
            h = u.prototype,
            m = r.prototype = l(h);
        m.play = function() {
            var e = h.play.call(this);
            return 0 !== this._remainingDelay && o(this._el, s(this._target)), e
        }, m.reset = function() {
            var e = h.reset.call(this);
            return o(this._el, s(this._target)), e
        }, m.destroy = function() {
            return this._el = null, this._completeStyles = null, this._storeOnStart = null, this._storeOnDraw = null, this._storeOnComplete = null, h.destroy.call(this)
        }, m.target = function() {
            return this._el
        }, m._prepareProperties = function() {
            var e = a(this._el, this._propsTo, this._propsFrom);
            this._target = e.target, this._propsFrom = e.propsFrom, this._propsTo = e.propsTo, c(this._el, this._target);
            var t = this._isYoyo ? this._propsFrom : this._propsTo;
            if (this._completeStyles = s(t), void 0 !== this._options.removeStylesOnComplete) {
                var i, r = this._options.removeStylesOnComplete;
                if ("boolean" == typeof r && r)
                    for (i in this._completeStyles) this._completeStyles.hasOwnProperty(i) && (this._completeStyles[i] = null);
                else if ("object" === ("undefined" == typeof r ? "undefined" : n(r)) && r.length)
                    for (var o = r.length; o--;) i = r[o], this._completeStyles.hasOwnProperty(i) && (this._completeStyles[i] = null)
            }
            return h._prepareProperties.call(this)
        }, m._onStart = function(e) {
            this.playing() && 1 === this._direction && 0 === this._delay && o(this._el, s(this._propsFrom)), "function" == typeof this._storeOnStart && this._storeOnStart.call(this, this)
        }, m._onDraw = function(e) {
            o(this._el, s(this._target)), "function" == typeof this._storeOnDraw && this._storeOnDraw.call(this, this)
        }, m._onComplete = function(e) {
            o(this._el, this._completeStyles), "function" == typeof this._storeOnComplete && this._storeOnComplete.call(this, this)
        }, t.exports = r
    }, {
        "../helpers/convertToStyleObject": 106,
        "../helpers/convertToTransitionableObjects": 107,
        "../helpers/removeTransitions": 110,
        "./ClipEasing": 99,
        "@marcom/ac-dom-styles/setStyle": 78,
        "@marcom/ac-object/create": 184
    }],
    101: [function(e, t, i) {
        "use strict";

        function r(e, t, i, r) {
            if (r = r || {}, this._el = e, this._storeEase = r.ease, "function" == typeof this._storeEase) throw new Error(w);
            this._storeOnStart = r.onStart || null, this._storeOnComplete = r.onComplete || null, r.onStart = this._onStart.bind(this), r.onComplete = this._onComplete.bind(this), this._stylesTo = c(i, !0), this._stylesFrom = r.propsFrom ? c(r.propsFrom, !0) : {}, this._propsEase = r.propsEase ? c(r.propsEase, !0) : {}, m(r.ease) && (r.ease = y.create(r.ease).toEasingFunction()), _.call(this, {}, t, {}, r), this._propsFrom = {}
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = e("@marcom/ac-dom-styles/setStyle"),
            s = e("@marcom/ac-dom-styles/getStyle"),
            a = e("../helpers/convertToStyleObject"),
            l = e("../helpers/convertToTransitionableObjects"),
            c = e("@marcom/ac-object/clone"),
            u = e("@marcom/ac-object/create"),
            h = e("@marcom/ac-easing").createPredefined,
            m = e("../helpers/isCssCubicBezierString"),
            p = e("../helpers/removeTransitions"),
            d = e("../helpers/transitionEnd"),
            f = e("../helpers/waitAnimationFrames"),
            y = e("../helpers/BezierCurveCssManager"),
            _ = e("@marcom/ac-clip").Clip,
            g = e("./ClipEasing"),
            v = e("@marcom/ac-page-visibility").PageVisibilityManager,
            b = "ease",
            E = "%EASE% is not a supported predefined ease when transitioning with Elements and CSS transition. If you need to use %EASE% then pass the inlineStyle:true option.",
            w = "Function eases are not supported when using CSS transitions with Elements. Either use a cubic-bezier string (e.g. 'cubic-bezier(0, 0, 1, 1)' or pass the inlineStyle option as `true` to render styles each frame instead of using CSS transitions.",
            S = _.prototype,
            T = r.prototype = u(S);
        T.play = function() {
            var e = S.play.call(this);
            return 1 === this._direction && 0 === this.progress() && 0 !== this._remainingDelay && this._applyStyles(0, a(this._stylesFrom)), e
        }, T.reset = function() {
            var e = S.reset.call(this);
            return this._stylesClip.reset(), this._applyStyles(0, a(this._styles)), e
        }, T.destroy = function() {
            return v.off("changed", this._onVisibilityChanged), this._removeTransitionListener(), this.off("pause", this._onPaused), this._onPaused(), this._stylesClip.destroy(), this._stylesClip = null, this._el = null, this._propsArray = null, this._styles = null, this._stylesFrom = null, this._stylesTo = null, this._completeStyles = null, this._storeOnStart = null, this._storeOnComplete = null, this._onTransitionEnded = null, S.destroy.call(this)
        }, T.target = function() {
            return this._el
        }, T.duration = function(e) {
            var t = S.duration.call(this, e);
            return void 0 === e ? t : (this.playing() && this.progress(this._progress), t)
        }, T.progress = function(e) {
            var t = S.progress.call(this, e);
            return void 0 === e ? t : (e = 1 === this._direction ? e : 1 - e, this._stylesClip.progress(e), this._applyStyles(0, a(this._styles)), this.playing() && (this._isWaitingForStylesToBeApplied = !0, f(this._setStylesAfterWaiting, 2)), t)
        }, T._prepareProperties = function() {
            var e = l(this._el, this._stylesTo, this._stylesFrom);
            this._styles = e.target, this._stylesTo = e.propsTo, this._stylesFrom = e.propsFrom;
            var t = this._storeEase || b;
            this._eases = {}, this._propsArray = [];
            var i;
            this._styleCompleteTo = a(this._stylesTo), this._styleCompleteFrom = a(this._stylesFrom), this._propsEaseKeys = {};
            var r;
            for (r in this._stylesTo) this._stylesTo.hasOwnProperty(r) && (this._propsArray[this._propsArray.length] = r, void 0 === this._propsEase[r] ? (void 0 === this._eases[t] && (i = this._convertEase(t), this._eases[t] = i.css), this._propsEaseKeys[r] = t) : void 0 === this._eases[this._propsEase[r]] ? (i = this._convertEase(this._propsEase[r]), this._eases[this._propsEase[r]] = i.css, this._propsEaseKeys[r] = this._propsEase[r], this._propsEase[r] = i.js) : m(this._propsEase[r]) && (this._propsEaseKeys[r] = this._propsEase[r], this._propsEase[r] = this._eases[this._propsEase[r]][1].toEasingFunction()));
            if (this._onPaused = this._onPaused.bind(this), this.on("pause", this._onPaused), this._setOtherTransitions(), this._currentTransitionStyles = this._otherTransitions, this._completeStyles = a(this._isYoyo ? this._stylesFrom : this._stylesTo), void 0 !== this._options.removeStylesOnComplete) {
                var o = this._options.removeStylesOnComplete;
                if ("boolean" == typeof o && o)
                    for (r in this._stylesTo) this._completeStyles[r] = null;
                else if ("object" === ("undefined" == typeof o ? "undefined" : n(o)) && o.length)
                    for (var s = o.length; s--;) this._completeStyles[o[s]] = null
            }
            return this._onTransitionEnded = this._onTransitionEnded.bind(this), this._setStylesAfterWaiting = this._setStylesAfterWaiting.bind(this), this._onVisibilityChanged = this._onVisibilityChanged.bind(this), v.on(v.CHANGED, this._onVisibilityChanged), this._stylesClip = new g(this._styles, 1, this._stylesTo, {
                ease: this._options.ease,
                propsFrom: this._stylesFrom,
                propsEase: this._options.propsEase
            }), _._remove(this._stylesClip), S._prepareProperties.call(this)
        }, T._convertEase = function(e) {
            if ("function" == typeof e) throw new Error(w);
            var t, i;
            if (m(e)) t = y.create(e), i = t.toEasingFunction();
            else {
                var r = h(e);
                if (null === r.cssString) throw new Error(E.replace(/%EASE%/g, e));
                t = y.create(r.cssString), i = e
            }
            return {
                css: {
                    1: t,
                    "-1": t.reversed()
                },
                js: i
            }
        }, T._complete = function() {
            !this._isWaitingForStylesToBeApplied && !this._isTransitionEnded && this._isListeningForTransitionEnd || 1 !== this.progress() || (this._isWaitingForStylesToBeApplied = !1, S._complete.call(this))
        }, T._onTransitionEnded = function() {
            this._isTransitionEnded = !0, this._complete()
        }, T._addTransitionListener = function() {
            !this._isListeningForTransitionEnd && this._el && this._onTransitionEnded && (this._isListeningForTransitionEnd = !0, this._isTransitionEnded = !1, this._el.addEventListener(d, this._onTransitionEnded))
        }, T._removeTransitionListener = function() {
            this._isListeningForTransitionEnd && this._el && this._onTransitionEnded && (this._isListeningForTransitionEnd = !1, this._isTransitionEnded = !1, this._el.removeEventListener(d, this._onTransitionEnded))
        }, T._applyStyles = function(e, t) {
            if (e > 0) {
                var i, r = "",
                    n = {};
                for (i in this._eases) this._eases.hasOwnProperty(i) && (n[i] = this._eases[i][this._direction].splitAt(this.progress()).toCSSString());
                for (i in this._stylesTo) this._stylesTo.hasOwnProperty(i) && (r += i + " " + e + "ms " + n[this._propsEaseKeys[i]] + " 0ms, ");
                this._currentTransitionStyles = r.substr(0, r.length - 2), this._doStylesMatchCurrentStyles(t) ? this._removeTransitionListener() : this._addTransitionListener()
            } else this._currentTransitionStyles = "", this._removeTransitionListener();
            t.transition = this._getOtherClipTransitionStyles() + this._currentTransitionStyles, o(this._el, t)
        }, T._doStylesMatchCurrentStyles = function(e) {
            var t, i = s.apply(this, [this._el].concat([this._propsArray]));
            for (t in e)
                if (e.hasOwnProperty(t) && i.hasOwnProperty(t) && e[t] !== i[t]) return !1;
            return !0
        }, T._setStylesAfterWaiting = function() {
            if (this._isWaitingForStylesToBeApplied = !1, this.playing()) {
                var e = this._durationMs * (1 - this.progress()),
                    t = this._direction > 0 ? this._styleCompleteTo : this._styleCompleteFrom;
                this._applyStyles(e, t)
            }
        }, T._setOtherTransitions = function() {
            p(this._el, this._stylesTo);
            for (var e = _.getAll(this._el), t = e.length; t--;)
                if (e[t] !== this && e[t].playing() && e[t]._otherTransitions && e[t]._otherTransitions.length) return void(this._otherTransitions = e[t]._otherTransitions);
            this._otherTransitions = s(this._el, "transition").transition, null !== this._otherTransitions && "all 0s ease 0s" !== this._otherTransitions || (this._otherTransitions = "")
        }, T._getTransitionStyles = function() {
            var e = this._getOtherClipTransitionStyles();
            return this._otherTransitions.length ? e += this._otherTransitions : e.length && (e = e.substr(0, e.length - 2)), e
        }, T._getOtherClipTransitionStyles = function() {
            for (var e = "", t = _.getAll(this._el), i = t.length; i--;) t[i] !== this && t[i].playing() && t[i]._currentTransitionStyles && t[i]._currentTransitionStyles.length && (e += t[i]._currentTransitionStyles + ", ");
            return e
        }, T._onVisibilityChanged = function(e) {
            if (this.playing() && !e.isHidden) {
                this._update({
                    timeNow: this._getTime()
                });
                var t = this.progress();
                t < 1 && this.progress(t)
            }
        }, T._onPaused = function(e) {
            var t = s.apply(this, [this._el].concat([this._propsArray]));
            t.transition = this._getTransitionStyles(), this._removeTransitionListener(), o(this._el, t)
        }, T._onStart = function(e) {
            var t = 1 === this._direction && 0 === this.progress() && 0 === this._delay ? 2 : 0;
            t && (this._isWaitingForStylesToBeApplied = !0, this._applyStyles(0, this._styleCompleteFrom)), f(this._setStylesAfterWaiting, t), "function" == typeof this._storeOnStart && this._storeOnStart.call(this, this)
        }, T._onComplete = function(e) {
            this._removeTransitionListener(), this._completeStyles.transition = this._getTransitionStyles(), o(this._el, this._completeStyles), "function" == typeof this._storeOnComplete && this._storeOnComplete.call(this, this)
        }, t.exports = r
    }, {
        "../helpers/BezierCurveCssManager": 103,
        "../helpers/convertToStyleObject": 106,
        "../helpers/convertToTransitionableObjects": 107,
        "../helpers/isCssCubicBezierString": 109,
        "../helpers/removeTransitions": 110,
        "../helpers/transitionEnd": 113,
        "../helpers/waitAnimationFrames": 114,
        "./ClipEasing": 99,
        "@marcom/ac-clip": 20,
        "@marcom/ac-dom-styles/getStyle": 76,
        "@marcom/ac-dom-styles/setStyle": 78,
        "@marcom/ac-easing": 86,
        "@marcom/ac-object/clone": 183,
        "@marcom/ac-object/create": 184,
        "@marcom/ac-page-visibility": 187
    }],
    102: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            this.manager = t, this.p1 = {
                x: e[0],
                y: e[1]
            }, this.p2 = {
                x: e[2],
                y: e[3]
            }, this._isLinear = this.p1.x === this.p1.y && this.p2.x === this.p2.y, this._cacheSplits = {}
        }
        var n = e("@marcom/ac-easing").createBezier,
            o = r.prototype;
        o.splitAt = function(e) {
            if (this._isLinear) return this;
            if (e = Math.round(40 * e) / 40, 0 === e) return this;
            if (void 0 !== this._cacheSplits[e]) return this._cacheSplits[e];
            for (var t = [this.p1.x, this.p2.x], i = [this.p1.y, this.p2.y], r = 0, n = e, o = 0, s = 1, a = this._getStartX(e, t); n !== a && r < 1e3;) n < a ? s = e : o = e, e = o + .5 * (s - o), a = this._getStartX(e, t), ++r;
            var l = this._splitBezier(e, t, i),
                c = this._normalize(l),
                u = this.manager.create(c);
            return this._cacheSplits[n] = u, u
        }, o.reversed = function() {
            var e = this.toArray();
            return this.manager.create([.5 - (e[2] - .5), .5 - (e[3] - .5), .5 - (e[0] - .5), .5 - (e[1] - .5)])
        }, o.toArray = function() {
            return [this.p1.x, this.p1.y, this.p2.x, this.p2.y]
        }, o.toCSSString = function() {
            return "cubic-bezier(" + this.p1.x + ", " + this.p1.y + ", " + this.p2.x + ", " + this.p2.y + ")"
        }, o.toEasingFunction = function() {
            return n.apply(this, this.toArray()).easingFunction
        }, o._getStartX = function(e, t) {
            var i = e - 1,
                r = e * e,
                n = i * i,
                o = r * e;
            return o - 3 * r * i * t[1] + 3 * e * n * t[0]
        }, o._splitBezier = function(e, t, i) {
            var r = e - 1,
                n = e * e,
                o = r * r,
                s = n * e;
            return [s - 3 * n * r * t[1] + 3 * e * o * t[0], s - 3 * n * r * i[1] + 3 * e * o * i[0], n - 2 * e * r * t[1] + o * t[0], n - 2 * e * r * i[1] + o * i[0], e - r * t[1], e - r * i[1]]
        }, o._normalize = function(e) {
            return [(e[2] - e[0]) / (1 - e[0]), (e[3] - e[1]) / (1 - e[1]), (e[4] - e[0]) / (1 - e[0]), (e[5] - e[1]) / (1 - e[1])]
        }, t.exports = r
    }, {
        "@marcom/ac-easing": 86
    }],
    103: [function(e, t, i) {
        "use strict";

        function r() {
            this._instances = {}
        }
        var n = e("./BezierCurveCss"),
            o = r.prototype;
        o.create = function(e) {
            var t;
            if (t = "string" == typeof e ? e.replace(/ /g, "") : "cubic-bezier(" + e.join(",") + ")", void 0 === this._instances[t]) {
                if ("string" == typeof e) {
                    e = e.match(/\d*\.?\d+/g);
                    for (var i = e.length; i--;) e[i] = Number(e[i])
                }
                this._instances[t] = new n(e, this)
            }
            return this._instances[t]
        }, t.exports = new r
    }, {
        "./BezierCurveCss": 102
    }],
    104: [function(e, t, i) {
        "use strict";
        "undefined" == typeof window.Float32Array && (window.Float32Array = function() {})
    }, {}],
    105: [function(e, t, i) {
        "use strict";

        function r(e, t, i) {
            this._transform = e;
            var r, n, s;
            for (s in i) i.hasOwnProperty(s) && "function" == typeof this._transform[s] && (r = o(i[s]), n = "%" === r.unit ? this._convertPercentToPixelValue(s, r.value, t) : r.value, this._transform[s].call(this._transform, n))
        }
        var n = e("@marcom/ac-dom-metrics/getDimensions"),
            o = e("./splitUnits"),
            s = {
                translateX: "width",
                translateY: "height"
            },
            a = r.prototype;
        a._convertPercentToPixelValue = function(e, t, i) {
            e = s[e];
            var r = n(i);
            return r[e] ? (t *= .01, r[e] * t) : t
        }, a.toArray = function() {
            return this._transform.toArray()
        }, a.toCSSString = function() {
            return this._transform.toCSSString()
        }, t.exports = r
    }, {
        "./splitUnits": 111,
        "@marcom/ac-dom-metrics/getDimensions": 94
    }],
    106: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t, i, r = {};
            for (i in e) e.hasOwnProperty(i) && null !== e[i] && (e[i].isColor ? e[i].isRgb ? r[i] = "rgb(" + Math.round(e[i].r) + ", " + Math.round(e[i].g) + ", " + Math.round(e[i].b) + ")" : e[i].isRgba && (r[i] = "rgba(" + Math.round(e[i].r) + ", " + Math.round(e[i].g) + ", " + Math.round(e[i].b) + ", " + e[i].a + ")") : "transform" === i ? (t = 6 === e[i].length ? "matrix" : "matrix3d", r[i] = t + "(" + e[i].join(",") + ")") : e[i].unit ? r[i] = e[i].value + e[i].unit : r[i] = e[i].value);
            return r
        }
    }, {}],
    107: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-dom-styles/getStyle"),
            n = e("@marcom/ac-object/clone"),
            o = e("./splitUnits"),
            s = e("./toCamCase"),
            a = e("@marcom/ac-color").Color,
            l = e("@marcom/ac-feature/cssPropertyAvailable"),
            c = e("@marcom/ac-transform").Transform,
            u = e("./TransformMatrix"),
            h = function(e) {
                return a.isRgba(e) ? (e = new a(e).rgbaObject(), e.isRgba = !0) : (e = new a(e).rgbObject(), e.isRgb = !0), e.isColor = !0, e
            },
            m = function(e) {
                e.isRgb && (e.isRgb = !1, e.isRgba = !0, e.a = 1)
            },
            p = function(e, t, i) {
                (e.isRgba || t.isRgba || i.isRgba) && (m(e), m(t), m(i))
            },
            d = function(e) {
                return [e[0], e[1], 0, 0, e[2], e[3], 0, 0, 0, 0, 1, 0, e[4], e[5], 0, 1]
            },
            f = function(e, t, i) {
                16 !== e.transform.length && 16 !== t.transform.length && 16 !== i.transform.length || (6 === e.transform.length && (e.transform = d(e.transform)), 6 === t.transform.length && (t.transform = d(t.transform)), 6 === i.transform.length && (i.transform = d(i.transform)))
            };
        t.exports = function(e, t, i) {
            var m = {};
            t = n(t, !0), i = n(i, !0);
            var d, y, _, g, v, b = l("transform");
            for (v in t) t.hasOwnProperty(v) && null !== t[v] && ("transform" === v ? (b && (y = new c, d = r(e, "transform").transform || "none", y.setMatrixValue(d), _ = new u(new c, e, t[v])), _ && _.toCSSString() !== y.toCSSString() ? (g = new u(i[v] ? new c : y.clone(), e, i[v]), m[v] = y.toArray(), t[v] = _.toArray(), i[v] = g.toArray()) : (m[v] = null, t[v] = null)) : (d = r(e, v)[s(v)] || i[v], a.isColor(d) ? (m[v] = h(d), i[v] = void 0 !== i[v] ? h(i[v]) : n(m[v], !0), t[v] = h(t[v])) : (m[v] = o(d), i[v] = void 0 !== i[v] ? o(i[v]) : n(m[v], !0), t[v] = o(t[v]))));
            for (v in i) !i.hasOwnProperty(v) || null === i[v] || void 0 !== t[v] && null !== t[v] || ("transform" === v ? (b && (y = new c, y.setMatrixValue(getComputedStyle(e).transform || getComputedStyle(e).webkitTransform || "none"), g = new u(new c, e, i[v])), g && g.toCSSString() !== y.toCSSString() ? (_ = new u(y.clone()), m[v] = y.toArray(), t[v] = _.toArray(), i[v] = g.toArray()) : (m[v] = null, t[v] = null, i[v] = null)) : (d = r(e, v)[s(v)], a.isColor(d) ? (m[v] = h(d), t[v] = n(m[v], !0), i[v] = h(i[v])) : (m[v] = o(d), i[v] = o(i[v]), t[v] = n(m[v], !0)))), m[v] && m[v].isColor && p(m[v], i[v], t[v]);
            return m.transform && f(m, i, t), {
                target: m,
                propsTo: t,
                propsFrom: i
            }
        }
    }, {
        "./TransformMatrix": 105,
        "./splitUnits": 111,
        "./toCamCase": 112,
        "@marcom/ac-color": 26,
        "@marcom/ac-dom-styles/getStyle": 76,
        "@marcom/ac-feature/cssPropertyAvailable": 126,
        "@marcom/ac-object/clone": 183,
        "@marcom/ac-transform": 230
    }],
    108: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            if (e.transitionProperty) {
                for (var t = "", i = e.transitionProperty.split(", "), r = e.transitionDuration.split(", "), n = e.transitionTimingFunction.replace(/\d+[,]+[\s]/gi, function(e) {
                        return e.substr(0, e.length - 1)
                    }).split(", "), o = e.transitionDelay.split(", "), s = i.length; s--;) t += i[s] + " " + r[s] + " " + n[s] + " " + o[s] + ", ";
                return t.substr(0, t.length - 2)
            }
            return !1
        }
    }, {}],
    109: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            return "string" == typeof e && "cubic-bezier(" === e.substr(0, 13)
        }
    }, {}],
    110: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-dom-styles/setStyle"),
            n = e("@marcom/ac-dom-styles/getStyle"),
            o = e("./getShorthandTransition");
        t.exports = function(e, t) {
            var i = n(e, "transition", "transition-property", "transition-duration", "transition-timing-function", "transition-delay");
            if (i = i.transition || o(i), i && i.length) {
                i = i.split(",");
                for (var s, a = 0, l = i.length; l--;) s = i[l].trim().split(" ")[0], void 0 !== t[s] && (i.splice(l, 1), ++a);
                a && (0 === i.length && (i = ["all"]), r(e, {
                    transition: i.join(",").trim()
                }))
            }
        }
    }, {
        "./getShorthandTransition": 108,
        "@marcom/ac-dom-styles/getStyle": 76,
        "@marcom/ac-dom-styles/setStyle": 78
    }],
    111: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            if (e = String(e), e.indexOf(" ") > -1) throw new Error("Shorthand CSS is not supported. Please use longhand CSS only.");
            var t = /(\d*\.?\d*)(.*)/,
                i = 1;
            e && "-" === e.substr(0, 1) && (e = e.substr(1), i = -1);
            var r = String(e).match(t);
            return {
                value: Number(r[1]) * i,
                unit: r[2]
            }
        }
    }, {}],
    112: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = function(e, t, i, r) {
                return 0 === i && "moz" !== r.substr(1, 3) ? t : t.toUpperCase()
            };
            return e.replace(/-(\w)/g, t)
        }
    }, {}],
    113: [function(e, t, i) {
        "use strict";
        var r;
        t.exports = function() {
            if (r) return r;
            var e, t = document.createElement("fakeelement"),
                i = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (e in i)
                if (void 0 !== t.style[e]) return r = i[e]
        }()
    }, {}],
    114: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-page-visibility").PageVisibilityManager;
        t.exports = function(e, t) {
            if (t) {
                var i = function(e) {
                        r.isHidden ? setTimeout(e, 16) : window.requestAnimationFrame(e)
                    },
                    n = 0,
                    o = function s() {
                        n === t ? e.call(this) : (++n, i(s))
                    };
                o()
            } else e.call(this)
        }
    }, {
        "@marcom/ac-page-visibility": 187
    }],
    115: [function(e, t, i) {
        "use strict";

        function r(e) {
            e = e || {}, e.ease = e.ease || "linear", e.destroyOnComplete = !1, this.options = e, o.call(this, {
                t: 0
            }, 0, {
                t: 1
            }, e), this._itemList = new l
        }
        var n = e("@marcom/ac-object/create"),
            o = e("@marcom/ac-clip").Clip,
            s = e("./TimelineClip"),
            a = e("./TimelineCallback"),
            l = e("./TimelineItemList"),
            c = o.prototype,
            u = r.prototype = n(c);
        r.prototype.constructor = r, u._update = function(e) {
            c._update.call(this, e), this._render()
        }, u.progress = function(e) {
            return c.progress.call(this, e), void 0 !== e && this._render(), this._progress
        }, u._render = function() {
            if (0 !== this._itemList.length)
                for (var e = this._target.t * this._duration, t = this._itemList.head, i = t; i;) {
                    i = t.next;
                    var r = e - t.position;
                    t.currentTime(r), t = i
                }
        }, u.addClip = function(e, t) {
            t = void 0 === t ? this.duration() : t;
            var i = e._delay / 1e3;
            this._itemList.append(new s(e, t + i)), this._updateDuration()
        }, u.addCallback = function(e, t) {
            t = void 0 === t ? this.duration() : t, this._itemList.append(new a(e, t)), this._updateDuration()
        }, u.remove = function(e) {
            var t = this._itemList.getItem(e);
            t && (this._itemList.remove(t), this._updateDuration())
        }, u._updateDuration = function() {
            var e = this._itemList.head,
                t = e.position + e.duration();
            this._itemList.forEach(function(i) {
                var r = i.position + i.duration();
                r >= t && (e = i, t = r)
            }), this.duration(t)
        }, u.destroy = function() {
            for (var e = this._itemList.head; e;) {
                var t = e;
                e = t.next, this._itemList.remove(t)
            }
            return this._duration = 0, c.destroy.call(this)
        }, t.exports = r
    }, {
        "./TimelineCallback": 116,
        "./TimelineClip": 117,
        "./TimelineItemList": 118,
        "@marcom/ac-clip": 20,
        "@marcom/ac-object/create": 184
    }],
    116: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            this.callback = e, this._delay = 0, this.position = t, this._hasTriggered = !1, this.prev = null, this.next = null
        }
        var n = r.prototype;
        n.duration = function() {
            return 0
        }, n.currentTime = function(e) {
            return e >= 0 && !this._hasTriggered && (this.callback(), this._hasTriggered = !0), e < 0 && this._hasTriggered && (this.callback(), this._hasTriggered = !1), 0
        }, t.exports = r
    }, {}],
    117: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            this.clip = e, this.position = t, this.duration = this.clip.duration.bind(this.clip), this.lastProgress = -1, this.prev = null, this.next = null
        }
        var n = r.prototype;
        n.currentTime = function(e) {
            var t = Math.min(1, Math.max(0, e / this.clip._duration));
            return t !== t && (t = 1), this.lastProgress === t ? this.lastProgress : (0 !== this.lastProgress && 0 !== t && this.lastProgress !== -1 || this.clip._storeOnStart && this.clip._storeOnStart(this.clip), this.clip._playing = t * this.clip._duration === this.clip._duration, this.lastProgress = this.clip.progress(t), this.lastProgress)
        }, n.destroy = function() {
            this.clip.destroy(), this.prev = null, this.next = null, this.duration = null
        }, t.exports = r
    }, {}],
    118: [function(e, t, i) {
        "use strict";
        var r = e("./TimelineClip"),
            n = e("./TimelineCallback"),
            o = function() {
                this.head = null, this.tail = null, this.length = 0
            },
            s = o.prototype;
        s.append = function(e) {
            e.prev = null, e.next = null, this.tail ? (this.tail.next = e, e.prev = this.tail) : this.head = e, this.tail = e, this.length++
        }, s.remove = function(e) {
            e === this.head ? this.head = this.head.next : e === this.tail && (this.tail = this.tail.prev), e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.next = e.prev = null, null === this.head && (this.tail = null), this.length--
        }, s.getItem = function(e) {
            for (var t = this.head; t;) {
                var i = t;
                if (i instanceof r && i.clip === e || i instanceof n && i.callback === e) return i;
                t = i.next
            }
            return null
        }, s.forEach = function(e) {
            for (var t = 0, i = this.head; i;) {
                var r = i;
                e(r, t, this.length), i = r.next
            }
        }, s.destroy = function() {
            for (; this.head;) {
                var e = this.head;
                this.remove(e), e.destroy()
            }
        }, t.exports = o
    }, {
        "./TimelineCallback": 116,
        "./TimelineClip": 117
    }],
    119: [function(e, t, i) {
        "use strict";
        t.exports = {
            EventEmitterMicro: e("./ac-event-emitter-micro/EventEmitterMicro")
        }
    }, {
        "./ac-event-emitter-micro/EventEmitterMicro": 120
    }],
    120: [function(e, t, i) {
        "use strict";

        function r() {
            this._events = {}
        }
        var n = r.prototype;
        n.on = function(e, t) {
            this._events[e] = this._events[e] || [], this._events[e].unshift(t)
        }, n.once = function(e, t) {
            function i(n) {
                r.off(e, i), void 0 !== n ? t(n) : t()
            }
            var r = this;
            this.on(e, i)
        }, n.off = function(e, t) {
            if (this.has(e)) {
                if (1 === arguments.length) return this._events[e] = null, void delete this._events[e];
                var i = this._events[e].indexOf(t);
                i !== -1 && this._events[e].splice(i, 1)
            }
        }, n.trigger = function(e, t) {
            if (this.has(e))
                for (var i = this._events[e].length - 1; i >= 0; i--) void 0 !== t ? this._events[e][i](t) : this._events[e][i]()
        }, n.has = function(e) {
            return e in this._events != !1 && 0 !== this._events[e].length
        }, n.destroy = function() {
            for (var e in this._events) this._events[e] = null;
            this._events = null
        }, t.exports = r
    }, {}],
    121: [function(e, t, i) {
        "use strict";
        t.exports = {
            canvasAvailable: e("./canvasAvailable"),
            continuousScrollEventsAvailable: e("./continuousScrollEventsAvailable"),
            cookiesAvailable: e("./cookiesAvailable"),
            cssLinearGradientAvailable: e("./cssLinearGradientAvailable"),
            cssPropertyAvailable: e("./cssPropertyAvailable"),
            cssViewportUnitsAvailable: e("./cssViewportUnitsAvailable"),
            elementAttributeAvailable: e("./elementAttributeAvailable"),
            eventTypeAvailable: e("./eventTypeAvailable"),
            isDesktop: e("./isDesktop"),
            isHandheld: e("./isHandheld"),
            isRetina: e("./isRetina"),
            isTablet: e("./isTablet"),
            localStorageAvailable: e("./localStorageAvailable"),
            mediaElementsAvailable: e("./mediaElementsAvailable"),
            mediaQueriesAvailable: e("./mediaQueriesAvailable"),
            prefersReducedMotion: e("./prefersReducedMotion"),
            sessionStorageAvailable: e("./sessionStorageAvailable"),
            svgAvailable: e("./svgAvailable"),
            threeDTransformsAvailable: e("./threeDTransformsAvailable"),
            touchAvailable: e("./touchAvailable"),
            webGLAvailable: e("./webGLAvailable")
        }
    }, {
        "./canvasAvailable": 122,
        "./continuousScrollEventsAvailable": 123,
        "./cookiesAvailable": 124,
        "./cssLinearGradientAvailable": 125,
        "./cssPropertyAvailable": 126,
        "./cssViewportUnitsAvailable": 127,
        "./elementAttributeAvailable": 128,
        "./eventTypeAvailable": 129,
        "./isDesktop": 131,
        "./isHandheld": 132,
        "./isRetina": 133,
        "./isTablet": 134,
        "./localStorageAvailable": 135,
        "./mediaElementsAvailable": 136,
        "./mediaQueriesAvailable": 137,
        "./prefersReducedMotion": 138,
        "./sessionStorageAvailable": 139,
        "./svgAvailable": 140,
        "./threeDTransformsAvailable": 141,
        "./touchAvailable": 142,
        "./webGLAvailable": 143
    }],
    122: [function(e, t, i) {
        "use strict";
        var r = e("./helpers/globals"),
            n = e("@marcom/ac-function/once"),
            o = function() {
                var e = r.getDocument(),
                    t = e.createElement("canvas");
                return !("function" != typeof t.getContext || !t.getContext("2d"))
            };
        t.exports = n(o), t.exports.original = o
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    123: [function(e, t, i) {
        "use strict";

        function r() {
            return !o() || n.os.ios && n.os.version.major >= 8 || n.browser.chrome
        }
        var n = e("@marcom/useragent-detect"),
            o = e("./touchAvailable").original,
            s = e("@marcom/ac-function/once");
        t.exports = s(r), t.exports.original = r
    }, {
        "./touchAvailable": 142,
        "@marcom/ac-function/once": 145,
        "@marcom/useragent-detect": 284
    }],
    124: [function(e, t, i) {
        "use strict";

        function r() {
            var e = !1,
                t = n.getDocument(),
                i = n.getNavigator();
            try {
                "cookie" in t && i.cookieEnabled && (t.cookie = "ac_feature_cookie=1", e = t.cookie.indexOf("ac_feature_cookie") !== -1, t.cookie = "ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;")
            } catch (r) {}
            return e
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    125: [function(e, t, i) {
        "use strict";

        function r() {
            var e = ["linear-gradient(to bottom right, #9f9, white)", "linear-gradient(top left, #9f9, white)", "gradient(linear, left top, right bottom, from(#9f9), to(white))"];
            return e.some(function(e) {
                return !!n("background-image", e)
            })
        }
        var n = e("@marcom/ac-prefixer/getStyleValue"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "@marcom/ac-function/once": 145,
        "@marcom/ac-prefixer/getStyleValue": 194
    }],
    126: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            return "undefined" != typeof t ? !!n(e, t) : !!o(e)
        }
        var n = e("@marcom/ac-prefixer/getStyleValue"),
            o = e("@marcom/ac-prefixer/getStyleProperty"),
            s = e("@marcom/ac-function/memoize");
        t.exports = s(r), t.exports.original = r
    }, {
        "@marcom/ac-function/memoize": 144,
        "@marcom/ac-prefixer/getStyleProperty": 193,
        "@marcom/ac-prefixer/getStyleValue": 194
    }],
    127: [function(e, t, i) {
        "use strict";

        function r() {
            return !!n("margin", "1vw 1vh")
        }
        var n = e("@marcom/ac-prefixer/getStyleValue"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "@marcom/ac-function/once": 145,
        "@marcom/ac-prefixer/getStyleValue": 194
    }],
    128: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            var i, r = n.getDocument();
            return t = t || "div", i = r.createElement(t), e in i
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/memoize");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/memoize": 144
    }],
    129: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            return !!n(e, t)
        }
        var n = e("@marcom/ac-prefixer/getEventType"),
            o = e("@marcom/ac-function/memoize");
        t.exports = o(r), t.exports.original = r
    }, {
        "@marcom/ac-function/memoize": 144,
        "@marcom/ac-prefixer/getEventType": 191
    }],
    130: [function(e, t, i) {
        "use strict";
        t.exports = {
            getWindow: function() {
                return window
            },
            getDocument: function() {
                return document
            },
            getNavigator: function() {
                return navigator
            }
        }
    }, {}],
    131: [function(e, t, i) {
        "use strict";

        function r() {
            var e = s.getWindow();
            return !o() && !e.orientation || n.windows
        }
        var n = e("@marcom/useragent-detect").os,
            o = e("./touchAvailable").original,
            s = e("./helpers/globals"),
            a = e("@marcom/ac-function/once");
        t.exports = a(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "./touchAvailable": 142,
        "@marcom/ac-function/once": 145,
        "@marcom/useragent-detect": 284
    }],
    132: [function(e, t, i) {
        "use strict";

        function r() {
            return !n() && !o()
        }
        var n = e("./isDesktop").original,
            o = e("./isTablet").original,
            s = e("@marcom/ac-function/once");
        t.exports = s(r), t.exports.original = r
    }, {
        "./isDesktop": 131,
        "./isTablet": 134,
        "@marcom/ac-function/once": 145
    }],
    133: [function(e, t, i) {
        "use strict";
        var r = e("./helpers/globals");
        t.exports = function() {
            var e = r.getWindow();
            return "devicePixelRatio" in e && e.devicePixelRatio >= 1.5
        }
    }, {
        "./helpers/globals": 130
    }],
    134: [function(e, t, i) {
        "use strict";

        function r() {
            var e = o.getWindow(),
                t = e.screen.width;
            return e.orientation && e.screen.height < t && (t = e.screen.height), !n() && t >= a
        }
        var n = e("./isDesktop").original,
            o = e("./helpers/globals"),
            s = e("@marcom/ac-function/once"),
            a = 600;
        t.exports = s(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "./isDesktop": 131,
        "@marcom/ac-function/once": 145
    }],
    135: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getWindow(),
                t = !1;
            try {
                t = !(!e.localStorage || null === e.localStorage.non_existent)
            } catch (i) {}
            return t
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    136: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getWindow();
            return "HTMLMediaElement" in e
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    137: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getWindow(),
                t = e.matchMedia("only all");
            return !(!t || !t.matches)
        }
        e("@marcom/ac-polyfills/matchMedia");
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145,
        "@marcom/ac-polyfills/matchMedia": void 0
    }],
    138: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getWindow(),
                t = e.matchMedia("(prefers-reduced-motion)");
            return !(!t || !t.matches)
        }
        var n = e("./helpers/globals");
        t.exports = r
    }, {
        "./helpers/globals": 130
    }],
    139: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getWindow(),
                t = !1;
            try {
                "sessionStorage" in e && "function" == typeof e.sessionStorage.setItem && (e.sessionStorage.setItem("ac_feature", "test"), t = !0, e.sessionStorage.removeItem("ac_feature", "test"))
            } catch (i) {}
            return t
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    140: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getDocument();
            return !!e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    141: [function(e, t, i) {
        "use strict";

        function r() {
            return !(!n("perspective", "1px") || !n("transform", "translateZ(0)"))
        }
        var n = e("@marcom/ac-prefixer/getStyleValue"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "@marcom/ac-function/once": 145,
        "@marcom/ac-prefixer/getStyleValue": 194
    }],
    142: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getWindow(),
                t = n.getDocument(),
                i = n.getNavigator();
            return !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch || i.maxTouchPoints > 0 || i.msMaxTouchPoints > 0)
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    143: [function(e, t, i) {
        "use strict";

        function r() {
            var e = n.getDocument(),
                t = e.createElement("canvas");
            return "function" == typeof t.getContext && !(!t.getContext("webgl") && !t.getContext("experimental-webgl"));
        }
        var n = e("./helpers/globals"),
            o = e("@marcom/ac-function/once");
        t.exports = o(r), t.exports.original = r
    }, {
        "./helpers/globals": 130,
        "@marcom/ac-function/once": 145
    }],
    144: [function(e, t, i) {
        "use strict";
        var r = function() {
            var e, t = "";
            for (e = 0; e < arguments.length; e++) e > 0 && (t += ","), t += arguments[e];
            return t
        };
        t.exports = function(e, t) {
            t = t || r;
            var i = function n() {
                var i = arguments,
                    r = t.apply(this, i);
                return r in n.cache || (n.cache[r] = e.apply(this, i)), n.cache[r]
            };
            return i.cache = {}, i
        }
    }, {}],
    145: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t;
            return function() {
                return "undefined" == typeof t && (t = e.apply(this, arguments)), t
            }
        }
    }, {}],
    146: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t) {
            var i = null;
            return function() {
                null === i && (e.apply(this, arguments), i = setTimeout(function() {
                    i = null
                }, t))
            }
        }
    }, {}],
    147: [function(e, t, i) {
        "use strict";

        function r(e) {
            e = e || {}, this._wrapAround = e.wrapAround || !1, this._itemType = e.itemType || s, this._items = [], this._itemsIdLookup = {}, this._itemChanged = !1, this.showNext = this.showNext.bind(this), this.showPrevious = this.showPrevious.bind(this), this._update = this._update.bind(this), this._updateItems = this._updateItems.bind(this), o.call(this), e.startAt && this._startAt(e.startAt), r._add(this, e.analyticsOptions)
        }
        var n = e("./singletons/analyticsManager"),
            o = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            s = e("./Item");
        r.FADE = "fade", r.FADE_SELECTOR = "[data-ac-gallery-fade]", r.SLIDE = "slide", r.SLIDE_SELECTOR = "[data-ac-gallery-slide]", r.UPDATE = "update", r.UPDATE_COMPLETE = "update:complete";
        var a = o.prototype,
            l = r.prototype = Object.create(a);
        l.addItem = function(e, t) {
            if (e.nodeType) e = new this._itemType(e);
            else if (this._items.indexOf(e) > -1) return e;
            return "number" == typeof t ? this._items.splice(t, 0, e) : this._items.push(e), 1 === this._items.length ? (e.show(), this._setCurrentItem(e)) : (e.hide(), this.getNextItem() === e && this._setNextItem(e), this.getPreviousItem() === e && this._setPreviousItem(e)), null !== e.getElementId() && (this._itemsIdLookup[e.getElementId()] = e), e.on(s.SELECTED, this._update), e
        }, l.removeItem = function(e, t) {
            t = t || {}, "number" == typeof e && (e = this._items[e]);
            var i = this._items.indexOf(e);
            if (i > -1) {
                var r = this.getNextItem(),
                    n = this.getPreviousItem();
                this._items.splice(i, 1), e.off(s.SELECTED, this._update), r === e && this._setNextItem(this.getNextItem()), n === e && this._setPreviousItem(this.getPreviousItem())
            }
            return e === this._currentItem && this._items.length && t.setCurrentItem !== !1 && (this._update({
                item: this._items[0]
            }), this._setLastItem(null)), t.destroyItem && e.getElement() && e.destroy(), e
        }, l.show = function(e, t) {
            return "number" == typeof e ? e = this._items[e] : "string" == typeof e && (e = this._itemsIdLookup[e]), e && (t = t || {}, this._update({
                item: e,
                interactionEvent: t.interactionEvent
            })), e || null
        }, l.showNext = function(e) {
            var t = this.getNextItem();
            return t && this.show(t, e), t
        }, l.showPrevious = function(e) {
            var t = this.getPreviousItem();
            return t && this.show(t, e), t
        }, l.isInView = function() {
            return this._currentItem && this._currentItem.isInView()
        }, l.getTotalItems = function() {
            return this._items.length
        }, l.getItems = function() {
            return this._items
        }, l.getItem = function(e) {
            return "number" == typeof e ? this.getItemAt(e) : "string" == typeof e ? this.getItemById(e) : void 0
        }, l.getItemAt = function(e) {
            return this._items[e] || null
        }, l.getItemById = function(e) {
            return this._itemsIdLookup[e] || null
        }, l.getItemIndex = function(e) {
            return this._items.indexOf(e)
        }, l.getCurrentItem = function() {
            return this._currentItem || null
        }, l.getLastItem = function() {
            return this._lastItem || null
        }, l.getNextItem = function() {
            var e, t = this._items.indexOf(this._currentItem);
            return t < this._items.length - 1 ? e = this._items[t + 1] : this._wrapAround && (e = this._items[0]), e || null
        }, l.getPreviousItem = function() {
            var e, t = this._items.indexOf(this._currentItem);
            return t > 0 ? e = this._items[t - 1] : this._wrapAround && (e = this._items[this._items.length - 1]), e || null
        }, l.getId = function() {
            return this._id
        }, l.destroy = function(e) {
            if (e = e || {}, void 0 === e.destroyItems && (e.destroyItems = !0), this._setCurrentItem(null), e.destroyItems)
                for (var t; this._items.length;) t = this._items[0], t.off(s.SELECTED, this._update), this.removeItem(t, {
                    destroyItem: !0,
                    setCurrentItem: !1
                });
            return this._items = null, this._itemsIdLookup = null, r._remove(this), a.destroy.call(this)
        }, l._startAt = function(e) {
            var t = this._items[e];
            t && this._currentItem !== t && (this._currentItem.hide(), this._setCurrentItem(t), this._currentItem.show(), this.trigger(r.UPDATE, this._items))
        }, l._setCurrentItem = function(e) {
            this._currentItem && this._currentItem.getElement() && this._currentItem !== e && (this._currentItem.getElement().classList.remove(s.CSS_CURRENT_ITEM), this._setLastItem(this._currentItem)), this._currentItem = e, this._currentItem && this._currentItem.getElement() && (this._currentItem.getElement().classList.add(s.CSS_CURRENT_ITEM), this._setNextItem(this.getNextItem()), this._setPreviousItem(this.getPreviousItem()))
        }, l._setLastItem = function(e) {
            this._lastItem && this._lastItem.getElement() && this._lastItem !== e && this._lastItem.getElement().classList.remove(s.CSS_LAST_ITEM), this._lastItem = e, this._lastItem && this._lastItem.getElement() && this._lastItem.getElement().classList.add(s.CSS_LAST_ITEM)
        }, l._setNextItem = function(e) {
            this._nextItem && this._nextItem.getElement() && this._nextItem !== e && this._nextItem.getElement().classList.remove(s.CSS_NEXT_ITEM), this._nextItem = e, this._nextItem && this._nextItem.getElement() && this._nextItem.getElement().classList.add(s.CSS_NEXT_ITEM)
        }, l._setPreviousItem = function(e) {
            this._previousItem && this._previousItem.getElement() && this._previousItem !== e && this._previousItem.getElement().classList.remove(s.CSS_PREVIOUS_ITEM), this._previousItem = e, this._previousItem && this._previousItem.getElement() && this._previousItem.getElement().classList.add(s.CSS_PREVIOUS_ITEM)
        }, l._updateItems = function(e) {
            e.outgoing[0] && e.outgoing[0].hide(), e.incoming[0].show(), this._itemChanged && (this.trigger(r.UPDATE_COMPLETE, e), this._itemChanged = !1)
        }, l._update = function(e) {
            var t = this._currentItem !== e.item;
            t && this._setCurrentItem(e.item);
            var i = {
                incoming: [e.item],
                outgoing: this._lastItem ? [this._lastItem] : [],
                interactionEvent: e.interactionEvent || null
            };
            t && (this.trigger(r.UPDATE, i), this._itemChanged = !0), this._updateItems(i)
        }, r._instantiate = function() {
            return this._galleries = [], this._idCounter = 0, this
        }, r._add = function(e, t) {
            this._galleries.push(e), e._id = ++this._idCounter, n.add(e, t)
        }, r._remove = function(e) {
            var t = this._galleries.indexOf(e);
            t > -1 && (this._galleries.splice(t, 1), n.remove(e))
        }, r.getAll = function() {
            return Array.prototype.slice.call(this._galleries)
        }, r.getAllInView = function() {
            for (var e = [], t = this._galleries.length; t--;) this._galleries[t].isInView() && e.push(this._galleries[t]);
            return e
        }, r.destroyAll = function() {
            for (var e = this._galleries.length; e--;) this._galleries[e].destroy();
            this._galleries = []
        }, t.exports = r._instantiate()
    }, {
        "./Item": 148,
        "./singletons/analyticsManager": 160,
        "@marcom/ac-event-emitter-micro": 119
    }],
    148: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            this._el = e, t = t || {}, this._triggerKeys = [], this._triggerEls = {}, this._isShown = !1, this._isACaption = void 0 !== t.isACaption && t.isACaption, this._onKeyboardInteraction = this._onKeyboardInteraction.bind(this), this._onTriggered = this._onTriggered.bind(this), this._isACaption || this._el.setAttribute("role", "tabpanel"), l.call(this)
        }
        e("@marcom/ac-polyfills/Array/from");
        var n = e("@marcom/ac-dom-metrics/isInViewport"),
            o = e("@marcom/ac-dom-metrics/getPercentInViewport"),
            s = e("@marcom/ac-accessibility/helpers/TabManager"),
            a = e("@marcom/ac-keyboard/keyMap"),
            l = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            c = e("@marcom/ac-keyboard"),
            u = "current";
        r.CSS_CURRENT_ITEM = "ac-gallery-currentitem", r.CSS_LAST_ITEM = "ac-gallery-lastitem", r.CSS_NEXT_ITEM = "ac-gallery-nextitem", r.CSS_PREVIOUS_ITEM = "ac-gallery-previousitem", r.SELECTED = "selected", r.SHOW = "show", r.HIDE = "hide";
        var h = r.prototype = Object.create(l.prototype);
        h.show = function() {
            this._isShown = !0, this._addCurrentClassToTriggers(), this._setTabIndexOnFocusableItems(null), this._el.removeAttribute("aria-hidden"), this.trigger(r.SHOW, this)
        }, h.hide = function() {
            this._isShown = !1, this._removeCurrentClassFromTriggers(), this._setTabIndexOnFocusableItems("-1"), this._el.setAttribute("aria-hidden", "true"), this.trigger(r.HIDE, this)
        }, h.addElementTrigger = function(e, t) {
            t = t || "click", void 0 === this._triggerEls[t] && (this._triggerEls[t] = []);
            var i = this._triggerEls[t].indexOf(e);
            if (i < 0) {
                e.setAttribute("role", "tab"), e.setAttribute("tabindex", "0");
                var r = this.getElementId();
                r && e.setAttribute("aria-controls", r), r = e.getAttribute("id"), r && null === this._el.getAttribute("aria-labelledby") && this._el.setAttribute("aria-labelledby", r), e.addEventListener(t, this._onTriggered), this._triggerEls[t].push(e), this._isShown ? (e.setAttribute("aria-selected", "true"), e.classList.add(u)) : e.setAttribute("aria-selected", "false")
            }
        }, h.removeElementTrigger = function(e, t) {
            if (t = t || "click", void 0 !== this._triggerEls[t]) {
                var i = this._triggerEls[t].indexOf(e);
                i > -1 && this._cleanElementTrigger(e, t), 0 === this._triggerEls[t].length && (this._triggerEls[t] = void 0)
            }
        }, h.addKeyTrigger = function(e) {
            if ("string" == typeof e && (e = a[e.toUpperCase()]), "number" == typeof e) {
                var t = this._triggerKeys.indexOf(e);
                t < 0 && (c.onDown(e, this._onKeyboardInteraction), this._triggerKeys.push(e))
            }
        }, h.removeKeyTrigger = function(e) {
            if ("string" == typeof e && (e = a[e.toUpperCase()]), "number" == typeof e) {
                var t = this._triggerKeys.indexOf(e);
                t > -1 && (c.offDown(e, this._onKeyboardInteraction), this._triggerKeys.splice(t, 1))
            }
        }, h.removeAllTriggers = function() {
            for (var e, t = this._triggerKeys.length; t--;) e = this._triggerKeys[t], c.offDown(e, this._onKeyboardInteraction);
            this._triggerKeys = [];
            var i, r;
            for (r in this._triggerEls)
                for (t = this._triggerEls[r].length; t--;) i = this._triggerEls[r][t], this._cleanElementTrigger(i, r);
            this._triggerEls = {}
        }, h.isInView = function() {
            return !!this._el && n(this._el)
        }, h.percentageInView = function() {
            return this._el ? o(this._el) : 0
        }, h.getElement = function() {
            return this._el
        }, h.getElementId = function() {
            return void 0 !== this._elId ? this._elId : (this._elId = this._el.getAttribute("id") || null, this._elId)
        }, h.destroy = function() {
            this._isShown && (this._isShown = null, this._el.classList.remove(r.CSS_CURRENT_ITEM, r.CSS_LAST_ITEM, r.CSS_NEXT_ITEM, r.CSS_PREVIOUS_ITEM), this._removeCurrentClassFromTriggers()), this.removeAllTriggers(), this._setTabIndexOnFocusableItems(null), this._el.removeAttribute("aria-hidden"), this._el.removeAttribute("role"), this._el.removeAttribute("aria-labelledby"), this._isACaption = null, this._triggerKeys = null, this._triggerEls = null, this._el = null
        }, h._addCurrentClassToTriggers = function() {
            var e, t, i;
            for (t in this._triggerEls)
                for (i = this._triggerEls[t].length; i--;) e = this._triggerEls[t][i], e.setAttribute("aria-selected", "true"), e.classList.add(u)
        }, h._removeCurrentClassFromTriggers = function() {
            var e, t, i;
            for (t in this._triggerEls)
                for (i = this._triggerEls[t].length; i--;) e = this._triggerEls[t][i], e.setAttribute("aria-selected", "false"), e.classList.remove(u)
        }, h._cleanElementTrigger = function(e, t) {
            e.removeAttribute("aria-selected"), e.removeAttribute("role"), e.removeAttribute("tabindex"), e.removeAttribute("aria-controls"), e.removeEventListener(t, this._onTriggered), this._isShown && e.classList.remove(u)
        }, h._onKeyboardInteraction = function(e) {
            this.isInView() && this._onTriggered(e)
        }, h._setTabIndexOnFocusableItems = function(e) {
            var t = null === e,
                i = [];
            this._currentTabbableEls = this._currentTabbableEls || s.getTabbableElements(this._el), t || (i = s.getTabbableElements(this._el), this._currentTabbableEls = i);
            for (var r = this._currentTabbableEls.length; r--;) t ? this._currentTabbableEls[r].removeAttribute("tabindex") : this._currentTabbableEls[r].setAttribute("tabindex", e)
        }, h._onTriggered = function(e) {
            e.preventDefault(), this.trigger(r.SELECTED, {
                item: this,
                interactionEvent: e
            })
        }, t.exports = r
    }, {
        "@marcom/ac-accessibility/helpers/TabManager": 2,
        "@marcom/ac-dom-metrics/getPercentInViewport": 58,
        "@marcom/ac-dom-metrics/isInViewport": 63,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-keyboard": 173,
        "@marcom/ac-keyboard/keyMap": 175,
        "@marcom/ac-polyfills/Array/from": void 0
    }],
    149: [function(e, t, i) {
        "use strict";
        var r = e("./helpers/extendProto"),
            n = e("./Gallery"),
            o = e("./auto/AutoGallery"),
            s = e("./fade/FadeGallery"),
            a = e("./fade/FadeItem"),
            l = e("./slide/SlideGallery"),
            c = e("./slide/SlideItem"),
            u = e("./Item");
        n.create = e("./factories/create"), n.autoCreate = e("./factories/autoCreate"), n.extend = r, o.extend = r, s.extend = r, a.extend = r, l.extend = r, c.extend = r, u.extend = r, t.exports = {
            Gallery: n,
            AutoGallery: o,
            FadeGallery: s,
            FadeGalleryItem: a,
            SlideGallery: l,
            SlideGalleryItem: c,
            Item: u,
            TabNav: e("./navigation/TabNav")
        }
    }, {
        "./Gallery": 147,
        "./Item": 148,
        "./auto/AutoGallery": 151,
        "./factories/autoCreate": 152,
        "./factories/create": 153,
        "./fade/FadeGallery": 154,
        "./fade/FadeItem": 155,
        "./helpers/extendProto": 156,
        "./navigation/TabNav": 159,
        "./slide/SlideGallery": 161,
        "./slide/SlideItem": 162
    }],
    150: [function(e, t, i) {
        "use strict";

        function r() {
            this._observers = {}
        }
        var n;
        try {
            n = e("ac-analytics").observer.Gallery
        } catch (o) {}
        var s = "data-analytics-gallery-id",
            a = r.prototype;
        a.add = function(e, t) {
            var i = e.getId();
            if (n && !this._observers[i]) {
                t = t || {}, t.galleryName || (t.galleryName = this._getAnalyticsId(e, t.dataAttribute) || i), t.beforeUpdateEvent || (t.beforeUpdateEvent = "update"), t.afterUpdateEvent || (t.afterUpdateEvent = "update:complete");
                var r = new n(e, t);
                r.gallery && (this._observers[i] = r)
            }
        }, a.remove = function(e) {
            var t = e.getId();
            n && this._observers[t] && ("function" == typeof this._observers[t].destroy && this._observers[t].destroy(), this._observers[t] = null)
        }, a._getAnalyticsId = function(e, t) {
            if ("function" == typeof e.getElement) {
                t = t || s;
                var i = e.getElement();
                return i.getAttribute(t) || i.getAttribute("id")
            }
            return null
        }, t.exports = r
    }, {
        "ac-analytics": void 0
    }],
    151: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (t = t || {}, !e || 1 !== e.nodeType) throw new Error(v);
            if (this._el = e, c.call(this, t), this._itemHeights = [], this._itemHeightsLookup = {}, this._tabNavDuration = t.tabNavDuration, this._tabNavPaddles = t.tabNavPaddles !== !1, this._isRightToLeft = void 0 === t.rightToLeft ? "rtl" === window.getComputedStyle(e).direction : t.rightToLeft, this._keyboardThrottleDelay = 1e3 * (void 0 === t.keyboardThrottleDelay ? _ : t.keyboardThrottleDelay), this._resizeContainer = !!t.resizeContainer, this._setUpContainerAutoResize(t.resizeContainerOnUpdate), this._createTabNav(), this._addPaddleNav(t.addPaddleNav), this._isACaptionsGallery = "" === e.getAttribute("data-ac-gallery-captions"), this._addItems(t.itemSelector || y), this._wrapAround || this._updatePaddleNavState(), t.enableArrowKeys !== !1 && (this._enableArrowKeys = !0, this._addKeyboardListener()), t.updateOnWindowResize !== !1 && (this._onWindowResize = this._onWindowResize.bind(this), window.addEventListener("resize", this._onWindowResize)), this._componentsContainer = document.getElementById(t.container), t.startAt && this._startAt(t.startAt), this.stopAutoPlay = this.stopAutoPlay.bind(this), t.autoPlay) {
                if (!this._componentsContainer) throw new Error(b);
                var i = "number" == typeof t.autoPlay ? t.autoPlay : d;
                this.startAutoPlay(i)
            }
            if (t.deeplink !== !1) {
                var r = this._getDeeplinkedItem();
                r && r !== this._currentItem && this.show(r)
            }
            if (this._containerResizeDuration !== !1) {
                var n = this._itemHeightsLookup[this._currentItem.getElementId()];
                n && this._setElHeight(n)
            }
            this._tabNav && this._tabNav.start(), this._setUpSwiping(t.touch && a(), t.desktopSwipe), this._componentsContainer && this._componentsContainer.setAttribute("tabIndex", -1);
            var o = e.getAttribute("data-related-gallery");
            if (o && (this._captionsContainer = document.querySelector(o)), t.enableCaptions) {
                if (!this._captionsContainer) throw new Error(E);
                this._captionsOptions = !!t.captionsOptions && t.captionsOptions, this.enableCaptions()
            }
        }
        e("@marcom/ac-polyfills/Array/from");
        var n = e("@marcom/ac-keyboard/keyMap"),
            o = e("./../helpers/inputHasFocus"),
            s = e("@marcom/ac-function/throttle"),
            a = e("@marcom/ac-feature/touchAvailable"),
            l = e("@marcom/ac-browser-prefixed"),
            c = e("./../Gallery"),
            u = e("@marcom/ac-keyboard"),
            h = e("@marcom/ac-pointer-tracker").PointerTracker,
            m = e("./../navigation/TabNav"),
            p = "disabled",
            d = 3,
            f = .5,
            y = "[data-ac-gallery-item]",
            _ = .12,
            g = e("../templates/paddlenav.js"),
            v = "No element supplied.",
            b = 'Container element needed when autoPlay is on. Use the "container" option when you instantiate your gallery.',
            E = 'Captions datatag needed when enableCaptions is on. Use the "data-related-gallery" tag (with an ID of the related captions container) on your gallery container to automatically use captions.';
        r.RESIZED = "resized", r.UPDATE = c.UPDATE, r.UPDATE_COMPLETE = c.UPDATE_COMPLETE;
        var w = c.prototype,
            S = r.prototype = Object.create(w);
        S.addItem = function(e, t) {
            if (e.nodeType) {
                var i = this._isACaptionsGallery;
                e = new this._itemType(e, {
                    isACaption: i
                })
            } else if (this._items.indexOf(e) > -1) return e;
            return this._resizeContainer && this._storeItemHeight(e, this._containerResizeDuration === !1), this._addItemTriggers(e), w.addItem.call(this, e, t)
        }, S.removeItem = function(e, t) {
            if (this._resizeContainer)
                for (var i = this._itemHeights.length; i--;) this._itemHeights[i].item === e && (this._itemHeights.splice(i, 1), 0 === i && this._itemHeights.length && this._setElHeight(this._itemHeights[0].height));
            return w.removeItem.call(this, e, t)
        }, S.startAutoPlay = function(e, t) {
            if (t = t || {}, this._isAutoPlaying = !0, this._autoPlayDelay = 1e3 * (e || d), this._cancelAutoPlayOnInteraction = void 0 === t.cancelOnInteraction || t.cancelOnInteraction, clearTimeout(this._autoPlayTimeoutId), this._autoPlayTimeoutId = setTimeout(this._onAutoPlayToNextItem.bind(this), this._autoPlayDelay), this._cancelAutoPlayOnInteraction && this.on(c.UPDATE, this.stopAutoPlay), !this._componentsContainer) throw new Error(b);
            this._componentsContainer.addEventListener("focus", this.stopAutoPlay, !0), this._componentsContainer.addEventListener("touchend", this.stopAutoPlay, !0), this._componentsContainer.addEventListener("click", this.stopAutoPlay, !0)
        }, S.stopAutoPlay = function() {
            this._isAutoPlaying = !1, clearTimeout(this._autoPlayTimeoutId), this._cancelAutoPlayOnInteraction && this.off(c.UPDATE, this.stopAutoPlay), this._componentsContainer && (this._componentsContainer.removeEventListener("focus", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("touchend", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("click", this.stopAutoPlay, !0))
        }, S.getElement = function() {
            return this._el
        }, S.getTabNav = function() {
            return this._tabNav || null
        }, S.resize = function(e, t) {
            if (this._resizeContainer) {
                this._itemHeights = [];
                for (var i = this._items.length; i--;) this._storeItemHeight(this._items[i], !1);
                this._containerResizeDuration !== !1 ? this._setElHeight(this._itemHeightsLookup[this._currentItem.getElementId()]) : this._setElHeight(this._itemHeights[0].height)
            }
            this._tabNav && this._tabNav.resize(), this.trigger(r.RESIZED, this)
        }, S.enableKeyboard = function() {
            this._enableArrowKeys || (this._enableArrowKeys = !0, this._addKeyboardListener())
        }, S.disableKeyboard = function() {
            this._enableArrowKeys && (this._enableArrowKeys = !1, u.offDown(n.ARROW_RIGHT, this._rightArrowFunc), u.offDown(n.ARROW_LEFT, this._leftArrowFunc))
        }, S.enableTouch = function() {
            this._touchSwipe || this._setUpSwiping(!0, !1)
        }, S.disableTouch = function() {
            this._touchSwipe && (this._touchSwipe.off(h.END, this._onSwipeEnd), this._touchSwipe.destroy(), this._touchSwipe = null)
        }, S.enableDesktopSwipe = function() {
            this._clickSwipe || this._setUpSwiping(!1, !0)
        }, S.disableDesktopSwipe = function() {
            this._clickSwipe && (this._clickSwipe.off(h.END, this._onSwipeEnd), this._clickSwipe.destroy(), this._clickSwipe = null)
        }, S.enableCaptions = function() {
            this._galleryWithCaptions || this._initCaptionsGallery(this._captionsContainer, this._captionsOptions)
        }, S.disableCaptions = function() {
            this._galleryWithCaptions && this._galleryWithCaptions.destroy()
        }, S.destroy = function(e) {
            this._isAutoPlaying && this.stopAutoPlay(), this._componentsContainer && (this._componentsContainer.removeEventListener("focus", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("touchend", this.stopAutoPlay, !0), this._componentsContainer.removeEventListener("click", this.stopAutoPlay, !0)), this._resizeContainer && (this._el.style.height = null, this._el.style[l.transition] = null), this._enableArrowKeys && (u.offDown(n.ARROW_RIGHT, this._rightArrowFunc), u.offDown(n.ARROW_LEFT, this._leftArrowFunc));
            var t;
            if (this._previousButtons) {
                for (t = this._previousButtons.length; t--;) this._previousButtons[t].removeEventListener("click", this._onPaddlePrevious);
                this._setPaddleDisabledState(this._previousButtons, !1)
            }
            if (this._nextButtons) {
                for (t = this._nextButtons.length; t--;) this._nextButtons[t].removeEventListener("click", this._onPaddleNext);
                this._setPaddleDisabledState(this._nextButtons, !1)
            }
            return this._dynamicPaddleNav && this._el.removeChild(this._dynamicPaddleNav), this._hasPaddleNavStateHandler && this.off(c.UPDATE, this._updatePaddleNavState), this.disableTouch(), this.disableDesktopSwipe(), this.disableCaptions(), this._tabNav && (this._tabNav.destroy(), this._tabNav = null), window.removeEventListener("resize", this._onWindowResize), this._el = null, this._itemHeights = null, this._itemHeightsLookup = null, this._resizeContainer = null, this._isRightToLeft = null, this._enableArrowKeys = null, this._previousButtons = null, this._onPaddlePrevious = null, this._nextButtons = null, this._onPaddleNext = null, this._isACaptionsGallery = null, this._componentsContainer = null, this._galleryWithCaptions = null, this._captionsContainer = null, this._captionsOptions = null, w.destroy.call(this, e)
        }, S._getDeeplinkedItem = function() {
            for (var e, t = window.location.hash.substr(1), i = this._items.length; i--;)
                if (e = this._items[i], t === e.getElementId()) return e;
            return null
        }, S._addItems = function(e) {
            var t, i = this._el.querySelectorAll(e),
                r = 0,
                n = i.length,
                o = this._isACaptionsGallery;
            for (r; r < n; r++) t = new this._itemType(i[r], {
                isACaption: o
            }), this.addItem(t), this._addItemTriggers(t)
        }, S._createTabNav = function() {
            var e = this._getElementId(),
                t = '[data-ac-gallery-tabnav="' + e + '"]',
                i = document.querySelector(t);
            i && (this._tabNav = new m(i, this, {
                duration: this._tabNavDuration,
                usePaddles: this._tabNavPaddles
            }))
        }, S._addItemTriggers = function(e, t) {
            var i = Array.from(document.querySelectorAll('[data-ac-gallery-trigger="' + e.getElementId() + '"]'));
            t && t.length && (i = i.concat(t));
            var r = 0,
                n = i.length;
            for (r; r < n; r++) e.addElementTrigger(i[r]), this._tabNav && this._tabNav.addTrigger(i[r], e)
        }, S._addPaddleNav = function(e) {
            var t, i = this._getElementId();
            if (e) {
                var r = "string" == typeof e ? e : g;
                r = r.replace(/%ID%/g, this._getElementId()), this._dynamicPaddleNav = document.createElement("div"), this._dynamicPaddleNav.innerHTML = r, this._el.insertBefore(this._dynamicPaddleNav, this._el.firstChild)
            }
            this._previousButtons = document.querySelectorAll('[data-ac-gallery-previous-trigger="' + i + '"]'), this._nextButtons = document.querySelectorAll('[data-ac-gallery-next-trigger="' + i + '"]');
            var n = this._el.getAttribute("aria-label") || "";
            if (n.length && (n = "(" + n + ")"), this._onPaddlePrevious = this._onPaddleInteraction.bind(null, this.showPrevious), t = this._previousButtons.length) {
                var o = this._el.getAttribute("data-ac-gallery-previouslabel");
                for (o && n.length && (this._isRightToLeft ? o = n + " " + o : o += " " + n); t--;) o && null === this._previousButtons[t].getAttribute("aria-label") && this._previousButtons[t].setAttribute("aria-label", o), this._previousButtons[t].addEventListener("click", this._onPaddlePrevious)
            }
            if (this._onPaddleNext = this._onPaddleInteraction.bind(null, this.showNext), t = this._nextButtons.length) {
                var s = this._el.getAttribute("data-ac-gallery-nextlabel");
                for (s && n.length && (this._isRightToLeft ? s = n + " " + s : s += " " + n); t--;) s && null === this._nextButtons[t].getAttribute("aria-label") && this._nextButtons[t].setAttribute("aria-label", s), this._nextButtons[t].addEventListener("click", this._onPaddleNext)
            }(this._nextButtons.length || this._previousButtons.length) && (this._hasPaddleNavStateHandler = !0, this._updatePaddleNavState = this._updatePaddleNavState.bind(this), this.on(c.UPDATE, this._updatePaddleNavState))
        }, S._onPaddleInteraction = function(e, t) {
            t.preventDefault(), e.call(null, {
                interactionEvent: t
            })
        }, S._updatePaddleNavState = function() {
            if (this._wrapAround) this._setPaddleDisabledState(this._previousButtons, !1), this._setPaddleDisabledState(this._nextButtons, !1);
            else {
                var e = this._items.indexOf(this._currentItem);
                0 === e && this._previousButtons.length ? (this._setPaddleDisabledState(this._previousButtons, !0), this._setPaddleDisabledState(this._nextButtons, !1)) : e === this._items.length - 1 && this._nextButtons.length ? (this._setPaddleDisabledState(this._nextButtons, !0), this._setPaddleDisabledState(this._previousButtons, !1)) : (this._setPaddleDisabledState(this._previousButtons, !1), this._setPaddleDisabledState(this._nextButtons, !1))
            }
        }, S._setPaddleDisabledState = function(e, t) {
            for (var i = e.length; i--;) e[i].disabled = t, t ? e[i].classList.add(p) : e[i].classList.remove(p)
        }, S._addKeyboardListener = function() {
            if (this._enableArrowKeys) {
                this._onKeyboardInteraction = this._onKeyboardInteraction.bind(this);
                var e, t;
                this._isRightToLeft ? (e = this.showPrevious, t = this.showNext) : (e = this.showNext, t = this.showPrevious), this._rightArrowFunc = s(this._onKeyboardInteraction.bind(null, e), this._keyboardThrottleDelay), this._leftArrowFunc = s(this._onKeyboardInteraction.bind(null, t), this._keyboardThrottleDelay), u.onDown(n.ARROW_RIGHT, this._rightArrowFunc), u.onDown(n.ARROW_LEFT, this._leftArrowFunc)
            }
        }, S._onKeyboardInteraction = function(e, t) {
            if (this.isInView() && !o()) {
                var i = c.getAllInView();
                if (i.length > 1 && (i.sort(function(e, t) {
                        return e = e._enableArrowKeys ? e.getCurrentItem().percentageInView() : 0, t = t._enableArrowKeys ? t.getCurrentItem().percentageInView() : 0, t - e
                    }), this !== i[0])) return;
                e.call(null, {
                    interactionEvent: t
                })
            }
        }, S._setUpSwiping = function(e, t) {
            this._onSwipeEnd = this._onSwipeEnd.bind(this), e && (this._touchSwipe = new h(this._el, h.TOUCH_EVENTS), this._touchSwipe.on(h.END, this._onSwipeEnd)), t && (this._clickSwipe = new h(this._el, h.MOUSE_EVENTS), this._clickSwipe.on(h.END, this._onSwipeEnd))
        }, S._onSwipeEnd = function(e) {
            var t, i, r = e.interactionEvent,
                n = "touchend" !== r.type || "touchstart" !== r.type || "touchmove" !== r.type;
            n && (i = {
                type: "touchmove",
                target: r.target,
                srcElement: r.srcElement
            });
            var o = {
                interactionEvent: i || r
            };
            return e.swipe === h.SWIPE_RIGHT ? t = this._isRightToLeft ? this.showNext : this.showPrevious : e.swipe === h.SWIPE_LEFT && (t = this._isRightToLeft ? this.showPrevious : this.showNext), t ? t.call(this, o) : (r = null, null)
        }, S._getElementId = function() {
            return void 0 === this._elementId && (this._elementId = this._el.getAttribute("id")), this._elementId
        }, S._setUpContainerAutoResize = function(e) {
            "number" == typeof e ? this._containerResizeDuration = e : e ? this._containerResizeDuration = f : this._containerResizeDuration = !1, this._containerResizeDuration !== !1 && (this._resizeContainer = !0, this._updateContainerSize = this._updateContainerSize.bind(this), this.on(c.UPDATE, this._updateContainerSize))
        }, S._updateContainerSize = function(e) {
            var t = this._itemHeightsLookup[e.incoming[0].getElementId()];
            t && this._setElHeight(t, this._containerResizeDuration)
        }, S._storeItemHeight = function(e, t) {
            this._itemHeights.push({
                item: e,
                height: e.getElement().scrollHeight
            }), this._itemHeightsLookup[e.getElementId()] = e.getElement().scrollHeight, this._itemHeights.sort(function(e, t) {
                return t.height - e.height
            }), t && this._itemHeights[0].item === e && this._setElHeight(e.getElement().scrollHeight)
        }, S._setElHeight = function(e, t) {
            null !== t && "number" == typeof t && (this._el.style[l.transition] = "height " + t + "s"), this._el.style.height = e + "px"
        }, S._initCaptionsGallery = function(e, t) {
            e && (this._galleryWithCaptions = c.create(e, "fade", t ? t : {
                crossFade: !0
            }), this._enableArrowKeys && (this._galleryWithCaptions._enableArrowKeys = !1), this.on(c.UPDATE, function(e) {
                var t = this.getItemIndex(e.incoming[0]);
                this._galleryWithCaptions.show(t)
            }.bind(this)))
        }, S._onAutoPlayToNextItem = function() {
            if (this._isAutoPlaying)
                if (!document.hidden && this._currentItem.isInView()) {
                    this._cancelAutoPlayOnInteraction && this.off(c.UPDATE, this.stopAutoPlay);
                    var e = this.showNext();
                    null !== e && (this._cancelAutoPlayOnInteraction && this.on(c.UPDATE, this.stopAutoPlay), clearTimeout(this._autoPlayTimeoutId), this._autoPlayTimeoutId = setTimeout(this._onAutoPlayToNextItem.bind(this), this._autoPlayDelay))
                } else clearTimeout(this._autoPlayTimeoutId), this._autoPlayTimeoutId = setTimeout(this._onAutoPlayToNextItem.bind(this), this._autoPlayDelay)
        }, S._onWindowResize = function(e) {
            window.requestAnimationFrame(function() {
                this._el && this.resize()
            }.bind(this))
        }, t.exports = r
    }, {
        "../templates/paddlenav.js": 164,
        "./../Gallery": 147,
        "./../helpers/inputHasFocus": 158,
        "./../navigation/TabNav": 159,
        "@marcom/ac-browser-prefixed": 11,
        "@marcom/ac-feature/touchAvailable": 142,
        "@marcom/ac-function/throttle": 146,
        "@marcom/ac-keyboard": 173,
        "@marcom/ac-keyboard/keyMap": 175,
        "@marcom/ac-pointer-tracker": 189,
        "@marcom/ac-polyfills/Array/from": void 0
    }],
    152: [function(e, t, i) {
        "use strict";
        var r = e("./create"),
            n = e("./../Gallery");
        t.exports = function(e) {
            e = e || {};
            var t, i, o = e.context || document.body;
            for (t = o.querySelectorAll(n.SLIDE_SELECTOR), i = t.length; i--;) r(t[i], n.SLIDE, e);
            for (t = o.querySelectorAll(n.FADE_SELECTOR), i = t.length; i--;) r(t[i], n.FADE, e);
            return n.getAll()
        }
    }, {
        "./../Gallery": 147,
        "./create": 153
    }],
    153: [function(e, t, i) {
        "use strict";
        var r = e("./../fade/FadeGallery"),
            n = e("./../Gallery"),
            o = e("./../slide/SlideGallery"),
            s = "%TYPE% is not a supported gallery type and el has no gallery data attribute.",
            a = n.FADE_SELECTOR.replace(/\[|\]/g, ""),
            l = n.SLIDE_SELECTOR.replace(/\[|\]/g, "");
        t.exports = function(e, t, i) {
            var c;
            if ("string" == typeof t && (t === n.SLIDE ? c = o : t === n.FADE && (c = r)), void 0 === c && (null !== e.getAttribute(l) ? c = o : null !== e.getAttribute(a) && (c = r)), void 0 === c) throw new Error(s.replace(/%TYPE%/g, t));
            return new c(e, i)
        }
    }, {
        "./../Gallery": 147,
        "./../fade/FadeGallery": 154,
        "./../slide/SlideGallery": 161
    }],
    154: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (t = Object.assign({}, t), t.itemType = t.itemType || n, this._fadeDuration = void 0 !== t.duration ? t.duration : s, t.tabNavDuration = void 0 !== t.tabNavDuration ? t.tabNavDuration : this._fadeDuration, this._crossFade = t.crossFade, this._zIndexBase = t.startZIndex || 1, this._ease = t.ease, t.resizeContainerOnUpdate === !0 && (t.resizeContainerOnUpdate = this._fadeDuration), this._onItemShowComplete = this._onItemShowComplete.bind(this), o.call(this, e, t), t.startZIndex)
                for (var i, r = this._items.length; r--;) i = this._items[r], i.getElement().style.zIndex = this._zIndexBase;
            this._currentItem && this._currentItem.fadeIn(0, this._ease, this._zIndexBase + l)
        }
        e("@marcom/ac-polyfills/Object/assign");
        var n = e("./FadeItem"),
            o = e("./../auto/AutoGallery"),
            s = .5,
            a = 1,
            l = 2;
        r.RESIZED = o.RESIZED, r.UPDATE = o.UPDATE, r.UPDATE_COMPLETE = o.UPDATE_COMPLETE;
        var c = o.prototype,
            u = r.prototype = Object.create(c);
        u.addItem = function(e, t) {
            e.nodeType && (e = new this._itemType(e));
            var i = c.addItem.call(this, e, t);
            return e !== this._currentItem ? e.fadeOut() : e.fadeIn(0), i
        }, u.destroy = function(e) {
            var t = c.destroy.call(this, e);
            return this._fadeDuration = null, this._crossFade = null, this._zIndexBase = null, this._ease = null, this._onItemShowComplete = null, t
        }, u._startAt = function(e) {
            var t = this._items[e];
            t && this._currentItem !== t && (this._currentItem.fadeOut(0), this._currentItem.hide(), this._setCurrentItem(t), this._currentItem.show(), this._currentItem.fadeIn(0), this.trigger(r.UPDATE, this._items))
        }, u._onItemShowComplete = function(e) {
            return e && e.target() !== this._currentItem.getElement() ? void(this._currentItem.isFading() || (this._prepareForTransition(), this._currentItem.fadeIn(this._fadeDuration, this._ease, this._zIndexBase + l, this._onItemShowComplete))) : (this._prepareForTransition(!0), this._currentItem.getElement().style.zIndex = this._zIndexBase, void(this._incomingOutgoingItems && this.trigger(r.UPDATE_COMPLETE, this._incomingOutgoingItems)))
        }, u._updateItems = function(e) {
            if (this._itemChanged) {
                if (this._crossFade) {
                    this._prepareForTransition();
                    var t = function() {
                        this.trigger(r.UPDATE_COMPLETE, e), this._itemChanged = !1
                    }.bind(this);
                    e.outgoing[0].fadeOut(.99 * this._fadeDuration, this._ease), e.incoming[0].fadeIn(this._fadeDuration, this._ease, this._zIndexBase + l, t)
                } else this._incomingOutgoingItems = e, e.outgoing[0].isFading() || (this._prepareForTransition(), e.incoming[0].fadeIn(this._fadeDuration, this._ease, this._zIndexBase + l, this._onItemShowComplete));
                e.outgoing[0].hide(), e.incoming[0].show()
            }
        }, u._prepareForTransition = function(e) {
            for (var t, i = this._items.length; i--;) t = this._items[i], t !== this._currentItem && (e && t.fadeOut(), t.getElement().style.zIndex = this._zIndexBase);
            this._lastItem._el.style.zIndex = this._zIndexBase + a
        }, t.exports = r
    }, {
        "./../auto/AutoGallery": 151,
        "./FadeItem": 155,
        "@marcom/ac-polyfills/Object/assign": void 0
    }],
    155: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            a.call(this, e, t), e.style.position = "absolute"
        }
        var n = e("@marcom/ac-solar/fade"),
            o = e("@marcom/ac-solar/fadeIn"),
            s = e("@marcom/ac-solar/fadeOut"),
            a = e("./../Item");
        r.SELECTED = a.SELECTED, r.SHOW = a.SHOW, r.HIDE = a.HIDE;
        var l = a.prototype,
            c = r.prototype = Object.create(l);
        c.fadeIn = function(e, t, i, r) {
            this._el.style.zIndex = i || 1, e ? (this._destroyCurrentClip(), this._clip = n(this._el, 0, 1, e, {
                ease: t,
                onComplete: r
            })) : o(this._el, 0)
        }, c.fadeOut = function(e, t) {
            e ? (this._destroyCurrentClip(), this._clip = s(this._el, e, {
                ease: t
            })) : s(this._el, 0)
        }, c.isFading = function() {
            return !(!this._clip || !this._clip.playing())
        }, c.destroy = function() {
            this._el.style.position = null, this._el.style.opacity = null, this._el.style.zIndex = null, l.destroy.call(this), this._destroyCurrentClip(), this._clip = null
        }, c._destroyCurrentClip = function() {
            this._clip && this._clip._el && this._clip.destroy()
        }, t.exports = r
    }, {
        "./../Item": 148,
        "@marcom/ac-solar/fade": 224,
        "@marcom/ac-solar/fadeIn": 225,
        "@marcom/ac-solar/fadeOut": 226
    }],
    156: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Object/assign"), t.exports = function(e) {
            var t = this,
                i = function() {
                    t.apply(this, arguments)
                },
                r = Object.create(this.prototype);
            return i.prototype = Object.assign(r, e), Object.assign(i, this), i
        }
    }, {
        "@marcom/ac-polyfills/Object/assign": void 0
    }],
    157: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t) {
            var i = window.getComputedStyle(e),
                r = t ? e.clientWidth : e.scrollWidth;
            return Math.round(r + parseFloat(i.marginRight) + parseFloat(i.marginLeft))
        }
    }, {}],
    158: [function(e, t, i) {
        "use strict";
        t.exports = function() {
            var e = ["input", "select", "textarea"];
            return e.indexOf(document.activeElement.nodeName.toLowerCase()) > -1
        }
    }, {}],
    159: [function(e, t, i) {
        "use strict";

        function r(e, t, i) {
            i = i || {}, this._el = e, this._gallery = t, this._triggers = {}, this._ordered = [], i.scrollDuration = "undefined" == typeof i.duration ? l : i.duration, this.tabnav = new o(e, i), s.call(this)
        }
        var n = e("@marcom/ac-dom-traversal/ancestors"),
            o = e("@marcom/ac-tabnav"),
            s = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            a = e("./../Gallery"),
            l = .5,
            c = s.prototype,
            u = r.prototype = Object.create(c);
        u.start = function() {
            this._onWindowLoad = this._onWindowLoad.bind(this), this._onGalleryUpdated = this._onGalleryUpdated.bind(this), this._gallery.on(a.UPDATE, this._onGalleryUpdated), this.resize(), window.addEventListener("load", this._onWindowLoad)
        }, u.addTrigger = function(e, t) {
            if (void 0 === this._triggers[t.getElementId()]) {
                var i = n(e);
                if (i.indexOf(this._el) > -1) {
                    var r = {
                        el: e
                    };
                    this._triggers[t.getElementId()] = r, this._ordered.push(r)
                }
            }
        }, u.resize = function() {
            var e;
            this._ordered.length && this.tabnav._wrapper.scrollWidth > this.tabnav.el.scrollWidth && (e = this._triggers[this._gallery.getCurrentItem().getElementId()], e && this.tabnav.centerItem(e.el))
        }, u.destroy = function() {
            return this._gallery.off(a.UPDATE, this._onGalleryUpdated), window.removeEventListener("load", this._onWindowLoad), this._el = null, this._gallery = null, this._triggers = null, this._ordered = null, this._clip = null, c.destroy.call(this)
        }, u._onWindowLoad = function() {
            window.removeEventListener("load", this._onWindowLoad), this.resize()
        }, u._onGalleryUpdated = function(e) {
            var t = this._triggers[e.incoming[0].getElementId()];
            t && this.tabnav.centerItem(t.el)
        }, t.exports = r
    }, {
        "./../Gallery": 147,
        "@marcom/ac-dom-traversal/ancestors": 79,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-tabnav": 229
    }],
    160: [function(e, t, i) {
        "use strict";
        var r = e("./../analytics/AnalyticsManager");
        t.exports = new r
    }, {
        "./../analytics/AnalyticsManager": 150
    }],
    161: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            t = Object.assign({}, t), t.itemType = t.itemType || c, this._itemsPerSlide = t.itemsPerSlide || 1;
            var i = t.deeplink !== !1;
            if (t.deeplink = !1, this._slideDuration = void 0 !== t.duration ? t.duration : m, t.tabNavDuration = void 0 !== t.tabNavDuration ? t.tabNavDuration : this._slideDuration, this._itemCenterPoint = void 0 !== t.itemCenterPoint ? t.itemCenterPoint : h, this._edgePullResistance = t.edgePullResistance ? t.edgePullResistance : p, this._useClientWidthForItemWidth = t.useItemClientWidth || !1, this._slideOptions = {
                    ease: t.ease
                }, t.resizeContainerOnUpdate === !0 && (t.resizeContainerOnUpdate = this._slideDuration), t.touch = t.touch !== !1, this._originalWrapAround = t.wrapAround || !1, a.call(this, e, t), i) {
                var r = this._getDeeplinkedItem();
                r && this._currentItem !== r && (this._currentItem.hide(), this._setCurrentItem(r), this._currentItem.show())
            }
            this._positionItems = this._positionItems.bind(this), this._createContainer(), 0 !== this._items.length && this._positionItems(), this._isInstantiated = !0
        }
        e("@marcom/ac-polyfills/Array/from"), e("@marcom/ac-polyfills/Object/assign");
        var n = e("./../helpers/getElementFullWidth"),
            o = e("@marcom/ac-solar/moveX"),
            s = e("@marcom/ac-browser-prefixed"),
            a = e("./../auto/AutoGallery"),
            l = e("@marcom/ac-pointer-tracker").PointerTracker,
            c = e("./SlideItem"),
            u = e("./SlideItemWrapper"),
            h = .5,
            m = .5,
            p = !0;
        r.RESIZED = a.RESIZED, r.UPDATE = a.UPDATE, r.UPDATE_COMPLETE = a.UPDATE_COMPLETE;
        var d = a.prototype,
            f = r.prototype = Object.create(d);
        f.addItem = function(e, t) {
            e.nodeType && (e = new this._itemType(e));
            var i = d.addItem.call(this, e, t);
            return void 0 !== this._containerEl && (this._addItemToContainer(e), this._positionItems()), this._updateWrapAround(), i
        }, f.removeItem = function(e, t) {
            if (this._containerEl && e.getElement().parentElement === this._containerEl) {
                var i = e.getOriginalParentElement();
                i ? i.appendChild(e.getElement()) : "function" == typeof e.removeItems && (e.removeItems(), t.destroyItem = !0);
                var r = d.removeItem.call(this, e, t);
                return this._currentItem && this._positionItems(this._currentItem), this._updateWrapAround(), r
            }
            return d.removeItem.call(this, e, t)
        }, f.resize = function() {
            return this._positionItems(), this._snapToPosition(this._currentItem.position()), d.resize.call(this)
        }, f.destroy = function(e) {
            this._destroyCurrentClip(), this._clip = null;
            for (var t = this._items.length; t--;) this._items[t].off(c.CENTER_POINT_CHANGED, this._positionItems);
            this._touchSwipe && (this._touchSwipe.off(l.START, this._onSwipeStart), this._touchSwipe.off(l.UPDATE, this._onSwipeUpdate)), this._clickSwipe && (this._clickSwipe.off(l.START, this._onSwipeStart), this._clickSwipe.off(l.UPDATE, this._onSwipeUpdate));
            var i = this._el,
                r = d.destroy.call(this, e);
            return i.removeChild(this._containerEl), this._containerEl = null, this._slideDuration = null, this._itemCenterPoint = null, this._positionItems = null, this._slideOptions = null, r
        }, f._addItems = function(e) {
            if (this._itemsPerSlide > 1) {
                var t, i, r, n = this._el.querySelectorAll(e),
                    o = 0,
                    s = 0,
                    a = n.length;
                for (s; s < a; s++) 0 === o && (t = new u(this._useClientWidthForItemWidth)), t.addItem(n[s]), r = n[s].getAttribute("id"), r && (i = Array.from(document.querySelectorAll("[data-ac-gallery-trigger=" + r + "]")), this._addItemTriggers(t, i)), ++o !== this._itemsPerSlide && s !== a - 1 || (o = 0, t.resize(), this.addItem(t))
            } else d._addItems.call(this, e)
        }, f._createContainer = function() {
            this._containerEl = document.createElement("div"), this._containerEl.classList.add("ac-gallery-slidecontainer"), this._containerEl.style.position = "absolute", this._containerEl.style.top = "0", this._containerEl.style.left = "0", this._containerEl.style.width = "100%", this._containerEl.style.height = "100%", this._el.appendChild(this._containerEl);
            var e = 0,
                t = this._items.length;
            for (e; e < t; e++) this._addItemToContainer(this._items[e])
        }, f._addItemToContainer = function(e) {
            this._containerEl.appendChild(e.getElement()), this._resizeContainer && this._itemsPerSlide > 1 && this._storeItemHeight(e, this._containerResizeDuration === !1), e.on(c.CENTER_POINT_CHANGED, this._positionItems)
        }, f._positionItems = function(e) {
            e = e || this._currentItem;
            var t = this._items;
            this._wrapAround && (t = this._shuffleItems());
            var i, r, o, s, a, l = this._getActualPositionX() - e.position() || 0,
                c = parseInt(window.getComputedStyle(this._el).width, 10),
                u = 0,
                h = 0,
                m = t.length;
            for (h; h < m; h++) i = t[h], i.resize(), r = i.getElement(), r.style.left = u + "px", o = n(r, this._useClientWidthForItemWidth), s = c - o, a = i.centerPoint && null !== i.centerPoint() ? i.centerPoint() : this._itemCenterPoint, i.position(u * -1 + s * a), this._isRightToLeft ? u -= o : u += o;
            u = e.position() + l, this._snapToPosition(u)
        }, f._getActualPositionX = function() {
            var e = window.getComputedStyle(this._containerEl)[s.transform];
            if (e === this._transformStyles && void 0 !== this._actualPositionX) return this._actualPositionX;
            this._transformStyles = e;
            var t = this._transformStyles.split(",");
            return this._actualPositionX = t[4] || this._currentItem.position(), 1 * this._actualPositionX
        }, f._snapToPosition = function(e) {
            this._destroyCurrentClip(), this._positionX = e, this._containerEl.style[s.transition] = "transform 0s, left 0s", o(this._containerEl, e, 0, this._slideOptions)
        }, f._slideToPosition = function(e, t, i) {
            this._positionX = e, this._clip = o(this._containerEl, e, t, {
                ease: this._slideOptions.ease,
                onComplete: i
            })
        }, f._setUpSwiping = function(e, t) {
            var i = d._setUpSwiping.call(this, e, t);
            return this._onSwipeStart = this._onSwipeStart.bind(this), this._onSwipeUpdate = this._onSwipeUpdate.bind(this), this._touchSwipe && (this._touchSwipe.on(l.START, this._onSwipeStart), this._touchSwipe.on(l.UPDATE, this._onSwipeUpdate)), this._clickSwipe && (this._clickSwipe.on(l.START, this._onSwipeStart), this._clickSwipe.on(l.UPDATE, this._onSwipeUpdate)), i
        }, f._onSwipeStart = function(e) {
            this._clip && this._clip.playing() && (this._destroyCurrentClip(), this._positionX = this._getActualPositionX())
        }, f._onSwipeUpdate = function(e) {
            this._destroyCurrentClip();
            var t = this.getItems().slice(-1)[0].position(),
                i = this._positionX > 0 || this._positionX < t,
                r = e.diffX;
            this._edgePullResistance && !this._wrapAround && i && (r *= .5), this._snapToPosition(this._positionX - r)
        }, f._onSwipeEnd = function(e) {
            var t = d._onSwipeEnd.call(this, e);
            return null === t && (t = this.show(this._currentItem, {
                interactionEvent: e.interactionEvent
            })), t
        }, f._shuffleItems = function() {
            var e = 2 === this._items.length && !this._isAutoPlaying;
            if (e) return this._items.slice();
            var t, i, r, n = this._items.length,
                o = this._items.indexOf(this._currentItem),
                s = Math.floor(.5 * n);
            if (o < s) {
                t = s - o;
                var a = n - t;
                return i = this._items.slice(a), r = this._items.slice(0, a), i.concat(r)
            }
            return o > s ? (t = o - s, i = this._items.slice(0, t), r = this._items.slice(t), r.concat(i)) : this._items
        }, f._storeItemHeight = function(e, t) {
            var i;
            if (this._itemsPerSlide > 1) {
                for (var r = [], n = 0; n < e.getElement().children.length; n++) r.push(e.getElement().children[n].scrollHeight);
                i = Math.max.apply(null, r)
            } else i = e.getElement().scrollHeight;
            i && (this._itemHeights.push({
                item: e,
                height: i
            }), this._itemHeightsLookup[e.getElementId()] = i, this._itemHeights.sort(function(e, t) {
                return t.height - e.height
            }), t && this._itemHeights[0].item === e && this._setElHeight(i))
        }, f._updateItems = function(e) {
            if (this._destroyCurrentClip(), this._wrapAround && this._positionItems(e.outgoing[0]), this.getItemIndex(e.outgoing[0]) > -1) {
                var t = this._itemChanged ? function() {
                        this.trigger(r.UPDATE_COMPLETE, e), this._itemChanged = !1
                    }.bind(this) : null,
                    i = this._slideDuration;
                this._slideToPosition(e.incoming[0].position(), i, t), e.incoming[0] !== e.outgoing[0] && (e.incoming[0].show(), e.outgoing[0].hide())
            } else this._slideToPosition(this._currentItem.position(), this._slideDuration), e.incoming[0].show(), this._itemChanged && (this.trigger(r.UPDATE_COMPLETE, e), this._itemChanged = !1)
        }, f._updateWrapAround = function() {
            this._items.length <= 2 ? this._wrapAround = !1 : this._originalWrapAround && (this._wrapAround = this._originalWrapAround), this._isInstantiated && (this._previousButtons || this._nextButtons) && this._updatePaddleNavState()
        }, f._destroyCurrentClip = function() {
            this._clip && this._clip.playing() && this._clip.destroy()
        }, t.exports = r
    }, {
        "./../auto/AutoGallery": 151,
        "./../helpers/getElementFullWidth": 157,
        "./SlideItem": 162,
        "./SlideItemWrapper": 163,
        "@marcom/ac-browser-prefixed": 11,
        "@marcom/ac-pointer-tracker": 189,
        "@marcom/ac-polyfills/Array/from": void 0,
        "@marcom/ac-polyfills/Object/assign": void 0,
        "@marcom/ac-solar/moveX": 228
    }],
    162: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            o.call(this, e, t), e.style.position = "absolute", e.style[n.transform] = "translateZ(0)", this._parentElement = e.parentElement
        }
        var n = e("@marcom/ac-browser-prefixed"),
            o = e("./../Item");
        r.CENTER_POINT_CHANGED = "centerpointchanged", r.SELECTED = o.SELECTED, r.SHOW = o.SHOW, r.HIDE = o.HIDE;
        var s = o.prototype,
            a = r.prototype = Object.create(s);
        a.position = function(e) {
            return void 0 !== e && (this._position = e), this._position || 0
        }, a.centerPoint = function(e) {
            return void 0 !== e && (this._centerPoint = e, this.trigger(r.CENTER_POINT_CHANGED)), void 0 !== this._centerPoint ? this._centerPoint : null
        }, a.getOriginalParentElement = function() {
            return this._parentElement
        }, a.resize = function() {}, a.destroy = function() {
            this._el.style.position = null, this._el.style.left = null, this._el.style[n.transform] = null, s.destroy.call(this)
        }, t.exports = r
    }, {
        "./../Item": 148,
        "@marcom/ac-browser-prefixed": 11
    }],
    163: [function(e, t, i) {
        "use strict";

        function r(e) {
            o.call(this, document.createElement("div")), this._useClientWidthForItemWidth = e, this._items = [], this._currentWidth = 0, this._el.classList.add(s)
        }
        e("@marcom/ac-polyfills/Array/from");
        var n = e("./../helpers/getElementFullWidth"),
            o = e("./SlideItem"),
            s = "ac-gallery-slideitemwrapper",
            a = o.prototype,
            l = r.prototype = Object.create(a);
        l.addItem = function(e) {
            this._items.push({
                el: e,
                parentElement: e.parentElement
            }), this._el.appendChild(e);
            var t = e.getAttribute("id");
            if (t) {
                var i = this._el.getAttribute("id") || "",
                    r = i.length ? "-" : "";
                i += r + t, this._el.setAttribute("id", i)
            }
        }, l.removeItems = function() {
            var e, t, i = 0,
                r = this._items.length;
            for (i; i < r; i++) e = this._items[i].el, e.style.position = null, e.style.left = null, t = this._items[i].parentElement, t && t.appendChild(e)
        }, l.resize = function() {
            this._currentWidth = 0;
            var e, t = 0,
                i = this._items.length,
                r = "rtl" === document.dir ? "right" : "left";
            for (t; t < i; t++) e = this._items[t].el, e.style.position = "absolute", e.style[r] = this._currentWidth + "px", this._currentWidth += n(e, this._useClientWidthForItemWidth);
            this._el.style.width = this._currentWidth + "px"
        }, l.destroy = function() {
            this.removeItems(), this._items = null, this._currentWidth = null;
            var e = this._el.parentElement;
            e && e.removeChild(this._el), a.destroy.call(this)
        }, t.exports = r
    }, {
        "./../helpers/getElementFullWidth": 157,
        "./SlideItem": 162,
        "@marcom/ac-polyfills/Array/from": void 0
    }],
    164: [function(e, t, i) {
        "use strict";
        var r = "";
        r += '<div class="paddlenav" data-analytics-gallery-interaction-type="paddlenav">', r += "<ul>", r += '<li><button class="paddlenav-arrow paddlenav-arrow-previous" data-ac-gallery-previous-trigger="%ID%"></button></li>', r += '<li><button class="paddlenav-arrow paddlenav-arrow-next" data-ac-gallery-next-trigger="%ID%"></button></li>', r += "</ul>", r += "</div>", t.exports = r
    }, {}],
    165: [function(e, t, i) {
        "use strict";
        var r = {};
        t.exports = function(e, t, i) {
            if (e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), i || !r.hasOwnProperty(e)) {
                var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                    o = n.exec(location.search),
                    s = null === o ? t : decodeURIComponent(o[1].replace(/\+/g, " "));
                "true" !== s && "false" !== s || (s = "true" === s), isNaN(parseFloat(s)) || (s = parseFloat(s)), r[e] = s
            }
            return r[e]
        }
    }, {}],
    166: [function(e, t, i) {
        "use strict";
        t.exports = {
            GPUReporter: e("./ac-gpu-reporter/GPUReporter")
        }
    }, {
        "./ac-gpu-reporter/GPUReporter": 167
    }],
    167: [function(e, t, i) {
        "use strict";

        function r() {}
        var n = e("@marcom/ac-feature/webGLAvailable"),
            o = e("./defaults"),
            s = r.prototype;
        s.BLACKLISTED = 1, s.WHITELISTED = 2, s.NOT_LISTED = 4, s.NOT_FOUND = 8, s.NO_WEBGL = 16, s.getGPUClass = function(e) {
            var t, i = this._extendLists(e);
            return n() ? (t = this.getGPU(), null !== t ? this._matchesList(t, i.whitelist) ? this.WHITELISTED : this._matchesList(t, i.blacklist) ? this.BLACKLISTED : this.NOT_LISTED : this.NOT_FOUND) : this.NO_WEBGL
        }, s.getGPU = function() {
            var e, t, i;
            return e = document.createElement("canvas"), t = e.getContext("webgl") || e.getContext("experimental-webgl") || e.getContext("moz-webgl"), t ? (i = t.getExtension("WEBGL_debug_renderer_info"), null !== i ? t.getParameter(i.UNMASKED_RENDERER_WEBGL) : t.getParameter(t.VERSION)) : null
        }, s._matchesList = function(e, t) {
            var i;
            for (i = 0; i < t.length; i++)
                if (this._matchesEntry(e, t[i])) return !0;
            return !1
        }, s._matchesEntry = function(e, t) {
            var i, r = e.toLowerCase(),
                n = t.toLowerCase().split(" "),
                o = !0;
            for (i = 0; i < n.length; i++) r.indexOf(n[i]) === -1 && (o = !1);
            return o
        }, s._extendLists = function(e) {
            var t, i = JSON.parse(JSON.stringify(o));
            if (void 0 !== e) {
                if (void 0 !== e.blacklist && e.blacklist.length > 0)
                    for (t = 0; t < e.blacklist.length; t++) i.blacklist.push(e.blacklist[t]);
                if (void 0 !== e.whitelist && e.whitelist.length > 0)
                    for (t = 0; t < e.whitelist.length; t++) i.whitelist.push(e.whitelist[t])
            }
            return i
        }, t.exports = r
    }, {
        "./defaults": 168,
        "@marcom/ac-feature/webGLAvailable": 143
    }],
    168: [function(e, t, i) {
        "use strict";
        t.exports = {
            blacklist: ["Intel HD Graphics 5300", "AMD Radeon R5 Graphics", "Apple A7 GPU"],
            whitelist: ["Radeon FirePro D700", "GeForce GT 750 M", "Apple A8 GPU", "Apple A9 GPU", "Apple A9X GPU"]
        }
    }, {}],
    169: [function(e, t, i) {
        "use strict";

        function r() {
            throw new Error("setTimeout has not been defined")
        }

        function n() {
            throw new Error("clearTimeout has not been defined")
        }

        function o(e) {
            if (h === setTimeout) return setTimeout(e, 0);
            if ((h === r || !h) && setTimeout) return h = setTimeout, setTimeout(e, 0);
            try {
                return h(e, 0)
            } catch (t) {
                try {
                    return h.call(null, e, 0)
                } catch (t) {
                    return h.call(this, e, 0)
                }
            }
        }

        function s(e) {
            if (m === clearTimeout) return clearTimeout(e);
            if ((m === n || !m) && clearTimeout) return m = clearTimeout, clearTimeout(e);
            try {
                return m(e)
            } catch (t) {
                try {
                    return m.call(null, e)
                } catch (t) {
                    return m.call(this, e)
                }
            }
        }

        function a() {
            y && d && (y = !1, d.length ? f = d.concat(f) : _ = -1, f.length && l())
        }

        function l() {
            if (!y) {
                var e = o(a);
                y = !0;
                for (var t = f.length; t;) {
                    for (d = f, f = []; ++_ < t;) d && d[_].run();
                    _ = -1, t = f.length
                }
                d = null, y = !1, s(e)
            }
        }

        function c(e, t) {
            this.fun = e, this.array = t
        }

        function u() {}
        var h, m, p = t.exports = {};
        ! function() {
            try {
                h = "function" == typeof setTimeout ? setTimeout : r
            } catch (e) {
                h = r
            }
            try {
                m = "function" == typeof clearTimeout ? clearTimeout : n
            } catch (e) {
                m = n
            }
        }();
        var d, f = [],
            y = !1,
            _ = -1;
        p.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
            f.push(new c(e, t)), 1 !== f.length || y || o(l)
        }, c.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = u, p.addListener = u, p.once = u, p.off = u, p.removeListener = u, p.removeAllListeners = u, p.emit = u, p.prependListener = u, p.prependOnceListener = u, p.listeners = function(e) {
            return []
        }, p.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, p.cwd = function() {
            return "/"
        }, p.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, p.umask = function() {
            return 0
        }
    }, {}],
    170: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t, i, r, n, o, s, a, l) {
            return function() {
                var c = t.getContext("2d");
                c.drawImage(i, r, n, o + a, s + l, 0, 0, o + a, s + l), e.appendChild(t)
            }
        }
    }, {}],
    171: [function(e, t, i) {
        "use strict";
        var r = e("ac-queue").LiveQueue,
            n = e("./helpers/createImageDrawCall"),
            o = "function" == typeof HTMLImageElement.prototype.decode;
        t.exports = function(e, t) {
            function i() {
                o || _.removeEventListener("load", i);
                var e = c ? .5 : 1,
                    r = t.forcedWidth || _.naturalWidth,
                    h = t.forcedHeight || _.naturalHeight,
                    m = Math.round(.5 * (_.naturalWidth - r)),
                    d = Math.round(.5 * (_.naturalHeight - h)),
                    f = Math.floor(r / l),
                    y = Math.floor(h / a);
                p.style.width = Math.round(r * e) + "px", p.style.height = Math.round(h * e) + "px";
                for (var g = 0; g < l; g++)
                    for (var v = 0; v < a; v++) {
                        var b = g === l - 1 ? 0 : 5,
                            E = v === a - 1 ? 0 : 5,
                            w = u[g][v];
                        w.style.position = "absolute", w.width = f + b, w.height = y + E, w.style.width = Math.round(w.width * e) + "px", w.style.height = Math.round(w.height * e) + "px";
                        var S = Math.round(f * g),
                            T = Math.round(y * v);
                        w.style.left = Math.round(S * e) + "px", w.style.top = Math.round(T * e) + "px", s.enqueue(n(p, w, _, m + S, d + T, f, y, b, E))
                    }
                s.start()
            }
            var s = new r(1),
                a = t.rows || 3,
                l = t.columns || 3,
                c = t.retina || !1;
            t.retina && t.forcedWidth && t.forcedHeight && (t.forcedWidth *= 2, t.forcedHeight *= 2);
            for (var u = [], h = 0; h < l; h++) {
                u[h] = [];
                for (var m = 0; m < a; m++) {
                    u[h][m] = document.createElement("canvas")
                }
            }
            var p = document.createElement("div");
            p.classList.add("canvas-grid");
            var d = getComputedStyle(e),
                f = d.backgroundImage,
                y = f.match(/url\("?(.*?)"?\)/i)[1],
                _ = new Image;
            return _.src = y, o ? _.decode().then(i) : _.addEventListener("load", i), new Promise(function(e, t) {
                s.enqueue(function() {
                    s.destroy(), e(p)
                }, 10)
            })
        }
    }, {
        "./helpers/createImageDrawCall": 170,
        "ac-queue": 291
    }],
    172: [function(e, t, i) {
        "use strict";

        function r(e) {
            this._keysDown = {}, this._DOMKeyDown = this._DOMKeyDown.bind(this), this._DOMKeyUp = this._DOMKeyUp.bind(this), this._context = e || document, o(this._context, c, this._DOMKeyDown, !0), o(this._context, u, this._DOMKeyUp, !0), n.call(this)
        }
        var n = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            o = e("@marcom/ac-dom-events/utils/addEventListener"),
            s = e("@marcom/ac-dom-events/utils/removeEventListener"),
            a = e("@marcom/ac-object/create"),
            l = e("./internal/KeyEvent"),
            c = "keydown",
            u = "keyup",
            h = r.prototype = a(n.prototype);
        h.onDown = function(e, t) {
            return this.on(c + ":" + e, t)
        }, h.onceDown = function(e, t) {
            return this.once(c + ":" + e, t)
        }, h.offDown = function(e, t) {
            return this.off(c + ":" + e, t)
        }, h.onUp = function(e, t) {
            return this.on(u + ":" + e, t)
        }, h.onceUp = function(e, t) {
            return this.once(u + ":" + e, t)
        }, h.offUp = function(e, t) {
            return this.off(u + ":" + e, t)
        }, h.isDown = function(e) {
            return e += "", this._keysDown[e] || !1
        }, h.isUp = function(e) {
            return !this.isDown(e)
        }, h.destroy = function() {
            return s(this._context, c, this._DOMKeyDown, !0), s(this._context, u, this._DOMKeyUp, !0), this._keysDown = null, this._context = null, n.prototype.destroy.call(this), this
        }, h._DOMKeyDown = function(e) {
            var t = this._normalizeKeyboardEvent(e),
                i = t.keyCode += "";
            this._trackKeyDown(i), this.trigger(c + ":" + i, t)
        }, h._DOMKeyUp = function(e) {
            var t = this._normalizeKeyboardEvent(e),
                i = t.keyCode += "";
            this._trackKeyUp(i), this.trigger(u + ":" + i, t)
        }, h._normalizeKeyboardEvent = function(e) {
            return new l(e)
        }, h._trackKeyUp = function(e) {
            this._keysDown[e] && (this._keysDown[e] = !1)
        }, h._trackKeyDown = function(e) {
            this._keysDown[e] || (this._keysDown[e] = !0)
        }, t.exports = r
    }, {
        "./internal/KeyEvent": 174,
        "@marcom/ac-dom-events/utils/addEventListener": 54,
        "@marcom/ac-dom-events/utils/removeEventListener": 55,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-object/create": 184
    }],
    173: [function(e, t, i) {
        "use strict";
        var r = e("./Keyboard");
        t.exports = new r
    }, {
        "./Keyboard": 172
    }],
    174: [function(e, t, i) {
        "use strict";

        function r(e) {
            this.originalEvent = e;
            var t;
            for (t in e) n.indexOf(t) === -1 && "function" != typeof e[t] && (this[t] = e[t]);
            this.location = void 0 !== this.originalEvent.location ? this.originalEvent.location : this.originalEvent.keyLocation
        }
        var n = ["keyLocation"];
        r.prototype = {
            preventDefault: function() {
                return "function" != typeof this.originalEvent.preventDefault ? void(this.originalEvent.returnValue = !1) : this.originalEvent.preventDefault()
            },
            stopPropagation: function() {
                return this.originalEvent.stopPropagation()
            }
        }, t.exports = r
    }, {}],
    175: [function(e, t, i) {
        "use strict";
        t.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }, {}],
    176: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t;
            if (e = e || window, e === window) {
                if (t = window.pageXOffset) return t;
                e = document.documentElement || document.body.parentNode || document.body
            }
            return e.scrollLeft
        }
    }, {}],
    177: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t;
            if (e = e || window, e === window) {
                if (t = window.pageYOffset) return t;
                e = document.documentElement || document.body.parentNode || document.body
            }
            return e.scrollTop
        }
    }, {}],
    178: [function(e, t, i) {
        "use strict";
        t.exports = {
            Modal: e("./ac-modal-basic/Modal"),
            Renderer: e("./ac-modal-basic/Renderer"),
            classNames: e("./ac-modal-basic/classNames"),
            dataAttributes: e("./ac-modal-basic/dataAttributes")
        }
    }, {
        "./ac-modal-basic/Modal": 179,
        "./ac-modal-basic/Renderer": 180,
        "./ac-modal-basic/classNames": 181,
        "./ac-modal-basic/dataAttributes": 182
    }],
    179: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            c.call(this), this.options = s.defaults(h, e), this.renderer = new u(t), this.opened = !1, this._keysToClose = [l.ESCAPE], this._attachedKeysToClose = [], this.close = this.close.bind(this)
        }
        var n = {
                addEventListener: e("@marcom/ac-dom-events/addEventListener"),
                removeEventListener: e("@marcom/ac-dom-events/removeEventListener"),
                target: e("@marcom/ac-dom-events/target")
            },
            o = {
                getScrollX: e("@marcom/ac-dom-metrics/getScrollX"),
                getScrollY: e("@marcom/ac-dom-metrics/getScrollY")
            },
            s = {
                create: e("@marcom/ac-object/create"),
                defaults: e("@marcom/ac-object/defaults")
            },
            a = e("@marcom/ac-keyboard"),
            l = e("@marcom/ac-keyboard/keyMap"),
            c = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            u = e("./Renderer"),
            h = {
                retainScrollPosition: !1
            },
            m = r.prototype = s.create(c.prototype);
        m.open = function() {
            this.options.retainScrollPosition && this._saveScrollPosition(), this.opened || (this._attachEvents(), this.trigger("willopen"), this.renderer.open(), this.opened = !0, this.trigger("open"))
        }, m.close = function(e) {
            var t, i;
            if (this.opened) {
                if (e && "click" === e.type && (t = n.target(e), i = this.renderer.options.dataAttributes.close, !t.hasAttribute(i))) return;
                this.trigger("willclose"), this._removeEvents(), this.renderer.close(), this.options.retainScrollPosition && this._restoreScrollPosition(), this.opened = !1, this.trigger("close")
            }
        }, m.render = function() {
            this.renderer.render()
        }, m.appendContent = function(e, t) {
            this.renderer.appendContent(e, t)
        }, m.removeContent = function(e) {
            this.renderer.removeContent(e)
        }, m.destroy = function() {
            this._removeEvents(), this.renderer.destroy();
            for (var e in this) this.hasOwnProperty(e) && (this[e] = null)
        }, m.addKeyToClose = function(e) {
            var t = this._keysToClose.indexOf(e);
            t === -1 && (this._keysToClose.push(e), this._bindKeyToClose(e))
        }, m.removeKeyToClose = function(e) {
            var t = this._keysToClose.indexOf(e);
            t !== -1 && this._keysToClose.splice(t, 1), this._releaseKeyToClose(e)
        }, m._bindKeyToClose = function(e) {
            var t = this._attachedKeysToClose.indexOf(e);
            t === -1 && (a.onUp(e, this.close), this._attachedKeysToClose.push(e))
        }, m._releaseKeyToClose = function(e) {
            var t = this._attachedKeysToClose.indexOf(e);
            t !== -1 && (a.offUp(e, this.close), this._attachedKeysToClose.splice(t, 1))
        }, m._removeEvents = function() {
            this.renderer.modalElement && n.removeEventListener(this.renderer.modalElement, "click", this.close), this._keysToClose.forEach(this._releaseKeyToClose, this)
        }, m._attachEvents = function() {
            this.renderer.modalElement && n.addEventListener(this.renderer.modalElement, "click", this.close), this._keysToClose.forEach(this._bindKeyToClose, this)
        }, m._restoreScrollPosition = function() {
            window.scrollTo(this._scrollX || 0, this._scrollY || 0)
        }, m._saveScrollPosition = function() {
            this._scrollX = o.getScrollX(), this._scrollY = o.getScrollY()
        }, t.exports = r
    }, {
        "./Renderer": 180,
        "@marcom/ac-dom-events/addEventListener": 50,
        "@marcom/ac-dom-events/removeEventListener": 51,
        "@marcom/ac-dom-events/target": 53,
        "@marcom/ac-dom-metrics/getScrollX": 176,
        "@marcom/ac-dom-metrics/getScrollY": 177,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-keyboard": 173,
        "@marcom/ac-keyboard/keyMap": 175,
        "@marcom/ac-object/create": 184,
        "@marcom/ac-object/defaults": 185
    }],
    180: [function(e, t, i) {
        "use strict";
        var r = {
                add: e("@marcom/ac-classlist/add"),
                remove: e("@marcom/ac-classlist/remove")
            },
            n = {
                defaults: e("@marcom/ac-object/defaults")
            },
            o = {
                remove: e("@marcom/ac-dom-nodes/remove"),
                isElement: e("@marcom/ac-dom-nodes/isElement")
            },
            s = e("./classNames"),
            a = e("./dataAttributes"),
            l = {
                modalElement: null,
                contentElement: null,
                closeButton: null,
                classNames: s,
                dataAttributes: a
            },
            c = function(e) {
                e = e || {}, this.options = n.defaults(l, e), this.options.classNames = n.defaults(l.classNames, e.classNames), this.options.dataAttributes = n.defaults(l.dataAttributes, e.dataAttributes), this.modalElement = this.options.modalElement, this.contentElement = this.options.contentElement, this.closeButton = this.options.closeButton
            },
            u = c.prototype;
        u.render = function() {
            return o.isElement(this.modalElement) || (this.modalElement = this.renderModalElement(this.options.classNames.modalElement)), o.isElement(this.contentElement) || (this.contentElement = this.renderContentElement(this.options.classNames.contentElement)), this.closeButton !== !1 && (o.isElement(this.closeButton) || (this.closeButton = this.renderCloseButton(this.options.classNames.closeButton)), this.modalElement.appendChild(this.closeButton)), this.modalElement.appendChild(this.contentElement), document.body.appendChild(this.modalElement), this.modalElement
        }, u.renderCloseButton = function(e) {
            var t;
            return e = e || this.options.classNames.closeButton, t = this._renderElement("button", e), t.setAttribute(this.options.dataAttributes.close, ""), t
        }, u.renderModalElement = function(e) {
            return e = e || this.options.classNames.modalElement, this._renderElement("div", e)
        }, u.renderContentElement = function(e) {
            return e = e || this.options.classNames.contentElement, this._renderElement("div", e)
        }, u.appendContent = function(e, t) {
            o.isElement(e) && (void 0 === arguments[1] ? this.contentElement.appendChild(e) : o.isElement(t) && t.appendChild(e))
        }, u.removeContent = function(e) {
            e ? this.modalElement.contains(e) && o.remove(e) : this._emptyContent()
        }, u.open = function() {
            var e = [document.documentElement].concat(this.options.classNames.documentElement),
                t = [this.modalElement].concat(this.options.classNames.modalOpen);
            r.add.apply(null, e), r.add.apply(null, t)
        }, u.close = function() {
            var e = [document.documentElement].concat(this.options.classNames.documentElement),
                t = [this.modalElement].concat(this.options.classNames.modalOpen);
            r.remove.apply(null, e), r.remove.apply(null, t)
        }, u.destroy = function() {
            var e = [document.documentElement].concat(this.options.classNames.documentElement);
            this.modalElement && document.body.contains(this.modalElement) && (this.close(), document.body.removeChild(this.modalElement)), r.remove.apply(null, e);
            for (var t in this) this.hasOwnProperty(t) && (this[t] = null)
        }, u._renderElement = function(e, t) {
            var i = document.createElement(e),
                n = [i];
            return t && (n = n.concat(t)), r.add.apply(null, n), i
        }, u._emptyContent = function() {
            this.contentElement.innerHTML = ""
        }, t.exports = c
    }, {
        "./classNames": 181,
        "./dataAttributes": 182,
        "@marcom/ac-classlist/add": 12,
        "@marcom/ac-classlist/remove": 17,
        "@marcom/ac-dom-nodes/isElement": 72,
        "@marcom/ac-dom-nodes/remove": 74,
        "@marcom/ac-object/defaults": 185
    }],
    181: [function(e, t, i) {
        "use strict";
        t.exports = {
            modalElement: "modal",
            modalOpen: "modal-open",
            documentElement: "has-modal",
            contentElement: "modal-content",
            closeButton: "modal-close"
        }
    }, {}],
    182: [function(e, t, i) {
        "use strict";
        t.exports = {
            close: "data-modal-close"
        }
    }, {}],
    183: [function(e, t, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        e("@marcom/ac-polyfills/Array/isArray");
        var n = e("./extend"),
            o = Object.prototype.hasOwnProperty,
            s = function a(e, t) {
                var i;
                for (i in t) o.call(t, i) && (null === t[i] ? e[i] = null : "object" === r(t[i]) ? (e[i] = Array.isArray(t[i]) ? [] : {}, a(e[i], t[i])) : e[i] = t[i]);
                return e
            };
        t.exports = function(e, t) {
            return t ? s({}, e) : n({}, e)
        }
    }, {
        "./extend": 186,
        "@marcom/ac-polyfills/Array/isArray": void 0
    }],
    184: [function(e, t, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            n = function() {};
        t.exports = function(e) {
            if (arguments.length > 1) throw new Error("Second argument not supported");
            if (null === e || "object" !== ("undefined" == typeof e ? "undefined" : r(e))) throw new TypeError("Object prototype may only be an Object.");
            return "function" == typeof Object.create ? Object.create(e) : (n.prototype = e, new n)
        }
    }, {}],
    185: [function(e, t, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            n = e("./extend");
        t.exports = function(e, t) {
            if ("object" !== ("undefined" == typeof e ? "undefined" : r(e))) throw new TypeError("defaults: must provide a defaults object");
            if (t = t || {}, "object" !== ("undefined" == typeof t ? "undefined" : r(t))) throw new TypeError("defaults: options must be a typeof object");
            return n({}, e, t)
        }
    }, {
        "./extend": 186
    }],
    186: [function(e, t, i) {
        "use strict";
        e("@marcom/ac-polyfills/Array/prototype.forEach");
        var r = Object.prototype.hasOwnProperty;
        t.exports = function() {
            var e, t;
            return e = arguments.length < 2 ? [{}, arguments[0]] : [].slice.call(arguments), t = e.shift(), e.forEach(function(e) {
                if (null != e)
                    for (var i in e) r.call(e, i) && (t[i] = e[i])
            }), t
        }
    }, {
        "@marcom/ac-polyfills/Array/prototype.forEach": void 0
    }],
    187: [function(e, t, i) {
        "use strict";
        t.exports = {
            PageVisibilityManager: e("./ac-page-visibility/PageVisibilityManager")
        }
    }, {
        "./ac-page-visibility/PageVisibilityManager": 188
    }],
    188: [function(e, t, i) {
        "use strict";

        function r() {
            if ("undefined" != typeof document.addEventListener) {
                var e;
                "undefined" != typeof document.hidden ? (this._hidden = "hidden", e = "visibilitychange") : "undefined" != typeof document.mozHidden ? (this._hidden = "mozHidden", e = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (this._hidden = "msHidden", e = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (this._hidden = "webkitHidden", e = "webkitvisibilitychange"), "undefined" == typeof document[this._hidden] ? this.isHidden = !1 : this.isHidden = document[this._hidden], e && document.addEventListener(e, this._handleVisibilityChange.bind(this), !1), o.call(this)
            }
        }
        var n = e("@marcom/ac-object/create"),
            o = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            s = r.prototype = n(o.prototype);
        s.CHANGED = "changed", s._handleVisibilityChange = function(e) {
            this.isHidden = document[this._hidden], this.trigger(this.CHANGED, {
                isHidden: this.isHidden
            })
        }, t.exports = new r
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-object/create": 184
    }],
    189: [function(e, t, i) {
        "use strict";
        t.exports = {
            PointerTracker: e("./ac-pointer-tracker/PointerTracker")
        }
    }, {
        "./ac-pointer-tracker/PointerTracker": 190
    }],
    190: [function(e, t, i) {
        "use strict";

        function r(e, t, i) {
            this._el = e, i = i || {}, this._lockVertical = i.lockVertical !== !1, this._swipeThreshold = i.swipeThreshold || r.DEFAULT_SWIPE_THRESHOLD, this._pointerEvents = t || {}, this._trackHover = i.trackHover, this._trackHover ? (this._pointerEvents.down = this._pointerEvents.down || r.MOUSE_EVENTS.over, this._pointerEvents.up = this._pointerEvents.up || r.MOUSE_EVENTS.out) : (this._pointerEvents.down = this._pointerEvents.down || (a ? r.TOUCH_EVENTS.down : r.MOUSE_EVENTS.down), this._pointerEvents.up = this._pointerEvents.up || (a ? r.TOUCH_EVENTS.up : r.MOUSE_EVENTS.up)), this._pointerEvents.out = this._pointerEvents.out || (a ? r.TOUCH_EVENTS.out : r.MOUSE_EVENTS.out), this._pointerEvents.move = this._pointerEvents.move || (a ? r.TOUCH_EVENTS.move : r.MOUSE_EVENTS.move), this._onMouseDown = this._onMouseDown.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onMouseOut = this._onMouseOut.bind(this), this._onMouseMove = this._onMouseMove.bind(this), l.call(this), this._el.addEventListener(this._pointerEvents.down, this._onMouseDown, s), this._setCursorStyle("grab")
        }
        var n = e("@marcom/useragent-detect"),
            o = n.os.android,
            s = !n.browser.ie && {
                passive: !1
            },
            a = e("@marcom/ac-feature/touchAvailable")(),
            l = e("@marcom/ac-event-emitter-micro").EventEmitterMicro;
        r.START = "start", r.END = "end", r.UPDATE = "update", r.SWIPE_RIGHT = "swiperight", r.SWIPE_LEFT = "swipeleft", r.DEFAULT_SWIPE_THRESHOLD = o ? 2 : 8, r.TOUCH_EVENTS = {
            down: "touchstart",
            up: "touchend",
            out: "mouseout",
            move: "touchmove"
        }, r.MOUSE_EVENTS = {
            down: "mousedown",
            up: "mouseup",
            out: "mouseout",
            move: "mousemove",
            over: "mouseover"
        };
        var c = l.prototype,
            u = r.prototype = Object.create(c);
        u.destroy = function() {
            return this._isDragging && this._onMouseUp(), this._el.removeEventListener(this._pointerEvents.down, this._onMouseDown), this._setCursorStyle(null), this._el = null, this._pointerEvents = null, this._lockVertical = null, this._swipeThreshold = null, this._checkForTouchScrollY = null, this._isDragging = null, this._currentX = null, this._currentY = null, this._velocityX = null, this._velocityY = null, this._lastX = null, this._lastY = null, c.destroy.call(this)
        }, u._onMouseDown = function(e) {
            if (!this._isDragging) {
                this._isDragging = !0, this._setCursorStyle("grabbing"), this._el.removeEventListener(this._pointerEvents.down, this._onMouseDown), document.body.addEventListener(this._pointerEvents.up, this._onMouseUp, s), document.addEventListener(this._pointerEvents.out, this._onMouseOut, s), document.body.addEventListener(this._pointerEvents.move, this._onMouseMove, s), this._checkForTouchScrollY = this._lockVertical && !(!e.touches || !e.touches[0]), this._checkForTouchScrollY && (this._lastY = this._getTouchY(e));
                var t = this._storeAndGetValues(e);
                this._velocityX = t.diffX = 0, this._velocityY = t.diffY = 0, this.trigger(r.START, t)
            }
        }, u._onMouseUp = function(e) {
            if (this._isDragging) {
                this._isDragging = !1, this._setCursorStyle("grab"), this._el.addEventListener(this._pointerEvents.down, this._onMouseDown, s), document.body.removeEventListener(this._pointerEvents.up, this._onMouseUp), document.removeEventListener(this._pointerEvents.out, this._onMouseOut), document.body.removeEventListener(this._pointerEvents.move, this._onMouseMove);
                var t;
                this._checkForTouchScrollY || this._trackHover ? t = null : this._velocityX > this._swipeThreshold ? t = r.SWIPE_LEFT : this._velocityX * -1 > this._swipeThreshold && (t = r.SWIPE_RIGHT);
                var i = this._storeAndGetValues(e);
                i.swipe = t, this.trigger(r.END, i), t && !this._trackHover && this.trigger(t, i)
            }
        }, u._onMouseOut = function(e) {
            e = e ? e : window.event;
            var t = e.relatedTarget || e.toElement;
            t && "HTML" !== t.nodeName || this._onMouseUp(e)
        }, u._onMouseMove = function(e) {
            return this._checkForTouchScrollY && this._isVerticalTouchMove(e) ? void this._onMouseUp(e) : (e.preventDefault(), void this.trigger(r.UPDATE, this._storeAndGetValues(e)))
        }, u._storeAndGetValues = function(e) {
            if (void 0 === e) return {};
            this._currentX = this._getPointerX(e), this._currentY = this._getPointerY(e), this._velocityX = this._lastX - this._currentX, this._velocityY = this._lastY - this._currentY;
            var t = {
                x: this._currentX,
                y: this._currentY,
                lastX: this._lastX,
                lastY: this._lastY,
                diffX: this._velocityX,
                diffY: this._velocityY,
                interactionEvent: e
            };
            return this._lastX = this._currentX, this._lastY = this._currentY, t
        }, u._getPointerX = function(e) {
            return e.pageX ? e.pageX : e.touches && e.touches[0] ? e.touches[0].pageX : e.clientX ? e.clientX : 0
        }, u._getPointerY = function(e) {
            return e.pageY ? e.pageY : e.touches && e.touches[0] ? e.touches[0].pageY : e.clientY ? e.clientY : 0
        }, u._getTouchX = function(e) {
            return e.touches && e.touches[0] ? e.touches[0].pageX : 0
        }, u._getTouchY = function(e) {
            return e.touches && e.touches[0] ? e.touches[0].pageY : 0
        }, u._isVerticalTouchMove = function(e) {
            var t = this._getTouchX(e),
                i = this._getTouchY(e),
                r = Math.abs(t - this._lastX),
                n = Math.abs(i - this._lastY);
            return this._checkForTouchScrollY = r < n, this._checkForTouchScrollY
        }, u._setCursorStyle = function(e) {
            this._el.style.cursor = e
        }, t.exports = r
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-feature/touchAvailable": 142,
        "@marcom/useragent-detect": 284
    }],
    191: [function(e, t, i) {
        "use strict";
        var r = e("./utils/eventTypeAvailable"),
            n = e("./shared/camelCasedEventTypes"),
            o = e("./shared/windowFallbackEventTypes"),
            s = e("./shared/prefixHelper"),
            a = {};
        t.exports = function l(e, t) {
            var i, c, u;
            if (t = t || "div", e = e.toLowerCase(), t in a || (a[t] = {}), c = a[t], e in c) return c[e];
            if (r(e, t)) return c[e] = e;
            if (e in n)
                for (u = 0; u < n[e].length; u++)
                    if (i = n[e][u], r(i.toLowerCase(), t)) return c[e] = i;
            for (u = 0; u < s.evt.length; u++)
                if (i = s.evt[u] + e, r(i, t)) return s.reduce(u), c[e] = i;
            return "window" !== t && o.indexOf(e) ? c[e] = l(e, "window") : c[e] = !1
        }
    }, {
        "./shared/camelCasedEventTypes": 195,
        "./shared/prefixHelper": 197,
        "./shared/windowFallbackEventTypes": 200,
        "./utils/eventTypeAvailable": 202
    }],
    192: [function(e, t, i) {
        "use strict";
        var r = e("./shared/stylePropertyCache"),
            n = e("./getStyleProperty"),
            o = e("./getStyleValue");
        t.exports = function(e, t) {
            var i;
            if (e = n(e), !e) return !1;
            if (i = r[e].css, "undefined" != typeof t) {
                if (t = o(e, t), t === !1) return !1;
                i += ":" + t + ";"
            }
            return i
        }
    }, {
        "./getStyleProperty": 193,
        "./getStyleValue": 194,
        "./shared/stylePropertyCache": 198
    }],
    193: [function(e, t, i) {
        "use strict";
        var r = e("./shared/stylePropertyCache"),
            n = e("./shared/getStyleTestElement"),
            o = e("./utils/toCSS"),
            s = e("./utils/toDOM"),
            a = e("./shared/prefixHelper"),
            l = function(e, t) {
                var i = o(e),
                    n = t !== !1 && o(t);
                return r[e] = r[t] = r[i] = r[n] = {
                    dom: t,
                    css: n
                }, t
            };
        t.exports = function(e) {
            var t, i, o, c;
            if (e += "", e in r) return r[e].dom;
            for (o = n(), e = s(e), i = e.charAt(0).toUpperCase() + e.substring(1), t = "filter" === e ? ["WebkitFilter", "filter"] : (e + " " + a.dom.join(i + " ") + i).split(" "), c = 0; c < t.length; c++)
                if ("undefined" != typeof o.style[t[c]]) return 0 !== c && a.reduce(c - 1), l(e, t[c]);
            return l(e, !1)
        }
    }, {
        "./shared/getStyleTestElement": 196,
        "./shared/prefixHelper": 197,
        "./shared/stylePropertyCache": 198,
        "./utils/toCSS": 203,
        "./utils/toDOM": 204
    }],
    194: [function(e, t, i) {
        "use strict";
        var r = e("./getStyleProperty"),
            n = e("./shared/styleValueAvailable"),
            o = e("./shared/prefixHelper"),
            s = e("./shared/stylePropertyCache"),
            a = {},
            l = /(\([^\)]+\))/gi,
            c = /([^ ,;\(]+(\([^\)]+\))?)/gi;
        t.exports = function(e, t) {
            var i;
            return t += "", !!(e = r(e)) && (n(e, t) ? t : (i = s[e].css, t = t.replace(c, function(t) {
                var r, s, c, u;
                if ("#" === t[0] || !isNaN(t[0])) return t;
                if (s = t.replace(l, ""), c = i + ":" + s, c in a) return a[c] === !1 ? "" : t.replace(s, a[c]);
                for (r = o.css.map(function(e) {
                        return e + t
                    }), r = [t].concat(r), u = 0; u < r.length; u++)
                    if (n(e, r[u])) return 0 !== u && o.reduce(u - 1), a[c] = r[u].replace(l, ""), r[u];
                return a[c] = !1, ""
            }), t = t.trim(), "" !== t && t))
        }
    }, {
        "./getStyleProperty": 193,
        "./shared/prefixHelper": 197,
        "./shared/stylePropertyCache": 198,
        "./shared/styleValueAvailable": 199
    }],
    195: [function(e, t, i) {
        "use strict";
        t.exports = {
            transitionend: ["webkitTransitionEnd", "MSTransitionEnd"],
            animationstart: ["webkitAnimationStart", "MSAnimationStart"],
            animationend: ["webkitAnimationEnd", "MSAnimationEnd"],
            animationiteration: ["webkitAnimationIteration", "MSAnimationIteration"],
            fullscreenchange: ["MSFullscreenChange"],
            fullscreenerror: ["MSFullscreenError"]
        }
    }, {}],
    196: [function(e, t, i) {
        "use strict";
        var r;
        t.exports = function() {
            return r ? (r.style.cssText = "", r.removeAttribute("style")) : r = document.createElement("_"), r
        }, t.exports.resetElement = function() {
            r = null
        }
    }, {}],
    197: [function(e, t, i) {
        "use strict";
        var r = ["-webkit-", "-moz-", "-ms-"],
            n = ["Webkit", "Moz", "ms"],
            o = ["webkit", "moz", "ms"],
            s = function() {
                this.initialize()
            },
            a = s.prototype;
        a.initialize = function() {
            this.reduced = !1, this.css = r, this.dom = n, this.evt = o
        }, a.reduce = function(e) {
            this.reduced || (this.reduced = !0, this.css = [this.css[e]], this.dom = [this.dom[e]], this.evt = [this.evt[e]])
        }, t.exports = new s
    }, {}],
    198: [function(e, t, i) {
        "use strict";
        t.exports = {}
    }, {}],
    199: [function(e, t, i) {
        "use strict";
        var r, n, o = e("./stylePropertyCache"),
            s = e("./getStyleTestElement"),
            a = !1,
            l = function() {
                var e;
                if (!a) {
                    a = !0, r = "CSS" in window && "supports" in window.CSS, n = !1, e = s();
                    try {
                        e.style.width = "invalid"
                    } catch (t) {
                        n = !0
                    }
                }
            };
        t.exports = function(e, t) {
            var i, a;
            if (l(), r) return e = o[e].css, CSS.supports(e, t);
            if (a = s(), i = a.style[e], n) try {
                a.style[e] = t
            } catch (c) {
                return !1
            } else a.style[e] = t;
            return a.style[e] && a.style[e] !== i
        }, t.exports.resetFlags = function() {
            a = !1
        }
    }, {
        "./getStyleTestElement": 196,
        "./stylePropertyCache": 198
    }],
    200: [function(e, t, i) {
        "use strict";
        t.exports = ["transitionend", "animationstart", "animationend", "animationiteration"]
    }, {}],
    201: [function(e, t, i) {
        "use strict";
        var r = /(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
        t.exports = function(e) {
            return e = String.prototype.replace.call(e, r, ""), e.charAt(0).toLowerCase() + e.substring(1)
        }
    }, {}],
    202: [function(e, t, i) {
        "use strict";
        var r = {
            window: window,
            document: document
        };
        t.exports = function(e, t) {
            var i;
            return e = "on" + e, t in r || (r[t] = document.createElement(t)), i = r[t], e in i || "setAttribute" in i && (i.setAttribute(e, "return;"), "function" == typeof i[e])
        }
    }, {}],
    203: [function(e, t, i) {
        "use strict";
        var r = /^(webkit|moz|ms)/gi;
        t.exports = function(e) {
            return "cssfloat" === e.toLowerCase() ? "float" : (r.test(e) && (e = "-" + e), e.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase())
        }
    }, {}],
    204: [function(e, t, i) {
        "use strict";
        var r = /-([a-z])/g;
        t.exports = function(e) {
            return "float" === e.toLowerCase() ? "cssFloat" : (e = e.replace(r, function(e, t) {
                return t.toUpperCase()
            }), "Ms" === e.substr(0, 2) && (e = "ms" + e.substring(2)), e)
        }
    }, {}],
    205: [function(e, t, i) {
        "use strict";
        t.exports = {
            majorVersionNumber: "3.x"
        }
    }, {}],
    206: [function(e, t, i) {
        "use strict";

        function r(e) {
            e = e || {}, o.call(this), this.id = a.getNewID(), this.executor = e.executor || s, this._reset(), this._willRun = !1, this._didDestroy = !1
        }
        var n, o = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            s = e("./sharedRAFExecutorInstance"),
            a = e("./sharedRAFEmitterIDGeneratorInstance");
        n = r.prototype = Object.create(o.prototype), n.run = function() {
            return this._willRun || (this._willRun = !0), this._subscribe()
        }, n.cancel = function() {
            this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset()
        }, n.destroy = function() {
            var e = this.willRun();
            return this.cancel(), this.executor = null, o.prototype.destroy.call(this), this._didDestroy = !0, e
        }, n.willRun = function() {
            return this._willRun
        }, n.isRunning = function() {
            return this._isRunning
        }, n._subscribe = function() {
            return this.executor.subscribe(this)
        }, n._unsubscribe = function() {
            return this.executor.unsubscribe(this)
        }, n._onAnimationFrameStart = function(e) {
            this._isRunning = !0, this._willRun = !1, this._didEmitFrameData || (this._didEmitFrameData = !0, this.trigger("start", e))
        }, n._onAnimationFrameEnd = function(e) {
            this._willRun || (this.trigger("stop", e), this._reset())
        }, n._reset = function() {
            this._didEmitFrameData = !1, this._isRunning = !1
        }, t.exports = r
    }, {
        "./sharedRAFEmitterIDGeneratorInstance": 214,
        "./sharedRAFExecutorInstance": 215,
        "@marcom/ac-event-emitter-micro": 119
    }],
    207: [function(e, t, i) {
        "use strict";

        function r(e) {
            e = e || {}, this._reset(), this.updatePhases(), this.eventEmitter = new o, this._willRun = !1, this._totalSubscribeCount = -1, this._requestAnimationFrame = window.requestAnimationFrame, this._cancelAnimationFrame = window.cancelAnimationFrame, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        var n, o = e("@marcom/ac-event-emitter-micro/EventEmitterMicro");
        n = r.prototype, n.frameRequestedPhase = "requested", n.startPhase = "start", n.runPhases = ["update", "external", "draw"], n.endPhase = "end", n.disabledPhase = "disabled", n.beforePhaseEventPrefix = "before:", n.afterPhaseEventPrefix = "after:", n.subscribe = function(e, t) {
            return this._totalSubscribeCount++, this._nextFrameSubscribers[e.id] || (t ? this._nextFrameSubscribersOrder.unshift(e.id) : this._nextFrameSubscribersOrder.push(e.id), this._nextFrameSubscribers[e.id] = e, this._nextFrameSubscriberArrayLength++, this._nextFrameSubscriberCount++, this._run()), this._totalSubscribeCount
        }, n.subscribeImmediate = function(e, t) {
            return this._totalSubscribeCount++, this._subscribers[e.id] || (t ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, e.id) : this._subscribersOrder.unshift(e.id), this._subscribers[e.id] = e, this._subscriberArrayLength++, this._subscriberCount++), this._totalSubscribeCount
        }, n.unsubscribe = function(e) {
            return !!this._nextFrameSubscribers[e.id] && (this._nextFrameSubscribers[e.id] = null, this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0)
        }, n.getSubscribeID = function() {
            return this._totalSubscribeCount += 1
        }, n.destroy = function() {
            var e = this._cancel();
            return this.eventEmitter.destroy(), this.eventEmitter = null, this.phases = null, this._subscribers = null, this._subscribersOrder = null, this._nextFrameSubscribers = null, this._nextFrameSubscribersOrder = null, this._rafData = null, this._boundOnAnimationFrame = null, this._onExternalAnimationFrame = null, e
        }, n.useExternalAnimationFrame = function(e) {
            if ("boolean" == typeof e) {
                var t = this._isUsingExternalAnimationFrame;
                return e && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), !this._willRun || e || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this._isUsingExternalAnimationFrame = e, e ? this._boundOnExternalAnimationFrame : t || !1
            }
        }, n.updatePhases = function() {
            this.phases || (this.phases = []), this.phases.length = 0, this.phases.push(this.frameRequestedPhase), this.phases.push(this.startPhase), Array.prototype.push.apply(this.phases, this.runPhases), this.phases.push(this.endPhase), this._runPhasesLength = this.runPhases.length, this._phasesLength = this.phases.length
        }, n._run = function() {
            if (!this._willRun) return this._willRun = !0, 0 === this.lastFrameTime && (this.lastFrameTime = performance.now()), this._animationFrameActive = !0, this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this.phase === this.disabledPhase && (this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex]), !0
        }, n._cancel = function() {
            var e = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), this._animationFrameActive = !1, this._willRun = !1, e = !0), this._isRunning || this._reset(), e
        }, n._onAnimationFrame = function(e) {
            for (this._subscribers = this._nextFrameSubscribers, this._subscribersOrder = this._nextFrameSubscribersOrder, this._subscriberArrayLength = this._nextFrameSubscriberArrayLength, this._subscriberCount = this._nextFrameSubscriberCount, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex], this._isRunning = !0, this._willRun = !1, this._didRequestNextRAF = !1, this._rafData.delta = e - this.lastFrameTime, this.lastFrameTime = e, this._rafData.fps = 0, this._rafData.delta >= 1e3 && (this._rafData.delta = 0), 0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta), this._rafData.time = e, this._rafData.naturalFps = this._rafData.fps, this._rafData.timeNow = Date.now(), this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
            for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
            }
            for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy === !1 && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._willRun ? (this.phaseIndex = 0, this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
        }, n._onExternalAnimationFrame = function(e) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(e)
        }, n._reset = function() {
            this._rafData || (this._rafData = {}), this._rafData.time = 0, this._rafData.delta = 0, this._rafData.fps = 0, this._rafData.naturalFps = 0, this._rafData.timeNow = 0, this._subscribers = {}, this._subscribersOrder = [], this._currentSubscriberIndex = -1, this._subscriberArrayLength = 0, this._subscriberCount = 0, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._didEmitFrameData = !1, this._animationFrame = null, this._animationFrameActive = !1, this._isRunning = !1, this._shouldReset = !1, this.lastFrameTime = 0, this._runPhaseIndex = -1, this.phaseIndex = -1, this.phase = this.disabledPhase
        }, t.exports = r
    }, {
        "@marcom/ac-event-emitter-micro/EventEmitterMicro": 120
    }],
    208: [function(e, t, i) {
        "use strict";
        var r = e("./SingleCallRAFEmitter"),
            n = function(e) {
                this.phase = e, this.rafEmitter = new r, this._cachePhaseIndex(), this.requestAnimationFrame = this.requestAnimationFrame.bind(this), this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this), this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this), this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this), this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this), this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)), this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart), this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase), this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase), this._frameCallbacks = [], this._currentFrameCallbacks = [], this._nextFrameCallbacks = [], this._phaseActive = !1, this._currentFrameID = -1, this._cancelFrameIdx = -1, this._frameCallbackLength = 0, this._currentFrameCallbacksLength = 0, this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0
            },
            o = n.prototype;
        o.requestAnimationFrame = function(e, t) {
            return t === !0 && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0), this._frameCallbacks.push(this._currentFrameID, e), this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1), this._currentFrameCallbacks.push(this._currentFrameID, e), this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(), this._nextFrameCallbacks.push(this._currentFrameID, e), this._nextFrameCallbacksLength += 2), this._currentFrameID
        }, o.cancelAnimationFrame = function(e) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(e), this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(e), this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(e), this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
        }, o._onRAFExecuted = function(e) {
            for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2) this._frameCallbacks[this._frameCallbackIteration + 1](e.time, e);
            this._frameCallbacks.length = 0, this._frameCallbackLength = 0
        }, o._onBeforeRAFExecutorStart = function() {
            Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)), this._currentFrameCallbacksLength = this._nextFrameCallbacksLength, this._nextFrameCallbacks.length = 0, this._nextFrameCallbacksLength = 0
        }, o._onBeforeRAFExecutorPhase = function() {
            this._phaseActive = !0, Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)), this._frameCallbackLength = this._currentFrameCallbacksLength, this._currentFrameCallbacks.length = 0, this._currentFrameCallbacksLength = 0
        }, o._onAfterRAFExecutorPhase = function() {
            this._phaseActive = !1
        }, o._cachePhaseIndex = function() {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
        }, o._cancelRunningAnimationFrame = function() {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2), this._frameCallbackLength -= 2
        }, o._cancelCurrentAnimationFrame = function() {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2), this._currentFrameCallbacksLength -= 2
        }, o._cancelNextAnimationFrame = function() {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), this._nextFrameCallbacksLength -= 2, 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
        }, t.exports = n
    }, {
        "./SingleCallRAFEmitter": 210
    }],
    209: [function(e, t, i) {
        "use strict";
        var r = e("./RAFInterface"),
            n = function() {
                this.events = {}
            },
            o = n.prototype;
        o.requestAnimationFrame = function(e) {
            return this.events[e] || (this.events[e] = new r(e)), this.events[e].requestAnimationFrame
        }, o.cancelAnimationFrame = function(e) {
            return this.events[e] || (this.events[e] = new r(e)), this.events[e].cancelAnimationFrame
        }, t.exports = new n
    }, {
        "./RAFInterface": 208
    }],
    210: [function(e, t, i) {
        "use strict";
        var r = e("./RAFEmitter"),
            n = function(e) {
                r.call(this, e)
            },
            o = n.prototype = Object.create(r.prototype);
        o._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }, t.exports = n
    }, {
        "./RAFEmitter": 206
    }],
    211: [function(e, t, i) {
        "use strict";
        var r = e("./RAFInterfaceController");
        t.exports = r.cancelAnimationFrame("update")
    }, {
        "./RAFInterfaceController": 209
    }],
    212: [function(e, t, i) {
        "use strict";
        var r = e("./RAFInterfaceController");
        t.exports = r.requestAnimationFrame("draw")
    }, {
        "./RAFInterfaceController": 209
    }],
    213: [function(e, t, i) {
        "use strict";
        var r = e("./RAFInterfaceController");
        t.exports = r.requestAnimationFrame("external")
    }, {
        "./RAFInterfaceController": 209
    }],
    214: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-shared-instance").SharedInstance,
            n = e("../.release-info.js").majorVersionNumber,
            o = function() {
                this._currentID = 0
            };
        o.prototype.getNewID = function() {
            return this._currentID++, "raf:" + this._currentID
        }, t.exports = r.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", n, o)
    }, {
        "../.release-info.js": 205,
        "@marcom/ac-shared-instance": 222
    }],
    215: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-shared-instance").SharedInstance,
            n = e("../.release-info.js").majorVersionNumber,
            o = e("./RAFExecutor");
        t.exports = r.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", n, o)
    }, {
        "../.release-info.js": 205,
        "./RAFExecutor": 207,
        "@marcom/ac-shared-instance": 222
    }],
    216: [function(e, t, i) {
        "use strict";
        var r = e("./RAFInterfaceController");
        t.exports = r.requestAnimationFrame("update")
    }, {
        "./RAFInterfaceController": 209
    }],
    217: [function(e, t, i) {
        arguments[4][94][0].apply(i, arguments)
    }, {
        "./utils/getBoundingClientRect": 219,
        dup: 94
    }],
    218: [function(e, t, i) {
        "use strict";
        var r = e("./getDimensions"),
            n = e("./utils/getBoundingClientRect");
        t.exports = function(e, t) {
            var i, o, s;
            return t ? (i = n(e), e.offsetParent && (o = n(e.offsetParent), i.top -= o.top, i.left -= o.left)) : (s = r(e, t), i = {
                top: e.offsetTop,
                left: e.offsetLeft,
                width: s.width,
                height: s.height
            }), {
                top: i.top,
                right: i.left + i.width,
                bottom: i.top + i.height,
                left: i.left
            }
        }
    }, {
        "./getDimensions": 217,
        "./utils/getBoundingClientRect": 219
    }],
    219: [function(e, t, i) {
        arguments[4][95][0].apply(i, arguments)
    }, {
        dup: 95
    }],
    220: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            this.el = e, this._options = t || {}, this._wrapper = this.el.querySelector(this._options.itemsSelector), this._items = Array.prototype.slice.call(this.el.querySelectorAll(this._options.itemSelector)), this.lastCenteredItem = this._items[0], this._isRightToLeft = "rtl" === window.getComputedStyle(e).direction, this._inlineStart = this._isRightToLeft ? "right" : "left", this._inlineEnd = this._isRightToLeft ? "left" : "right", this._scrollType = this._scrollDirection(), this._usePaddles = void 0 === this._options.usePaddles ? a() : this._options.usePaddles, this.centerItem = this.centerItem.bind(this), this._onScrollClipUpdate = this._onScrollClipUpdate.bind(this), this._init()
        }
        var n = e("@marcom/ac-dom-metrics/getDimensions"),
            o = e("@marcom/ac-dom-metrics/getPosition"),
            s = e("@marcom/ac-clip").Clip,
            a = e("@marcom/ac-feature/touchAvailable"),
            l = r.prototype;
        l._init = function() {
            this._usePaddles && this._setupPaddles()
        }, l.centerItem = function(e, t) {
            this.lastCenteredItem = e;
            var i = n(this.el).width,
                r = .5 * i,
                s = o(e).left,
                a = n(e).width,
                l = s + .5 * a,
                c = Math.round(l - r);
            return t ? void(this.el.scrollLeft = this._setNormalizedScroll(c)) : (this._destroyCurrentClip(), this._isRightToLeft && (c *= -1), void this._smoothScrollTo(c))
        }, l._getPaddles = function() {
            var e = this._isRightToLeft ? this._options.rightPaddleSelector : this._options.leftPaddleSelector,
                t = this._isRightToLeft ? this._options.leftPaddleSelector : this._options.rightPaddleSelector;
            return {
                start: this.el.querySelector(e),
                end: this.el.querySelector(t)
            }
        }, l._setupPaddles = function() {
            this.el.classList.add("with-paddles"), this._paddles = this._getPaddles(), this._children = this._wrapper.children, this._childCount = this._wrapper.children.length, this._onScrollClipComplete = this._onScrollClipComplete.bind(this), this._onPaddleStartClick = this._onPaddleStartClick.bind(this), this._paddles.start.addEventListener("click", this._onPaddleStartClick), this._onPaddleEndClick = this._onPaddleEndClick.bind(this), this._paddles.end.addEventListener("click", this._onPaddleEndClick), this._onScroll = this._onScroll.bind(this), this._wrapper.addEventListener("scroll", this._onScroll), this._updateElementMetrics = this._updateElementMetrics.bind(this), window.addEventListener("resize", this._updateElementMetrics), window.addEventListener("orientationchange", this._updateElementMetrics), this._updateElementMetrics()
        }, l._updateElementMetrics = function() {
            this._wrapperWidth = this._wrapper.offsetWidth, this._contentWidth = this._wrapper.scrollWidth, this._contentWidth <= this._wrapperWidth && (this._destroyCurrentClip(), 0 !== this._wrapper.scrollLeft && (this._wrapper.scrollLeft = 0)), this._scrollStart = this._wrapper.scrollLeft, this._usePaddles && (this._paddleWidth = this._paddles.start.offsetWidth, this._updatePaddleDisplay())
        }, l._onScroll = function() {
            this._lockPaddles || (this._scrollStart = this._wrapper.scrollLeft, this._updatePaddleDisplay())
        }, l._updatePaddleDisplay = function() {
            var e = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth,
                t = 1;
            this._paddles.start.disabled = this._getNormalizedScroll(this._scrollStart) <= t, this._paddles.end.disabled = e >= this._contentWidth - t
        }, l._onPaddleStartClick = function(e) {
            this._smoothScrollTo(this._getPaddleStartScrollDestination())
        }, l._getPaddleStartScrollDestination = function() {
            var e, t, i = this._getNormalizedScroll(this._scrollStart);
            for (t = this._childCount - 1; t > 0; t--)
                if (e = this._normalizePosition(o(this._children[t])), e[this._inlineStart] < i) return e[this._inlineEnd] - this._wrapperWidth;
            return 0
        }, l._onPaddleEndClick = function(e) {
            this._smoothScrollTo(this._getPaddleEndScrollDestination())
        }, l._getPaddleEndScrollDestination = function() {
            var e, t, i = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth;
            for (t = 0; t < this._childCount; t++)
                if (e = this._normalizePosition(o(this._children[t])), e[this._inlineEnd] > i) return e[this._inlineStart];
            return this._contentWidth
        }, l._getBoundedScrollX = function(e) {
            var t = this._contentWidth - this._wrapperWidth;
            return Math.max(Math.min(e, t), 0)
        }, l._smoothScrollTo = function(e) {
            if (this._updateElementMetrics(), !this._lockPaddles && e !== this._scrollStart) {
                var t = {
                        scrollLeft: this._wrapper.scrollLeft
                    },
                    i = {
                        scrollLeft: this._setNormalizedScroll(e)
                    },
                    r = {
                        ease: this._options.scrollEasing,
                        onUpdate: this._onScrollClipUpdate
                    };
                this._usePaddles && (this._lockPaddles = !0, r.onComplete = this._onScrollClipComplete), this._clip = s.to(t, this._options.scrollDuration, i, r)
            }
        }, l._onScrollClipUpdate = function(e) {
            this._scrollStart = this._wrapper.scrollLeft = Math.round(e.target().scrollLeft)
        }, l._onScrollClipComplete = function() {
            this._updatePaddleDisplay(), this._lockPaddles = !1
        }, l._scrollDirection = function() {
            var e = "reverse",
                t = document.createElement("div");
            return t.style.cssText = "width:2px; height:1px; position:absolute; top:-1000px; overflow:scroll; font-size: 14px;", t.style.direction = "rtl", t.innerHTML = "test", document.body.appendChild(t), t.scrollLeft > 0 ? e = "default" : (t.scrollLeft = 1, 0 === t.scrollLeft && (e = "negative")), document.body.removeChild(t), e
        }, l._getNormalizedScroll = function(e) {
            if (!this._isRightToLeft) return e;
            var t = Math.abs(e);
            return "default" === this._scrollType && (t = this._contentWidth - this._wrapperWidth - t), t
        }, l._setNormalizedScroll = function(e) {
            var t = this._getBoundedScrollX(e);
            return this._isRightToLeft && "reverse" !== this._scrollType ? "negative" === this._scrollType ? -t : -(t - this._contentWidth + this._wrapperWidth) : t
        }, l._normalizePosition = function(e) {
            return this._isRightToLeft ? {
                top: e.top,
                right: this._wrapperWidth - e.right + this._paddleWidth,
                bottom: e.bottom,
                left: this._wrapperWidth - e.left + this._paddleWidth
            } : {
                top: e.top,
                right: e.right - this._paddleWidth,
                bottom: e.bottom,
                left: e.left - this._paddleWidth
            }
        }, l._destroyCurrentClip = function() {
            this._clip && this._clip.playing() && (this._clip.destroy(), this._lockPaddles = !1)
        }, l._destroyPaddles = function() {
            this._paddles.start.removeEventListener("click", this._onPaddleStartClick), this._paddles.end.removeEventListener("click", this._onPaddleEndClick), this._wrapper.removeEventListener("scroll", this._onScroll), this._paddles = null
        }, l.destroy = function() {
            this._items = null, this._destroyCurrentClip(), this._destroyPaddles(), window.removeEventListener("resize", this._updateElementMetrics), window.removeEventListener("orientationchange", this._updateElementMetrics)
        }, t.exports = r
    }, {
        "@marcom/ac-clip": 20,
        "@marcom/ac-dom-metrics/getDimensions": 217,
        "@marcom/ac-dom-metrics/getPosition": 218,
        "@marcom/ac-feature/touchAvailable": 142
    }],
    221: [function(e, t, i) {
        "use strict";
        var r = e("./ScrollContainer");
        t.exports = {
            ScrollContainer: r
        }
    }, {
        "./ScrollContainer": 220
    }],
    222: [function(e, t, i) {
        "use strict";
        t.exports = {
            SharedInstance: e("./ac-shared-instance/SharedInstance")
        }
    }, {
        "./ac-shared-instance/SharedInstance": 223
    }],
    223: [function(e, t, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            n = window,
            o = "AC",
            s = "SharedInstance",
            a = n[o],
            l = function() {
                var e = {};
                return {
                    get: function(t, i) {
                        var r = null;
                        return e[t] && e[t][i] && (r = e[t][i]), r
                    },
                    set: function(t, i, r) {
                        return e[t] || (e[t] = {}), "function" == typeof r ? e[t][i] = new r : e[t][i] = r, e[t][i]
                    },
                    share: function(e, t, i) {
                        var r = this.get(e, t);
                        return r || (r = this.set(e, t, i)), r
                    },
                    remove: function(t, i) {
                        var n = "undefined" == typeof i ? "undefined" : r(i);
                        if ("string" === n || "number" === n) {
                            if (!e[t] || !e[t][i]) return;
                            return void(e[t][i] = null)
                        }
                        e[t] && (e[t] = null)
                    }
                }
            }();
        a || (a = n[o] = {}), a[s] || (a[s] = l), t.exports = a[s]
    }, {}],
    224: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-eclipse").Clip,
            n = e("@marcom/ac-feature/cssPropertyAvailable");
        t.exports = function(e, t, i, o, s) {
            if (n("opacity")) {
                if (s = s || {}, o) return s.autoplay = s.autoplay !== !1 || s.autoplay, s.propsFrom = s.propsFrom || {}, s.propsFrom.opacity = t, s.autoplay ? r.to(e, o, {
                    opacity: i
                }, s) : new r(e, o, {
                    opacity: i
                }, s);
                e.style.opacity = i, "function" == typeof s.onStart && s.onStart(), "function" == typeof s.onComplete && s.onComplete()
            } else e.style.visibility = i ? "visible" : "hidden", "function" == typeof s.onStart && s.onStart(), "function" == typeof s.onComplete && s.onComplete()
        }
    }, {
        "@marcom/ac-eclipse": 98,
        "@marcom/ac-feature/cssPropertyAvailable": 126
    }],
    225: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-eclipse").Clip,
            n = e("@marcom/ac-feature/cssPropertyAvailable");
        t.exports = function(e, t, i) {
            var o = 1;
            if (i = i || {}, n("opacity")) {
                if (t) return i.autoplay = i.autoplay !== !1 || i.autoplay, i.autoplay ? r.to(e, t, {
                    opacity: o
                }, i) : new r(e, t, {
                    opacity: o
                }, i);
                e.style.opacity = o, "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
            } else e.style.visibility = "visible", "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
        }
    }, {
        "@marcom/ac-eclipse": 98,
        "@marcom/ac-feature/cssPropertyAvailable": 126
    }],
    226: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-eclipse").Clip,
            n = e("@marcom/ac-feature/cssPropertyAvailable");
        t.exports = function(e, t, i) {
            var o = 0;
            if (i = i || {}, n("opacity")) {
                if (t) return i.autoplay = i.autoplay !== !1 || i.autoplay, i.autoplay ? r.to(e, t, {
                    opacity: o
                }, i) : new r(e, t, {
                    opacity: o
                }, i);
                e.style.opacity = o, "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
            } else e.style.visibility = "hidden", "function" == typeof i.onStart && i.onStart(), "function" == typeof i.onComplete && i.onComplete()
        }
    }, {
        "@marcom/ac-eclipse": 98,
        "@marcom/ac-feature/cssPropertyAvailable": 126
    }],
    227: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-eclipse").Clip,
            n = e("@marcom/ac-dom-styles");
        t.exports = function(e, t, i, o, s) {
            s = s || {}, s.autoplay = s.autoplay !== !1 || s.autoplay;
            var a, l = s.onStart || null,
                c = s.onComplete || null;
            return a = {
                transform: {
                    translateX: t + "px",
                    translateY: i + "px"
                }
            }, o ? (s.onStart = function() {
                e.style.willChange = "transform", null !== l && l.call(this)
            }, s.onComplete = function() {
                e.style.willChange = "", null !== c && c.call(this)
            }, s.autoplay ? r.to(e, o, a, s) : new r(e, o, a, s)) : (n.setStyle(e, a), "function" == typeof s.onStart && s.onStart(), void("function" == typeof s.onComplete && s.onComplete()))
        }
    }, {
        "@marcom/ac-dom-styles": 75,
        "@marcom/ac-eclipse": 98
    }],
    228: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-browser-prefixed"),
            n = e("@marcom/ac-transform").Transform,
            o = e("./move");
        t.exports = function(e, t, i, s) {
            var a = new n;
            return a.setMatrixValue(getComputedStyle(e)[r.transform]), o(e, t, a.getTranslateY(), i, s)
        }
    }, {
        "./move": 227,
        "@marcom/ac-browser-prefixed": 11,
        "@marcom/ac-transform": 230
    }],
    229: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            return t = Object.assign({}, o, t), new n(e, t)
        }
        var n = e("@marcom/ac-scroll-container").ScrollContainer,
            o = {
                itemsSelector: ".tabnav-items",
                itemSelector: ".tabnav-link",
                leftPaddleSelector: ".tabnav-paddle-left",
                rightPaddleSelector: ".tabnav-paddle-right",
                scrollEasing: "ease-out",
                scrollDuration: .5,
                usePaddles: !0
            };
        t.exports = r
    }, {
        "@marcom/ac-scroll-container": 221
    }],
    230: [function(e, t, i) {
        "use strict";
        t.exports = {
            Transform: e("./ac-transform/Transform")
        }
    }, {
        "./ac-transform/Transform": 231
    }],
    231: [function(e, t, i) {
        "use strict";

        function r() {
            this.m = n.create()
        }
        var n = e("./gl-matrix/mat4"),
            o = e("./gl-matrix/vec3"),
            s = e("./gl-matrix/vec4"),
            a = Math.PI / 180,
            l = 180 / Math.PI,
            c = 0,
            u = 0,
            h = 1,
            m = 1,
            p = 2,
            d = 3,
            f = 4,
            y = 4,
            _ = 5,
            g = 5,
            v = 6,
            b = 7,
            E = 8,
            w = 9,
            S = 10,
            T = 11,
            C = 12,
            P = 12,
            O = 13,
            x = 13,
            A = 14,
            k = 15,
            I = r.prototype;
        I.rotateX = function(e) {
            var t = a * e;
            return n.rotateX(this.m, this.m, t), this
        }, I.rotateY = function(e) {
            var t = a * e;
            return n.rotateY(this.m, this.m, t), this
        }, I.rotateZ = function(e) {
            var t = a * e;
            return n.rotateZ(this.m, this.m, t), this
        }, I.rotate = I.rotateZ, I.rotate3d = function(e, t, i, r) {
            null !== t && void 0 !== t || (t = e), null !== i && void 0 !== t || (i = e);
            var o = a * r;
            return n.rotate(this.m, this.m, o, [e, t, i]), this
        }, I.rotateAxisAngle = I.rotate3d, I.scale = function(e, t) {
            return t = t || e, n.scale(this.m, this.m, [e, t, 1]), this
        }, I.scaleX = function(e) {
            return n.scale(this.m, this.m, [e, 1, 1]), this
        }, I.scaleY = function(e) {
            return n.scale(this.m, this.m, [1, e, 1]), this
        }, I.scaleZ = function(e) {
            return n.scale(this.m, this.m, [1, 1, e]), this
        }, I.scale3d = function(e, t, i) {
            return n.scale(this.m, this.m, [e, t, i]), this
        }, I.skew = function(e, t) {
            if (null === t || void 0 === t) return this.skewX(e);
            e = a * e, t = a * t;
            var i = n.create();
            return i[y] = Math.tan(e), i[m] = Math.tan(t), n.multiply(this.m, this.m, i), this
        }, I.skewX = function(e) {
            e = a * e;
            var t = n.create();
            return t[y] = Math.tan(e), n.multiply(this.m, this.m, t), this
        }, I.skewY = function(e) {
            e = a * e;
            var t = n.create();
            return t[m] = Math.tan(e), n.multiply(this.m, this.m, t), this
        }, I.translate = function(e, t) {
            return t = t || 0, n.translate(this.m, this.m, [e, t, 0]), this
        }, I.translate3d = function(e, t, i) {
            return n.translate(this.m, this.m, [e, t, i]), this
        }, I.translateX = function(e) {
            return n.translate(this.m, this.m, [e, 0, 0]), this
        }, I.translateY = function(e) {
            return n.translate(this.m, this.m, [0, e, 0]), this
        }, I.translateZ = function(e) {
            return n.translate(this.m, this.m, [0, 0, e]), this
        }, I.perspective = function(e) {
            var t = n.create();
            0 !== e && (t[T] = -1 / e), n.multiply(this.m, this.m, t)
        }, I.inverse = function() {
            var e = this.clone();
            return e.m = n.invert(e.m, this.m), e
        }, I.reset = function() {
            return n.identity(this.m), this
        }, I.getTranslateXY = function() {
            var e = this.m;
            return this.isAffine() ? [e[P], e[x]] : [e[C], e[O]]
        }, I.getTranslateXYZ = function() {
            var e = this.m;
            return this.isAffine() ? [e[P], e[x], 0] : [e[C], e[O], e[A]]
        }, I.getTranslateX = function() {
            var e = this.m;
            return this.isAffine() ? e[P] : e[C]
        }, I.getTranslateY = function() {
            var e = this.m;
            return this.isAffine() ? e[x] : e[O]
        }, I.getTranslateZ = function() {
            var e = this.m;
            return this.isAffine() ? 0 : e[A]
        }, I.clone = function() {
            var e = new r;
            return e.m = n.clone(this.m), e
        }, I.toArray = function() {
            var e = this.m;
            return this.isAffine() ? [e[u], e[m], e[y], e[g], e[P], e[x]] : [e[c], e[h], e[p], e[d], e[f], e[_], e[v], e[b], e[E], e[w], e[S], e[T], e[C], e[O], e[A], e[k]]
        }, I.fromArray = function(e) {
            return this.m = Array.prototype.slice.call(e), this
        }, I.setMatrixValue = function(e) {
            e = String(e).trim();
            var t = n.create();
            if ("none" === e) return this.m = t, this;
            var i, r, o = e.slice(0, e.indexOf("("));
            if ("matrix3d" === o)
                for (i = e.slice(9, -1).split(","), r = 0; r < i.length; r++) t[r] = parseFloat(i[r]);
            else {
                if ("matrix" !== o) throw new TypeError("Invalid Matrix Value");
                for (i = e.slice(7, -1).split(","), r = i.length; r--;) i[r] = parseFloat(i[r]);
                t[c] = i[0], t[h] = i[1], t[C] = i[4], t[f] = i[2], t[_] = i[3], t[O] = i[5]
            }
            return this.m = t, this
        };
        var M = function(e) {
            return Math.abs(e) < 1e-4
        };
        I.decompose = function(e) {
            e = e || !1;
            for (var t = n.clone(this.m), i = o.create(), r = o.create(), a = o.create(), c = s.create(), u = s.create(), h = (o.create(), 0); h < 16; h++) t[h] /= t[k];
            var m = n.clone(t);
            m[d] = 0, m[b] = 0, m[T] = 0, m[k] = 1;
            var p = (t[3], t[7], t[11], t[12]),
                f = t[13],
                y = t[14],
                _ = (t[15], s.create());
            if (M(t[d]) && M(t[b]) && M(t[T])) c = s.fromValues(0, 0, 0, 1);
            else {
                _[0] = t[d], _[1] = t[b], _[2] = t[T], _[3] = t[k];
                var g = n.invert(n.create(), m),
                    v = n.transpose(n.create(), g);
                c = s.transformMat4(c, _, v)
            }
            i[0] = p, i[1] = f, i[2] = y;
            var E = [o.create(), o.create(), o.create()];
            E[0][0] = t[0], E[0][1] = t[1], E[0][2] = t[2], E[1][0] = t[4], E[1][1] = t[5], E[1][2] = t[6], E[2][0] = t[8], E[2][1] = t[9], E[2][2] = t[10], r[0] = o.length(E[0]), o.normalize(E[0], E[0]), a[0] = o.dot(E[0], E[1]), E[1] = this._combine(E[1], E[0], 1, -a[0]), r[1] = o.length(E[1]), o.normalize(E[1], E[1]), a[0] /= r[1], a[1] = o.dot(E[0], E[2]), E[2] = this._combine(E[2], E[0], 1, -a[1]), a[2] = o.dot(E[1], E[2]), E[2] = this._combine(E[2], E[1], 1, -a[2]), r[2] = o.length(E[2]), o.normalize(E[2], E[2]), a[1] /= r[2], a[2] /= r[2];
            var w = o.cross(o.create(), E[1], E[2]);
            if (o.dot(E[0], w) < 0)
                for (h = 0; h < 3; h++) r[h] *= -1, E[h][0] *= -1, E[h][1] *= -1, E[h][2] *= -1;
            u[0] = .5 * Math.sqrt(Math.max(1 + E[0][0] - E[1][1] - E[2][2], 0)), u[1] = .5 * Math.sqrt(Math.max(1 - E[0][0] + E[1][1] - E[2][2], 0)), u[2] = .5 * Math.sqrt(Math.max(1 - E[0][0] - E[1][1] + E[2][2], 0)), u[3] = .5 * Math.sqrt(Math.max(1 + E[0][0] + E[1][1] + E[2][2], 0)), E[2][1] > E[1][2] && (u[0] = -u[0]), E[0][2] > E[2][0] && (u[1] = -u[1]), E[1][0] > E[0][1] && (u[2] = -u[2]);
            var S = s.fromValues(u[0], u[1], u[2], 2 * Math.acos(u[3])),
                C = this._rotationFromQuat(u);
            return e && (a[0] = Math.round(a[0] * l * 100) / 100, a[1] = Math.round(a[1] * l * 100) / 100, a[2] = Math.round(a[2] * l * 100) / 100, C[0] = Math.round(C[0] * l * 100) / 100, C[1] = Math.round(C[1] * l * 100) / 100, C[2] = Math.round(C[2] * l * 100) / 100, S[3] = Math.round(S[3] * l * 100) / 100), {
                translation: i,
                scale: r,
                skew: a,
                perspective: c,
                quaternion: u,
                eulerRotation: C,
                axisAngle: S
            }
        }, I.recompose = function(e, t, i, r, a) {
            e = e || o.create(), t = t || o.create(), i = i || o.create(), r = r || s.create(), a = a || s.create();
            var l = n.fromRotationTranslation(n.create(), a, e);
            l[d] = r[0], l[b] = r[1], l[T] = r[2], l[k] = r[3];
            var c = n.create();
            return 0 !== i[2] && (c[w] = i[2], n.multiply(l, l, c)), 0 !== i[1] && (c[w] = 0, c[E] = i[1], n.multiply(l, l, c)), i[0] && (c[E] = 0, c[4] = i[0], n.multiply(l, l, c)), n.scale(l, l, t), this.m = l, this
        }, I.isAffine = function() {
            return 0 === this.m[p] && 0 === this.m[d] && 0 === this.m[v] && 0 === this.m[b] && 0 === this.m[E] && 0 === this.m[w] && 1 === this.m[S] && 0 === this.m[T] && 0 === this.m[A] && 1 === this.m[k]
        }, I.toString = function() {
            var e = this.m;
            return this.isAffine() ? "matrix(" + e[u] + ", " + e[m] + ", " + e[y] + ", " + e[g] + ", " + e[P] + ", " + e[x] + ")" : "matrix3d(" + e[c] + ", " + e[h] + ", " + e[p] + ", " + e[d] + ", " + e[f] + ", " + e[_] + ", " + e[v] + ", " + e[b] + ", " + e[E] + ", " + e[w] + ", " + e[S] + ", " + e[T] + ", " + e[C] + ", " + e[O] + ", " + e[A] + ", " + e[k] + ")"
        }, I.toCSSString = I.toString, I._combine = function(e, t, i, r) {
            var n = o.create();
            return n[0] = i * e[0] + r * t[0], n[1] = i * e[1] + r * t[1], n[2] = i * e[2] + r * t[2], n
        }, I._matrix2dToMat4 = function(e) {
            for (var t = n.create(), i = 0; i < 4; i++)
                for (var r = 0; r < 4; r++) t[4 * i + r] = e[i][r];
            return t
        }, I._mat4ToMatrix2d = function(e) {
            for (var t = [], i = 0; i < 4; i++) {
                t[i] = [];
                for (var r = 0; r < 4; r++) t[i][r] = e[4 * i + r]
            }
            return t
        }, I._rotationFromQuat = function(e) {
            var t, i, r, n = e[3] * e[3],
                s = e[0] * e[0],
                a = e[1] * e[1],
                l = e[2] * e[2],
                c = s + a + l + n,
                u = e[0] * e[1] + e[2] * e[3];
            return u > .499 * c ? (i = 2 * Math.atan2(e[0], e[3]), r = Math.PI / 2, t = 0, o.fromValues(t, i, r)) : u < -.499 * c ? (i = -2 * Math.atan2(e[0], e[3]), r = -Math.PI / 2, t = 0, o.fromValues(t, i, r)) : (i = Math.atan2(2 * e[1] * e[3] - 2 * e[0] * e[2], s - a - l + n), r = Math.asin(2 * u / c), t = Math.atan2(2 * e[0] * e[3] - 2 * e[1] * e[2], -s + a - l + n), o.fromValues(t, i, r))
        }, t.exports = r
    }, {
        "./gl-matrix/mat4": 232,
        "./gl-matrix/vec3": 233,
        "./gl-matrix/vec4": 234
    }],
    232: [function(e, t, i) {
        "use strict";
        var r = {
            create: e("gl-mat4/create"),
            rotate: e("gl-mat4/rotate"),
            rotateX: e("gl-mat4/rotateX"),
            rotateY: e("gl-mat4/rotateY"),
            rotateZ: e("gl-mat4/rotateZ"),
            scale: e("gl-mat4/scale"),
            multiply: e("gl-mat4/multiply"),
            translate: e("gl-mat4/translate"),
            invert: e("gl-mat4/invert"),
            clone: e("gl-mat4/clone"),
            transpose: e("gl-mat4/transpose"),
            identity: e("gl-mat4/identity"),
            fromRotationTranslation: e("gl-mat4/fromRotationTranslation")
        };
        t.exports = r
    }, {
        "gl-mat4/clone": 305,
        "gl-mat4/create": 306,
        "gl-mat4/fromRotationTranslation": 307,
        "gl-mat4/identity": 308,
        "gl-mat4/invert": 309,
        "gl-mat4/multiply": 310,
        "gl-mat4/rotate": 311,
        "gl-mat4/rotateX": 312,
        "gl-mat4/rotateY": 313,
        "gl-mat4/rotateZ": 314,
        "gl-mat4/scale": 315,
        "gl-mat4/translate": 316,
        "gl-mat4/transpose": 317
    }],
    233: [function(e, t, i) {
        "use strict";
        var r = {
            create: e("gl-vec3/create"),
            dot: e("gl-vec3/dot"),
            normalize: e("gl-vec3/normalize"),
            length: e("gl-vec3/length"),
            cross: e("gl-vec3/cross"),
            fromValues: e("gl-vec3/fromValues")
        };
        t.exports = r
    }, {
        "gl-vec3/create": 318,
        "gl-vec3/cross": 319,
        "gl-vec3/dot": 320,
        "gl-vec3/fromValues": 321,
        "gl-vec3/length": 322,
        "gl-vec3/normalize": 323
    }],
    234: [function(e, t, i) {
        "use strict";
        var r = {
            create: e("gl-vec4/create"),
            transformMat4: e("gl-vec4/transformMat4"),
            fromValues: e("gl-vec4/fromValues")
        };
        t.exports = r
    }, {
        "gl-vec4/create": 324,
        "gl-vec4/fromValues": 325,
        "gl-vec4/transformMat4": 326
    }],
    235: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            e = e || window.location.search, e = e.replace(/^[^?]*\?/, "");
            var t = "&",
                i = e ? e.split(t) : [],
                r = {},
                n = "=",
                o = new RegExp(n);
            return i.forEach(function(e) {
                var t, i;
                if (o.test(e)) {
                    var s = e.split(n, 2);
                    t = s[0], i = s[1]
                } else t = e, i = null;
                r[t] = i
            }), r
        }
    }, {}],
    236: [function(e, t, i) {
        "use strict";

        function r(e) {
            var t = e.port,
                i = new RegExp(":" + t);
            return t && !i.test(e.href) && i.test(e.host)
        }
        var n = e("./parseSearchParams");
        t.exports = function(e) {
            var t, i = "",
                o = !1;
            return e ? window.URL && "function" == typeof window.URL ? t = new URL(e, window.location) : (t = document.createElement("a"), t.href = e, t.href = t.href, r(t) && (i = t.host.replace(new RegExp(":" + t.port), ""), o = !0)) : t = window.location, {
                hash: t.hash,
                host: i || t.host,
                hostname: t.hostname,
                href: t.href,
                origin: t.origin || t.protocol + "//" + (i || t.host),
                pathname: t.pathname,
                port: o ? "" : t.port,
                protocol: t.protocol,
                search: t.search,
                searchParams: n(t.search)
            }
        }
    }, {
        "./parseSearchParams": 235
    }],
    237: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            l = e("./Model/AnimSystemModel"),
            c = e("./Keyframes/Keyframe"),
            u = e("./Keyframes/KeyframeCSSClass"),
            h = e("./Keyframes/KeyframeDiscreteEvent"),
            m = e("./ScrollGroup"),
            p = e("./TimeGroup"),
            d = e("./utils/arrayToObject"),
            f = {
                create: e("@marcom/ac-raf-emitter/RAFEmitter"),
                update: e("@marcom/ac-raf-emitter/update"),
                cancelUpdate: e("@marcom/ac-raf-emitter/cancelUpdate"),
                external: e("@marcom/ac-raf-emitter/external"),
                draw: e("@marcom/ac-raf-emitter/draw")
            },
            y = null,
            _ = function(e) {
                function t() {
                    r(this, t);
                    var e = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    if (y) throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                    return y = e, e.groups = [], e.scrollSystems = [], e.timeSystems = [], e._forceUpdateRAFId = -1, e.setupEvents(), e
                }
                return o(t, e), s(t, [{
                    key: "initialize",
                    value: function() {
                        var e = this;
                        this.initializeModel(), this.createDOMGroups(), f.external(function() {
                            e.setupAnimatedContent()
                        })
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.groups.forEach(function(e) {
                            return e.destroy()
                        }), this.groups = null, this.scrollSystems = null, this.timeSystems = null, window.clearTimeout(l.RESIZE_TIMEOUT), window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate)
                    }
                }, {
                    key: "createTimeGroup",
                    value: function(e) {
                        var t = new p(e, this);
                        return this.groups.push(t), this.timeSystems.push(t), this.trigger(l.EVENTS.ON_GROUP_CREATED, t), t
                    }
                }, {
                    key: "createScrollGroup",
                    value: function(e) {
                        if (!e) throw "AnimSystem scroll based groups must supply an HTMLElement";
                        var t = new m(e, this);
                        return this.groups.push(t), this.scrollSystems.push(t), this.trigger(l.EVENTS.ON_GROUP_CREATED, t), t
                    }
                }, {
                    key: "removeGroup",
                    value: function(e) {
                        var t = this;
                        e.keyframeControllers.forEach(function(t) {
                            return e.removeKeyframeController(t)
                        }), f.update(function() {
                            e.destroy();
                            var i = t.groups.indexOf(e);
                            i !== -1 && t.groups.splice(i, 1), i = t.scrollSystems.indexOf(e), i !== -1 && t.scrollSystems.splice(i, 1), i = t.timeSystems.indexOf(e), i !== -1 && t.timeSystems.splice(i, 1)
                        })
                    }
                }, {
                    key: "createDOMGroups",
                    value: function() {
                        var e = this;
                        document.body.setAttribute("data-anim-scroll-group", "body"), document.querySelectorAll("[data-anim-scroll-group]").forEach(function(t) {
                            return e.createScrollGroup(t)
                        }), document.querySelectorAll("[data-anim-time-group]").forEach(function(t) {
                            return e.createTimeGroup(t)
                        }), this.trigger(l.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
                    }
                }, {
                    key: "setupAnimatedContent",
                    value: function() {
                        var e = this,
                            t = [];
                        [c.DATA_ATTRIBUTE, u.DATA_ATTRIBUTE, h.DATA_ATTRIBUTE].forEach(function(e) {
                            for (var i = 0; i < 12; i++) t.push(e + (0 === i ? "" : "-" + (i - 1)))
                        });
                        for (var i = 0; i < t.length; i++)
                            for (var r = t[i], n = document.querySelectorAll("[" + r + "]"), o = 0; o < n.length; o++) {
                                var s = n[o],
                                    a = JSON.parse(s.getAttribute(r));
                                this.addKeyframe(s, a)
                            }
                        f.update(function() {
                            return e.groups.forEach(function(e) {
                                return e.onKeyframesDirty({
                                    preventOnScroll: !0
                                })
                            })
                        }, !0), f.update(function() {
                            e.groups.forEach(function(e) {
                                return e.trigger(l.EVENTS.ON_DOM_KEYFRAMES_CREATED, e)
                            }), e.trigger(l.EVENTS.ON_DOM_KEYFRAMES_CREATED, e), e.groups.forEach(function(e) {
                                return e.reconcile()
                            }), e.onScroll()
                        }, !0)
                    }
                }, {
                    key: "initializeModel",
                    value: function() {
                        l.pageMetrics.windowHeight = window.innerHeight, l.pageMetrics.windowWidth = window.innerWidth, l.pageMetrics.scrollY = window.scrollY || window.pageYOffset, l.pageMetrics.scrollX = window.scrollX || window.pageXOffset, l.pageMetrics.breakpoint = l.getBreakpoint();
                        var e = document.documentElement.getBoundingClientRect();
                        l.pageMetrics.documentOffsetX = e.left + l.pageMetrics.scrollX, l.pageMetrics.documentOffsetY = e.top + l.pageMetrics.scrollY
                    }
                }, {
                    key: "setupEvents",
                    value: function() {
                        this.onScroll = this.onScroll.bind(this), this.onResizedDebounced = this.onResizedDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this), window.addEventListener("scroll", this.onScroll), window.addEventListener("resize", this.onResizeImmediate)
                    }
                }, {
                    key: "determineActiveKeyframes",
                    value: function() {
                        for (var e = d(Array.from(document.documentElement.classList)), t = 0, i = this.groups.length; t < i; t++) this.groups[t].determineActiveKeyframes(e)
                    }
                }, {
                    key: "onScroll",
                    value: function() {
                        l.pageMetrics.scrollY = window.scrollY || window.pageYOffset, l.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                        for (var e = 0, t = this.scrollSystems.length; e < t; e++) this.scrollSystems[e]._onScroll();
                        this.trigger(l.PageEvents.ON_SCROLL, l.pageMetrics)
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function() {
                        l.pageMetrics.windowHeight = window.innerHeight, l.pageMetrics.windowWidth = window.innerWidth, l.pageMetrics.scrollY = window.scrollY || window.pageYOffset, l.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                        var e = document.documentElement.getBoundingClientRect();
                        l.pageMetrics.documentOffsetX = e.left + l.pageMetrics.scrollX, l.pageMetrics.documentOffsetY = e.top + l.pageMetrics.scrollY, window.clearTimeout(l.RESIZE_TIMEOUT), l.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250), this.trigger(l.PageEvents.ON_RESIZE_IMMEDIATE, l.pageMetrics)
                    }
                }, {
                    key: "onResizedDebounced",
                    value: function() {
                        var e = this;
                        f.update(function() {
                            var t = l.pageMetrics.breakpoint,
                                i = l.getBreakpoint(),
                                r = i !== t;
                            if (r) {
                                l.pageMetrics.previousBreakpoint = t, l.pageMetrics.breakpoint = i;
                                for (var n = 0, o = e.groups.length; n < o; n++) e.groups[n]._onBreakpointChange();
                                e.trigger(l.PageEvents.ON_BREAKPOINT_CHANGE, l.pageMetrics)
                            }
                            for (var s = 0, a = e.groups.length; s < a; s++) e.groups[s].forceUpdate({
                                recalculateActiveKeyframes: r,
                                waitForNextUpdate: !1
                            });
                            e.trigger(l.PageEvents.ON_RESIZE_DEBOUNCED, l.pageMetrics)
                        }, !0)
                    }
                }, {
                    key: "forceUpdate",
                    value: function() {
                        var e = this,
                            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            i = t.recalculateActiveKeyframes,
                            r = void 0 !== i && i,
                            n = t.waitForNextUpdate,
                            o = void 0 === n || n;
                        this._forceUpdateRAFId !== -1 && f.cancelUpdate(this._forceUpdateRAFId);
                        var s = function() {
                            for (var t = 0, i = e.groups.length; t < i; t++) {
                                var n = e.groups[t];
                                n.forceUpdate({
                                    recalculateActiveKeyframes: r,
                                    waitForNextUpdate: !1
                                })
                            }
                            return -1
                        };
                        this._forceUpdateRAFId = o ? f.update(s, !0) : s()
                    }
                }, {
                    key: "addKeyframe",
                    value: function(e, t) {
                        var i = this.getGroupForTarget(e);
                        return i.addKeyframe(e, t)
                    }
                }, {
                    key: "getGroupForTarget",
                    value: function(e) {
                        if (e._animInfo && e._animInfo.group) return e._animInfo.group;
                        for (var t = e; t;) {
                            if (t._animInfo && t._animInfo.isGroup) return t._animInfo.group;
                            t = t.parentElement
                        }
                    }
                }, {
                    key: "getControllerForTarget",
                    value: function(e) {
                        return e._animInfo && e._animInfo.controller ? e._animInfo.controller : null
                    }
                }]), t
            }(a);
        t.exports = new _
    }, {
        "./Keyframes/Keyframe": 239,
        "./Keyframes/KeyframeCSSClass": 240,
        "./Keyframes/KeyframeDiscreteEvent": 241,
        "./Model/AnimSystemModel": 242,
        "./ScrollGroup": 251,
        "./TimeGroup": 252,
        "./utils/arrayToObject": 253,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-raf-emitter/RAFEmitter": 206,
        "@marcom/ac-raf-emitter/cancelUpdate": 211,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/external": 213,
        "@marcom/ac-raf-emitter/update": 216
    }],
    238: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function _(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : _(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("./Model/AnimSystemModel"),
            c = (e("./Keyframes/Keyframe"), e("./Keyframes/KeyframeCSSClass")),
            u = e("./Model/InferKeyframeFromProps"),
            h = e("./utils/arrayToObject"),
            m = e("./Model/UUID"),
            p = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            d = e("@marcom/decompose-css-transform"),
            f = {
                update: e("@marcom/ac-raf-emitter/update"),
                external: e("@marcom/ac-raf-emitter/external"),
                draw: e("@marcom/ac-raf-emitter/draw")
            },
            y = function(e) {
                function t(e, i) {
                    r(this, t);
                    var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return o.uuid = m(), o.group = e, o.element = i, o._ownerIsElement = o.element instanceof Element, o._ownerIsElement ? o.friendlyName = o.element.tagName + "." + Array.from(o.element.classList).join(".") : o.friendlyName = o.element.friendlyName || o.uuid, o.element._animInfo = o.element._animInfo || new l.AnimInfo(e, o), o.element._animInfo.controller = o, o.tweenProps = {}, o.eventObject = new l.EventObject(o), o.needsStyleUpdate = !1, o.needsClassUpdate = !1, o.elementMetrics = o.group.metrics.add(o.element), o._parentElementMetrics = null, o.attributes = [], o.keyframes = {}, o._allKeyframes = [], o._activeKeyframes = [], o.keyframesRequiringDispatch = [], o.updateCachedValuesFromElement(), o.boundsMin = 0, o.boundsMax = 0, o
                }
                return o(t, e), s(t, [{
                    key: "destroy",
                    value: function() {
                        this.element._animInfo && this.element._animInfo.controller === this && (this.element._animInfo.controller = null, this.element._animInfo = null), this._parentElementMetrics = null, this.eventObject.controller = null, this.eventObject.element = null, this.eventObject.keyframe = null, this.eventObject.tweenProps = null, this.eventObject = null, this.elementMetrics = null, this.group = null, this.keyframesRequiringDispatch = null;
                        for (var e = 0; e < this._allKeyframes.length; e++) this._allKeyframes[e].destroy();
                        this._allKeyframes = null, this._activeKeyframes = null, this.attributes = null, this.keyframes = null, this.element = null, this.tweenProps = null, a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "remove",
                    value: function() {
                        this.group.removeKeyframeController(this)
                    }
                }, {
                    key: "updateCachedValuesFromElement",
                    value: function() {
                        if (this._ownerIsElement) {
                            var e = getComputedStyle(this.element),
                                t = d(this.element, !0),
                                i = l.KeyframeDefaults.epsilon,
                                r = !1;
                            this.tweenProps.x = new l.TargetValue(t.translation[0], i, r), this.tweenProps.y = new l.TargetValue(t.translation[1], i, r), this.tweenProps.z = new l.TargetValue(t.translation[2], i, r), this.tweenProps.rotation = new l.TargetValue(t.eulerRotation[2], i, r), this.tweenProps.scale = new l.TargetValue(t.scale[0], i, r), this.tweenProps.scaleX = new l.TargetValue(t.scale[0], i, r), this.tweenProps.scaleY = new l.TargetValue(t.scale[1], i, r), this.tweenProps.opacity = new l.TargetValue(parseFloat(e.opacity), i, r)
                        }
                    }
                }, {
                    key: "addKeyframe",
                    value: function(e) {
                        var t = u(e);
                        if (!t) throw new Error("AnimSystem Cannot create keyframe for from options `" + e + "`");
                        var i = new t(this, e);
                        return i.parseOptions(e), i.id = this._allKeyframes.length, this._allKeyframes.push(i), i
                    }
                }, {
                    key: "needsUpdate",
                    value: function() {
                        for (var e = 0, t = this.attributes.length; e < t; e++) {
                            var i = this.attributes[e],
                                r = this.tweenProps[i],
                                n = Math.abs(r.current - r.target);
                            if (n > r.epsilon) return !0
                        }
                        return !1
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(e) {
                        for (var t = 0, i = this.attributes.length; t < i; t++) {
                            var r = this.attributes[t],
                                n = this.keyframes[this.attributes[t]];
                            if (1 !== n.length) {
                                var o = this.getNearestKeyframeForAttribute(e, r);
                                o && o.updateLocalProgress(e)
                            } else n[0].updateLocalProgress(e)
                        }
                    }
                }, {
                    key: "reconcile",
                    value: function() {
                        for (var e = 0, t = this.attributes.length; e < t; e++) {
                            var i = this.attributes[e],
                                r = this.getNearestKeyframeForAttribute(this.group.timelines.local, i);
                            r.updateLocalProgress(this.group.timelines.local), r.snapAtCreation && r.reconcile(i)
                        }
                    }
                }, {
                    key: "determineActiveKeyframes",
                    value: function(e) {
                        var t = this;
                        e = e || h(Array.from(document.documentElement.classList));
                        var i = this._activeKeyframes,
                            r = this.attributes;
                        this._activeKeyframes = [], this.attributes = [], this.keyframes = {};
                        for (var n = 0; n < this._allKeyframes.length; n++) {
                            var o = this._allKeyframes[n];
                            if (o.setEnabled(e)) {
                                this._activeKeyframes.push(o);
                                for (var s in o.animValues) this.keyframes[s] = this.keyframes[s] || [], this.keyframes[s].push(o), this.attributes.indexOf(s) === -1 && this.attributes.push(s)
                            }
                        }
                        var a = i.filter(function(e) {
                            return t._activeKeyframes.indexOf(e) === -1
                        });
                        if (0 !== a.length) {
                            var l = r.filter(function(e) {
                                return t.attributes.indexOf(e) === -1
                            });
                            0 !== l.length && this._ownerIsElement && f.external(function() {
                                var e = ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
                                    i = l.filter(function(t) {
                                        return e.indexOf(t) !== -1
                                    });
                                i.length !== -1 && t.element.style.removeProperty("transform");
                                for (var r = 0, n = l.length; r < n; ++r) {
                                    var o = l[r],
                                        s = t.tweenProps[o];
                                    s.current = s.target = s.initialValue, "opacity" === o && t.element.style.removeProperty("opacity")
                                }
                                for (var u = 0, h = a.length; u < h; ++u) {
                                    var m = a[u];
                                    m instanceof c && m._unapply()
                                }
                            }, !0)
                        }
                    }
                }, {
                    key: "onDOMRead",
                    value: function(e) {
                        for (var t = 0, i = this.attributes.length; t < i; t++) {
                            var r = this.attributes[t],
                                n = this.getNearestKeyframeForAttribute(e.local, r);
                            n && n.onDOMRead(r)
                        }
                    }
                }, {
                    key: "onDOMWrite",
                    value: function() {
                        this._ownerIsElement ? this.onDOMWriteForElement() : this.onDOMWriteForObject(), this.handleEventDispatch()
                    }
                }, {
                    key: "onDOMWriteForObject",
                    value: function() {
                        for (var e = 0, t = this.attributes.length; e < t; e++) {
                            var i = this.attributes[e];
                            this.element[i] = this.tweenProps[i].current
                        }
                    }
                }, {
                    key: "onDOMWriteForElement",
                    value: function() {
                        var e = this.tweenProps,
                            t = "";
                        if ("undefined" != typeof this.keyframes.z ? t += "translate3d(" + e.x.current + "px," + e.y.current + "px, " + e.z.current + "px)" : "undefined" == typeof this.keyframes.x && "undefined" == typeof this.keyframes.y || (t += "translate(" + e.x.current + "px," + e.y.current + "px)"), "undefined" != typeof this.keyframes.rotation ? t += "rotate(" + e.rotation.current + "deg) " : ("undefined" != typeof this.keyframes.rotationX && (t += "rotateX(" + e.rotationX.current + "deg) "), "undefined" != typeof this.keyframes.rotationY && (t += "rotateY(" + e.rotationY.current + "deg) "), "undefined" != typeof this.keyframes.rotationZ && (t += "rotateZ(" + e.rotationZ.current + "deg) ")), "undefined" != typeof this.keyframes.scale) t += "scale(" + e.scale.current + "," + e.scale.current + ") ";
                        else {
                            var i = "undefined" != typeof this.keyframes.scaleX,
                                r = "undefined" != typeof this.keyframes.scaleY;
                            (i || r) && (t += "scale(" + e.scaleX.current + "," + e.scaleY.current + ") ")
                        }
                        if ("" !== t && (this.element.style.transform = t), "undefined" != typeof this.keyframes.opacity && (this.element.style.opacity = e.opacity.current), this.needsStyleUpdate) {
                            for (var n in this.tweenProps.targetStyles) null !== this.tweenProps.targetStyles[n] && (this.element.style[n] = this.tweenProps.targetStyles[n]), this.tweenProps.targetStyles[n] = null;
                            this.needsStyleUpdate = !1
                        }
                        this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add), this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove), this.tweenProps.targetClasses.add.length = 0, this.tweenProps.targetClasses.remove.length = 0, this.needsClassUpdate = !1)
                    }
                }, {
                    key: "handleEventDispatch",
                    value: function() {
                        if (0 !== this.keyframesRequiringDispatch.length) {
                            for (var e = 0, t = this.keyframesRequiringDispatch.length; e < t; e++) {
                                var i = this.keyframesRequiringDispatch[e];
                                i.needsEventDispatch = !1, this.eventObject.keyframe = i, this.eventObject.pageMetrics = l.pageMetrics, this.eventObject.event = i.event, this.trigger(i.event, this.eventObject)
                            }
                            this.keyframesRequiringDispatch.length = 0
                        }
                    }
                }, {
                    key: "updateAnimationConstraints",
                    value: function() {
                        for (var e = this, t = 0, i = this._activeKeyframes.length; t < i; t++) this._activeKeyframes[t].updateAnimationConstraints();
                        this.attributes.forEach(function(t) {
                            1 !== e.keyframes[t].length && e.keyframes[t].sort(l.KeyframeComparison)
                        }), this.updateDeferredPropertyValues()
                    }
                }, {
                    key: "refreshMetrics",
                    value: function() {
                        var e = this,
                            t = this._activeKeyframes.map(function(e) {
                                return e.relativeTo
                            }),
                            i = new Set(t);
                        i.add(this.element), i.forEach(function(t) {
                            return e.group.metrics.refreshMetrics(t)
                        }), this.group.keyframesDirty = !0
                    }
                }, {
                    key: "updateDeferredPropertyValues",
                    value: function() {
                        for (var e = 0, t = this.attributes.length; e < t; e++) {
                            var i = this.attributes[e],
                                r = this.keyframes[i],
                                n = r[0];
                            if (!(n.keyframeType > l.KeyframeTypes.InterpolationForward))
                                for (var o = 0, s = r.length; o < s; o++) {
                                    var a = r[o];
                                    if (null === a.jsonProps[i][0]) {
                                        if (0 === o) throw new RangeError("AnimSystem - earliest keyframe cannot defer it's beginning value! " + i + ":[null," + a.jsonProps[i][1] + "]");
                                        a.animValues[i][0] = r[o - 1].animValues[i][1]
                                    }
                                    if (null === a.jsonProps[i][1]) {
                                        if (o === s - 1) throw new RangeError("AnimSystem - last keyframe cannot defer it's end value! " + i + ":[" + a.jsonProps[i][0] + ",null]");
                                        a.animValues[i][1] = r[o + 1].animValues[i][0]
                                    }
                                }
                        }
                    }
                }, {
                    key: "getBounds",
                    value: function(e) {
                        this.boundsMin = Number.MAX_VALUE, this.boundsMax = -Number.MAX_VALUE;
                        for (var t = 0, i = this.attributes.length; t < i; t++)
                            for (var r = this.keyframes[this.attributes[t]], n = 0; n < r.length; n++) {
                                var o = r[n];
                                this.boundsMin = Math.min(o.start, this.boundsMin), this.boundsMax = Math.max(o.end, this.boundsMax), e.min = Math.min(o.start, e.min), e.max = Math.max(o.end, e.max)
                            }
                    }
                }, {
                    key: "getNearestKeyframeForAttribute",
                    value: function(e, t) {
                        var i = null,
                            r = Number.POSITIVE_INFINITY,
                            n = this.keyframes[t];
                        if (void 0 === n) return null;
                        var o = n.length;
                        if (0 === o) return null;
                        if (1 === o) return n[0];
                        for (var s = 0; s < o; s++) {
                            var a = n[s];
                            if (a.isInRange(e)) {
                                i = a;
                                break
                            }
                            var l = Math.min(Math.abs(e - a.start), Math.abs(e - a.end));
                            l < r && (r = l, i = a)
                        }
                        return i
                    }
                }, {
                    key: "getAllKeyframesForAttribute",
                    value: function(e) {
                        return this.keyframes[e]
                    }
                }, {
                    key: "updateKeyframe",
                    value: function(e, t) {
                        var i = this;
                        e.parseOptions(t), e.updateAnimationConstraints(), this.group.keyframesDirty = !0, f.update(function() {
                            return i.group.trigger(l.EVENTS.ON_KEYFRAME_UPDATED, e)
                        }, !0)
                    }
                }, {
                    key: "removeKeyframe",
                    value: function(e) {
                        var t = this._allKeyframes.indexOf(e);
                        t !== -1 && (this._allKeyframes.splice(t, 1), this.group.keyframesDirty = !0)
                    }
                }, {
                    key: "updateAnimation",
                    value: function(e, t) {
                        return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"), this.updateKeyframe(e, t)
                    }
                }]), t
            }(p);
        Object.defineProperty(y.prototype, "parentElementMetrics", {
            get: function() {
                return null === this._parentElementMetrics && (this._parentElementMetrics = this.group.metrics.add(this.element.parentElement)),
                    this._parentElementMetrics
            }
        }), t.exports = y
    }, {
        "./Keyframes/Keyframe": 239,
        "./Keyframes/KeyframeCSSClass": 240,
        "./Model/AnimSystemModel": 242,
        "./Model/InferKeyframeFromProps": 245,
        "./Model/UUID": 246,
        "./utils/arrayToObject": 253,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/external": 213,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/decompose-css-transform": 261
    }],
    239: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("../Model/AnimSystemModel"),
            s = e("@marcom/sm-math-utils"),
            a = e("../Model/EasingFunctions"),
            l = e("../Model/UnitBezier"),
            c = e("../utils/arrayToObject"),
            u = function() {
                function e(t, i) {
                    r(this, e), this.controller = t, this.relativeTo = t.element, this.jsonProps = i, this.ease = o.KeyframeDefaults.ease, this.easeFunctionString = o.KeyframeDefaults.easeFunctionString, this.easeFunction = a[this.easeFunctionString], this.start = 0, this.end = 0, this.localT = 0, this.curvedT = 0, this.id = 0, this.event = "", this.needsEventDispatch = !1, this.snapAtCreation = !1, this.isEnabled = !1, this.animValues = {}, this.breakpointMask = "SMLX", this.disabledWhen = [], this.keyframeType = o.KeyframeTypes.Interpolation, this.hold = !1
                }
                return n(e, [{
                    key: "destroy",
                    value: function() {
                        this.controller = null, this.relativeTo = null, this.jsonProps = null, this.easeFunction = null, this.animValues = null
                    }
                }, {
                    key: "remove",
                    value: function() {
                        return this.controller.removeKeyframe(this)
                    }
                }, {
                    key: "parseOptions",
                    value: function(e) {
                        if (this.jsonProps = e, "" !== e.relativeTo && e.relativeTo ? e.relativeTo && (this.relativeTo = this.controller.group.element.querySelector(e.relativeTo) || document.querySelector(e.relativeTo), null === this.relativeTo && (console.warn("Keyframe for", this.controller.element.className, " .relativeTo failed to find " + e.relativeTo + "' via querySelector"), this.relativeTo = this.controller.element), this.controller.group.metrics.add(this.relativeTo)) : this.relativeTo = this.controller.element, e.ease ? this.ease = parseFloat(e.ease) : e.ease = this.ease, e.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = e.snapAtCreation : e.snapAtCreation = this.snapAtCreation, e.easeFunction ? this.easeFunction = e.easeFunction : e.easeFunction = this.easeFunctionString, e.breakpointMask ? this.breakpointMask = e.breakpointMask : e.breakpointMask = this.breakpointMask, e.disabledWhen ? this.disabledWhen = Array.isArray(e.disabledWhen) ? e.disabledWhen : [e.disabledWhen] : e.disabledWhen = this.disabledWhen, e.hasOwnProperty("hold") ? this.hold = e.hold : e.hold = this.hold, this.easeFunction = a[e.easeFunction], !a.hasOwnProperty(e.easeFunction)) {
                            var t = l.fromCSSString(e.easeFunction);
                            t ? this.easeFunction = t : console.error("Keyframe parseOptions cannot find EasingFunction named '" + e.easingFunction + "'")
                        }
                        for (var i in e)
                            if (o.KeyframeJSONReservedWords.indexOf(i) === -1) {
                                var r = e[i];
                                if (Array.isArray(r)) {
                                    if (this.animValues[i] = this.controller.group.expressionParser.parse(this, r), void 0 === this.controller.tweenProps[i] || !this.controller._ownerIsElement) {
                                        var n = 0;
                                        this.controller._ownerIsElement || (n = this.controller.element[i]);
                                        var s = new o.TargetValue(n, o.KeyframeDefaults.epsilon, this.snapAtCreation);
                                        this.controller.tweenProps[i] = s
                                    }
                                    var c = this.controller.tweenProps[i];
                                    if (e.epsilon) c.epsilon = e.epsilon;
                                    else {
                                        var u = Math.abs(this.animValues[i][0] - this.animValues[i][1]),
                                            h = Math.min(.001 * u, c.epsilon, o.KeyframeDefaults.epsilon);
                                        c.epsilon = Math.max(h, 1e-4)
                                    }
                                }
                            }
                        this.keyframeType = this.hold ? o.KeyframeTypes.InterpolationForward : o.KeyframeTypes.Interpolation, e.event && (this.event = e.event)
                    }
                }, {
                    key: "overwriteProps",
                    value: function(e) {
                        this.animValues = {};
                        var t = Object.assign({}, this.jsonProps, e);
                        this.controller.updateKeyframe(this, t)
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(e) {
                        if (this.start === this.end || e > this.end) return this.localT = 1, void(this.curvedT = this.easeFunction(this.localT));
                        var t = (e - this.start) / (this.end - this.start),
                            i = this.hold ? this.localT : 0;
                        this.localT = s.clamp(t, i, 1), this.curvedT = this.easeFunction(this.localT)
                    }
                }, {
                    key: "reconcile",
                    value: function(e) {
                        var t = this.animValues[e],
                            i = this.controller.tweenProps[e];
                        i.initialValue = t[0], i.target = t[0] + this.curvedT * (t[1] - t[0]), i.current !== i.target && (i.current = i.target, this.needsEventDispatch || (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this)))
                    }
                }, {
                    key: "reset",
                    value: function(e) {
                        this.localT = e || 0;
                        var t = this.ease;
                        this.ease = 1;
                        for (var i in this.animValues) this.reconcile(i);
                        this.ease = t
                    }
                }, {
                    key: "onDOMRead",
                    value: function(e) {
                        var t = this.animValues[e],
                            i = this.controller.tweenProps[e];
                        i.target = t[0] + this.curvedT * (t[1] - t[0]);
                        var r = i.current;
                        i.current += (i.target - i.current) * this.ease;
                        var n = i.current - i.target;
                        n < i.epsilon && n > -i.epsilon && (i.current = i.target, n = 0), "" === this.event || this.needsEventDispatch || (n > i.epsilon || n < -i.epsilon || 0 === n && r !== i.current) && (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this))
                    }
                }, {
                    key: "isInRange",
                    value: function(e) {
                        return e >= this.start && e <= this.end
                    }
                }, {
                    key: "setEnabled",
                    value: function(e) {
                        e = e || c(Array.from(document.documentElement.classList));
                        var t = this.breakpointMask.indexOf(o.pageMetrics.breakpoint) !== -1,
                            i = !1;
                        return this.disabledWhen.length > 0 && (i = this.disabledWhen.some(function(t) {
                            return "undefined" != typeof e[t]
                        })), this.isEnabled = t && !i, this.isEnabled
                    }
                }, {
                    key: "updateAnimationConstraints",
                    value: function() {
                        this.start = this.controller.group.timeParser.parse(this, this.jsonProps.start), this.end = this.controller.group.timeParser.parse(this, this.jsonProps.end), this.updateAnimatedValueConstraints()
                    }
                }, {
                    key: "updateAnimatedValueConstraints",
                    value: function() {
                        for (var e in this.animValues) {
                            var t = this.jsonProps[e];
                            this.animValues[e] = this.controller.group.expressionParser.parse(this, t)
                        }
                    }
                }]), e
            }();
        u.DATA_ATTRIBUTE = "data-anim-tween", t.exports = u
    }, {
        "../Model/AnimSystemModel": 242,
        "../Model/EasingFunctions": 243,
        "../Model/UnitBezier": 247,
        "../utils/arrayToObject": 253,
        "@marcom/sm-math-utils": 280
    }],
    240: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            l = e("./Keyframe"),
            c = e("../Model/AnimSystemModel.js"),
            u = function(e) {
                function t(e, i) {
                    r(this, t);
                    var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    return o.keyframeType = c.KeyframeTypes.CSSClass, o._triggerType = t.TRIGGER_TYPE_CSS_CLASS, o.cssClass = "", o.friendlyName = "", o.style = {
                        on: null,
                        off: null
                    }, o.toggle = !1, o.isApplied = !1, o
                }
                return o(t, e), a(t, [{
                    key: "parseOptions",
                    value: function(e) {
                        if (!this.controller._ownerIsElement) throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                        if (e.x = void 0, e.y = void 0, e.scale = void 0, e.scaleX = void 0, e.scaleY = void 0, e.rotation = void 0, e.opacity = void 0, e.hold = void 0, void 0 !== e.toggle && (this.toggle = e.toggle), void 0 !== e.cssClass) this._triggerType = t.TRIGGER_TYPE_CSS_CLASS, this.cssClass = e.cssClass, this.friendlyName = "." + this.cssClass, void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                            add: [],
                            remove: []
                        });
                        else {
                            if (void 0 === e.style || !this.isValidStyleProperty(e.style)) throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                            if (this._triggerType = t.TRIGGER_TYPE_STYLE_PROPERTY, this.style = e.style, this.friendlyName = "style", this.toggle = void 0 !== this.style.off || this.toggle, this.toggle && void 0 === this.style.off) {
                                this.style.off = {};
                                for (var i in this.style.on) this.style.off[i] = ""
                            }
                            void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
                        }
                        if (void 0 === e.end && (e.end = e.start), e.toggle = this.toggle, this._triggerType === t.TRIGGER_TYPE_CSS_CLASS) this.isApplied = this.controller.element.classList.contains(this.cssClass);
                        else {
                            var r = getComputedStyle(this.controller.element);
                            this.isApplied = !0;
                            for (var n in this.style.on)
                                if (r[n] !== this.style.on[n]) {
                                    this.isApplied = !1;
                                    break
                                }
                        }
                        l.prototype.parseOptions.call(this, e), this.animValues[this.friendlyName] = [0, 0], void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new c.TargetValue(0, 1, (!1))), this.keyframeType = c.KeyframeTypes.CSSClass
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(e) {
                        this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && e >= this.start && e <= this.end ? this._apply() : this.isApplied && this.toggle && (e < this.start || e > this.end) && this._unapply() : !this.isApplied && e >= this.start ? this._apply() : this.isApplied && this.toggle && e < this.start && this._unapply())
                    }
                }, {
                    key: "_apply",
                    value: function() {
                        if (this._triggerType === t.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.add.push(this.cssClass), this.controller.needsClassUpdate = !0;
                        else {
                            for (var e in this.style.on) this.controller.tweenProps.targetStyles[e] = this.style.on[e];
                            this.controller.needsStyleUpdate = !0
                        }
                        this.isApplied = !0
                    }
                }, {
                    key: "_unapply",
                    value: function() {
                        if (this._triggerType === t.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.remove.push(this.cssClass), this.controller.needsClassUpdate = !0;
                        else {
                            for (var e in this.style.off) this.controller.tweenProps.targetStyles[e] = this.style.off[e];
                            this.controller.needsStyleUpdate = !0
                        }
                        this.isApplied = !1
                    }
                }, {
                    key: "isValidStyleProperty",
                    value: function(e) {
                        if (!e.hasOwnProperty("on")) return !1;
                        if ("object" !== s(e.on)) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}");
                        if (this.toggle && e.hasOwnProperty("off") && "object" !== s(e.off)) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}");
                        return !0
                    }
                }, {
                    key: "reconcile",
                    value: function(e, t) {}
                }, {
                    key: "onDOMRead",
                    value: function(e, t) {}
                }, {
                    key: "updateAnimatedValueConstraints",
                    value: function() {}
                }]), t
            }(l);
        u.TRIGGER_TYPE_CSS_CLASS = 0, u.TRIGGER_TYPE_STYLE_PROPERTY = 1, u.DATA_ATTRIBUTE = "data-anim-classname", t.exports = u
    }, {
        "../Model/AnimSystemModel.js": 242,
        "./Keyframe": 239
    }],
    241: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function h(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : h(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("./Keyframe"),
            c = e("../Model/AnimSystemModel.js"),
            u = function(e) {
                function t(e, i) {
                    r(this, t);
                    var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    return o.keyframeType = c.KeyframeTypes.Event, o.isApplied = !1, o.hasDuration = !1, o.isCurrentlyInRange = !1, o
                }
                return o(t, e), s(t, [{
                    key: "parseOptions",
                    value: function(e) {
                        e.x = void 0, e.y = void 0, e.scale = void 0, e.scaleX = void 0, e.scaleY = void 0, e.rotation = void 0, e.style = void 0, e.cssClass = void 0, e.rotation = void 0, e.opacity = void 0, e.hold = void 0, void 0 === e.end && (e.end = e.start), this.event = e.event, this.animValues[this.event] = [0, 0], "undefined" == typeof this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new c.TargetValue(0, 1, (!1))), a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parseOptions", this).call(this, e), this.keyframeType = c.KeyframeTypes.Event
                    }
                }, {
                    key: "updateLocalProgress",
                    value: function(e) {
                        if (this.hasDuration) {
                            var t = this.isCurrentlyInRange,
                                i = e >= this.start && e <= this.end;
                            if (t === i) return;
                            return i && !t ? this._trigger(this.event + ":enter") : t && !i && this._trigger(this.event + ":exit"), void(this.isCurrentlyInRange = i)
                        }!this.isApplied && e >= this.start ? (this._trigger(this.event), this.isApplied = !0) : this.isApplied && e < this.start && (this._trigger(this.event + ":reverse"), this.isApplied = !1)
                    }
                }, {
                    key: "_trigger",
                    value: function(e) {
                        this.controller.eventObject.event = e, this.controller.eventObject.keyframe = this, this.controller.trigger(e, this.controller.eventObject)
                    }
                }, {
                    key: "updateAnimationConstraints",
                    value: function() {
                        a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateAnimationConstraints", this).call(this), this.hasDuration = this.start !== this.end
                    }
                }, {
                    key: "onDOMRead",
                    value: function(e, t) {}
                }, {
                    key: "reconcile",
                    value: function(e, t) {}
                }, {
                    key: "updateAnimatedValueConstraints",
                    value: function() {}
                }]), t
            }(l);
        u.DATA_ATTRIBUTE = "data-anim-event", t.exports = u
    }, {
        "../Model/AnimSystemModel.js": 242,
        "./Keyframe": 239
    }],
    242: [function(e, t, i) {
        "use strict";
        var r = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            VIEWPORT_EMITTER_ELEMENT: void 0,
            LOCAL_STORAGE_KEYS: {
                GuiPosition: "GuiPosition-0"
            },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [{
                name: "S",
                longName: "small",
                mediaQuery: "only screen and (max-width: 735px)"
            }, {
                name: "M",
                longName: "medium",
                mediaQuery: "only screen and (max-width: 1068px)"
            }, {
                name: "L",
                longName: "xlarge",
                mediaQuery: "only screen and (min-width: 1442px)"
            }, {
                name: "L",
                longName: "large",
                mediaQuery: "only screen and (min-width: 1069px)"
            }],
            getBreakpoint: function() {
                for (var e = 0; e < r.BREAKPOINTS.length; e++) {
                    var t = r.BREAKPOINTS[e],
                        i = window.matchMedia(t.mediaQuery);
                    if (i.matches) return t.name
                }
            },
            KeyframeDefaults: {
                ease: .1,
                epsilon: .05,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: ""
            },
            KeyframeTypes: {
                Interpolation: 0,
                InterpolationForward: 1,
                CSSClass: 2,
                Event: 3
            },
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE"
            },
            PageEvents: {
                ON_SCROLL: "ON_SCROLL",
                ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
                ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
                ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
            },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "relativeTo", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            TargetValue: function(e, t, i) {
                this.epsilon = parseFloat(t), this.snapAtCreation = i, this.initialValue = e, this.target = e, this.current = e
            },
            Timeline: function() {
                this.local = 0, this.localUnclamped = 0
            },
            ViewableRange: function(e, t) {
                this.a = e.top - t, this.a < 0 && (this.a = e.top), this.b = e.top, this.d = e.bottom, this.c = Math.max(this.d - t, this.b)
            },
            pageMetrics: new function() {
                this.scrollX = 0, this.scrollY = 0, this.windowWidth = 0, this.windowHeight = 0, this.documentOffsetX = 0, this.documentOffsetY = 0, this.previousBreakpoint = "", this.breakpoint = ""
            },
            EventObject: function(e) {
                this.controller = e, this.element = this.controller.element, this.keyframe = null, this.event = "", this.tweenProps = this.controller.tweenProps
            },
            KeyframeComparison: function(e, t) {
                return e.start < t.start ? -1 : e.start > t.start ? 1 : 0
            },
            AnimInfo: function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                this.isGroup = i, this.group = e, this.controller = t
            }
        };
        t.exports = r
    }, {}],
    243: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function o() {
            r(this, o), this.linear = function(e) {
                return e
            }, this.easeInQuad = function(e) {
                return e * e
            }, this.easeOutQuad = function(e) {
                return e * (2 - e)
            }, this.easeInOutQuad = function(e) {
                return e < .5 ? 2 * e * e : -1 + (4 - 2 * e) * e
            }, this.easeInSin = function(e) {
                return 1 + Math.sin(Math.PI / 2 * e - Math.PI / 2)
            }, this.easeOutSin = function(e) {
                return Math.sin(Math.PI / 2 * e)
            }, this.easeInOutSin = function(e) {
                return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2
            }, this.easeInElastic = function(e) {
                return 0 === e ? e : (.04 - .04 / e) * Math.sin(25 * e) + 1
            }, this.easeOutElastic = function(e) {
                return .04 * e / --e * Math.sin(25 * e)
            }, this.easeInOutElastic = function(e) {
                return (e -= .5) < 0 ? (.02 + .01 / e) * Math.sin(50 * e) : (.02 - .01 / e) * Math.sin(50 * e) + 1
            }, this.easeOutBack = function(e) {
                return e -= 1, e * e * (2.70158 * e + 1.70158) + 1
            }, this.easeInCubic = function(e) {
                return e * e * e
            }, this.easeOutCubic = function(e) {
                return --e * e * e + 1
            }, this.easeInOutCubic = function(e) {
                return e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
            }, this.easeInQuart = function(e) {
                return e * e * e * e
            }, this.easeOutQuart = function(e) {
                return 1 - --e * e * e * e
            }, this.easeInOutQuart = function(e) {
                return e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e
            }, this.easeInQuint = function(e) {
                return e * e * e * e * e
            }, this.easeOutQuint = function(e) {
                return 1 + --e * e * e * e * e
            }, this.easeInOutQuint = function(e) {
                return e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e
            }
        };
        t.exports = new n
    }, {}],
    244: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("./AnimSystemModel"),
            s = function(e, t) {
                return void 0 === e || null === e ? t : e
            },
            a = window.Symbol || function() {
                var e = 0;
                return function() {
                    return ++e + ""
                }
            }(),
            l = function() {
                function e() {
                    r(this, e), this._symbols = [], this._lut = {}
                }
                return n(e, [{
                    key: "destroy",
                    value: function() {
                        for (var e = 0, t = this._symbols.length; e < t; e++) {
                            var i = this._lut[this._symbols[e]];
                            i.el = null
                        }
                        this._lut = null
                    }
                }, {
                    key: "add",
                    value: function(e) {
                        if (void 0 === e._animSymbol && (e._animSymbol = a()), void 0 === this._lut[e._animSymbol]) {
                            var t = new c(e);
                            this._refreshMetrics(t), this._lut[e._animSymbol] = t, this._symbols.push(e._animSymbol)
                        }
                        return this._lut[e._animSymbol]
                    }
                }, {
                    key: "get",
                    value: function(e) {
                        if (void 0 === e._animSymbol) throw "ElementMetricsLookup Attempting to retrieve info on element which is not being tracked.";
                        return this._lut[e._animSymbol]
                    }
                }, {
                    key: "refreshAll",
                    value: function() {
                        for (var e = 0, t = this._symbols.length; e < t; e++) {
                            var i = this._lut[this._symbols[e]];
                            this._refreshMetrics(i)
                        }
                    }
                }, {
                    key: "refreshMetrics",
                    value: function(e) {
                        var t = this.get(e);
                        return t ? this._refreshMetrics(t) : null
                    }
                }, {
                    key: "_refreshMetrics",
                    value: function(e) {
                        var t = e.el;
                        if (!(t instanceof Element)) return e.width = s(t.width, 0), e.height = s(t.height, 0), e.top = s(t.top, 0), e.left = s(t.left, 0), e.right = e.left + e.width, void(e.bottom = e.top + e.height);
                        if (void 0 === t.offsetWidth) {
                            var i = t.getBoundingClientRect();
                            return e.width = i.width, e.height = i.height, e.top = o.pageMetrics.scrollY + i.top, e.left = o.pageMetrics.scrollX + i.left, e.right = e.left + e.width, e.bottom = e.top + e.height, e
                        }
                        e.width = t.offsetWidth, e.height = t.offsetHeight, e.top = o.pageMetrics.documentOffsetY, e.left = o.pageMetrics.documentOffsetX;
                        for (var r = t; r;) e.top += r.offsetTop, e.left += r.offsetLeft, r = r.offsetParent;
                        return e.right = e.left + e.width, e.bottom = e.top + e.height, e
                    }
                }]), e
            }(),
            c = function() {
                function e(t) {
                    r(this, e), this.el = t, this.top = 0, this.bottom = 0, this.left = 0, this.right = 0, this.height = 0, this.width = 0
                }
                return n(e, [{
                    key: "toString",
                    value: function() {
                        return "top:" + this.top + ", bottom:" + this.bottom + ", left:" + this.left + ", right:" + this.right + ", height:" + this.height + ", width:" + this.width
                    }
                }, {
                    key: "toObject",
                    value: function() {
                        return {
                            top: this.top,
                            bottom: this.bottom,
                            left: this.left,
                            right: this.right,
                            height: this.height,
                            width: this.width
                        }
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.el = null
                    }
                }]), e
            }();
        t.exports = l
    }, {
        "./AnimSystemModel": 242
    }],
    245: [function(e, t, i) {
        "use strict";
        var r = e("./AnimSystemModel"),
            n = e("../Keyframes/Keyframe"),
            o = e("../Keyframes/KeyframeDiscreteEvent"),
            s = e("../Keyframes/KeyframeCSSClass"),
            a = function(e) {
                for (var t in e) {
                    var i = e[t];
                    if (r.KeyframeJSONReservedWords.indexOf(t) === -1 && Array.isArray(i)) return !0
                }
                return !1
            };
        t.exports = function(e) {
            if (void 0 !== e.cssClass || void 0 !== e.style) {
                if (a(e)) throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
                return s
            }
            if (a(e)) return n;
            if (e.event) return o;
            throw "Could not determine tween type based on " + JSON.stringify(e)
        }
    }, {
        "../Keyframes/Keyframe": 239,
        "../Keyframes/KeyframeCSSClass": 240,
        "../Keyframes/KeyframeDiscreteEvent": 241,
        "./AnimSystemModel": 242
    }],
    246: [function(e, t, i) {
        "use strict";
        t.exports = function() {
            for (var e = "", t = 0; t < 8; t++) {
                var i = 16 * Math.random() | 0;
                8 !== t && 12 !== t && 16 !== t && 20 !== t || (e += "-"), e += (12 === t ? 4 : 16 === t ? 3 & i | 8 : i).toString(16)
            }
            return e
        }
    }, {}],
    247: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = 1e-5,
            s = Math.abs,
            a = 5,
            l = function() {
                function e(t, i, n, o) {
                    r(this, e), this.cp = new Float32Array(6), this.cp[0] = 3 * t, this.cp[1] = 3 * (n - t) - this.cp[0], this.cp[2] = 1 - this.cp[0] - this.cp[1], this.cp[3] = 3 * i, this.cp[4] = 3 * (o - i) - this.cp[3], this.cp[5] = 1 - this.cp[3] - this.cp[4]
                }
                return n(e, [{
                    key: "sampleCurveX",
                    value: function(e) {
                        return ((this.cp[2] * e + this.cp[1]) * e + this.cp[0]) * e
                    }
                }, {
                    key: "sampleCurveY",
                    value: function(e) {
                        return ((this.cp[5] * e + this.cp[4]) * e + this.cp[3]) * e
                    }
                }, {
                    key: "sampleCurveDerivativeX",
                    value: function(e) {
                        return (3 * this.cp[2] * e + 2 * this.cp[1]) * e + this.cp[0]
                    }
                }, {
                    key: "solveCurveX",
                    value: function(e) {
                        var t, i, r, n, l, c;
                        for (r = e, c = 0; c < a; c++) {
                            if (n = this.sampleCurveX(r) - e, s(n) < o) return r;
                            if (l = this.sampleCurveDerivativeX(r), s(l) < o) break;
                            r -= n / l
                        }
                        if (t = 0, i = 1, r = e, r < t) return t;
                        if (r > i) return i;
                        for (; t < i;) {
                            if (n = this.sampleCurveX(r), s(n - e) < o) return r;
                            e > n ? t = r : i = r, r = .5 * (i - t) + t
                        }
                        return r
                    }
                }, {
                    key: "solve",
                    value: function(e) {
                        return this.sampleCurveY(this.solveCurveX(e))
                    }
                }]), e
            }(),
            c = /\d*\.?\d+/g;
        l.fromCSSString = function(e) {
            var t = e.match(c);
            if (4 !== t.length) throw "UnitBezier could not convert " + e + " to cubic-bezier";
            var i = t.map(Number),
                r = new l(i[0], i[1], i[2], i[3]);
            return r.solve.bind(r)
        }, t.exports = l
    }, {}],
    248: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("../Model/AnimSystemModel"),
            s = e("./Operations"),
            a = /([-|\+])?(\d+\.?\d*)(px|vh|vw|pw|ph|\%w|\%h|rw|rh|\%)?|(-|\+|\*|\/)/g,
            l = /^[-+]?(?:[0-9]{0,30}\.)?[0-9]{1,30}(?:[Ee][-+]?[1-2]?[0-9])?$/g,
            c = function() {
                function e(t) {
                    r(this, e), this.group = t
                }
                return n(e, [{
                    key: "parse",
                    value: function(e, t) {
                        if (Array.isArray(t)) return this.parseArray(e, t);
                        throw new Error("Keyframe value `" + t + "` is not supported. Only arrays in the form of [start,end] are currently supported")
                    }
                }, {
                    key: "parseArray",
                    value: function(e, t) {
                        var i = this.parseExpression(e, t[0]),
                            r = this.parseExpression(e, t[1]);
                        return [i, r]
                    }
                }, {
                    key: "parseExpression",
                    value: function(e, t) {
                        if (null === t) return 0;
                        if ("number" == typeof t) return t;
                        for (var i = 5, r = void 0;
                            (r = t.indexOf("(")) !== -1 && --i > 0;) {
                            var n = this.captureParenthesis(t, r),
                                o = this.parseExpression(e, n);
                            t = t.replace("(" + n + ")", o)
                        }
                        for (var l = void 0, c = []; null !== (l = a.exec(t));)
                            if (l.index === a.lastIndex && a.lastIndex++, l[4]) c.push(s.GetOpCode(l[4]));
                            else {
                                var u = l[1],
                                    h = parseFloat(l[2]),
                                    m = l[3];
                                "-" === u && (h *= -1);
                                var p = this.parseSplitUnit(e, h, m);
                                c.push(p)
                            }
                        var d = c.length;
                        if (3 === d && "function" == typeof c[1]) return c[1](c[0], c[2]);
                        for (var f = 0; f < d; f++)
                            if ("function" == typeof c[f] && 1 === c[f].priority) {
                                var y = c[f - 1],
                                    _ = c[f + 1],
                                    g = c[f](y, _);
                                c[f - 1] = null, c[f + 0] = null, c[f + 1] = g, f += 1
                            }
                        for (var v = 0; null == c[v] && v < d;) v += 1;
                        var b = c[v],
                            E = null,
                            w = null;
                        for (v += 1; v < d; v++) null !== c[v] ? c[v] instanceof Function ? E = c[v] : (null === w && (w = c[v]), null !== w && (E = E || s.add, b = E(b, w), E = null, w = null)) : v += 1;
                        return b
                    }
                }, {
                    key: "parseSplitUnit",
                    value: function(e, t, i) {
                        if ("undefined" == typeof i) return parseFloat(t);
                        switch (i) {
                            case "vh":
                                return .01 * t * o.pageMetrics.windowHeight;
                            case "%":
                                return .01 * t * e.controller.elementMetrics.height;
                            case "px":
                                return t;
                            case "rh":
                                return .01 * t * this.group.metrics.get(e.relativeTo).height;
                            case "vw":
                                return .01 * t * o.pageMetrics.windowWidth;
                            case "rw":
                                return .01 * t * this.group.metrics.get(e.relativeTo).width;
                            case "%w":
                                return .01 * t * e.controller.elementMetrics.width;
                            case "%h":
                                return .01 * t * e.controller.elementMetrics.height;
                            case "pw":
                                return .01 * t * e.controller.parentElementMetrics.width;
                            case "ph":
                                return .01 * t * e.controller.parentElementMetrics.height;
                            default:
                                throw new Error("ExpressionParser: no strategy found for unit `" + i + "` only `vh, vw, %, ph, pw` are supported")
                        }
                    }
                }, {
                    key: "captureParenthesis",
                    value: function(e, t) {
                        for (var i = "", r = 0, n = !1, o = e.length, s = t; s < o; s++)
                            if ("(" === e[s] ? (r += 1, n && (i += e[s]), n = !0) : ")" === e[s] ? (r -= 1, 0 !== r && (i += e[s])) : n && (i += e[s]), n && 0 === r) return i
                    }
                }, {
                    key: "isUnitlessNumber",
                    value: function(e) {
                        return String(e).match(l)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.group = null
                    }
                }, {
                    key: "logParts",
                    value: function(e) {
                        console.log(e.reduce(function(e, t) {
                            return "function" == typeof t ? e + t.friendlyName + " " : e + (t + " ")
                        }, ""))
                    }
                }]), e
            }();
        t.exports = c
    }, {
        "../Model/AnimSystemModel": 242,
        "./Operations": 249
    }],
    249: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function o() {
            r(this, o), this.add = function(e, t) {
                return e + t
            }, this.sub = function(e, t) {
                return e - t
            }, this.mul = function(e, t) {
                return e * t
            }, this.div = function(e, t) {
                return e / t
            }, this.add.friendlyName = "add", this.sub.friendlyName = "sub", this.mul.friendlyName = "mul", this.div.friendlyName = "div", this.add.priority = 0, this.sub.priority = 0, this.mul.priority = 1, this.div.priority = 1, this.GetOpCode = function(e) {
                switch (e) {
                    case "-":
                        return this.sub;
                    case "+":
                        return this.add;
                    case "*":
                        return this.mul;
                    case "/":
                        return this.div;
                    default:
                        throw new Error('AnimSystem.parsing.Operations - op code "' + e + "\" was found. Only '+ - * /' are supported. Check expression for typos/spacing issues")
                }
            }
        };
        t.exports = new n
    }, {}],
    250: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = function() {
                function e(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    r(this, e), this.group = t, this.groupIsTimeBased = i
                }
                return n(e, [{
                    key: "parse",
                    value: function(e, t) {
                        if ("number" == typeof t) return t;
                        var i = this.groupIsTimeBased ? 0 : this.group.metrics.get(e.relativeTo).top,
                            r = this.group.expressionParser.parseExpression(e, t),
                            n = r + i;
                        return this.group.convertScrollPositionToTValue(n)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.group = null
                    }
                }]), e
            }();
        t.exports = o
    }, {}],
    251: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function g(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : g(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            c = e("@marcom/sm-math-utils"),
            u = e("./utils/arrayToObject"),
            h = e("./Model/AnimSystemModel"),
            m = e("./Model/ElementMetricsLookup"),
            p = e("./Parsing/ExpressionParser"),
            d = e("./Parsing/TimeParser"),
            f = e("./KeyframeController"),
            y = {
                create: e("@marcom/ac-raf-emitter/RAFEmitter"),
                update: e("@marcom/ac-raf-emitter/update"),
                draw: e("@marcom/ac-raf-emitter/draw")
            },
            _ = function(e) {
                function t(e, i) {
                    r(this, t);
                    var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return o.anim = i, o.element = e, o.name = o.name || e.getAttribute("data-anim-scroll-group"), o.isEnabled = !0, o.timelines = new h.Timeline, o.metrics = new m, o.metrics.add(o.element), o.expressionParser = new p(o), o.timeParser = new d(o), o.boundsMin = 0, o.boundsMax = 0, o.lastPosition = 0, o.timelineUpdateRequired = !1, o._keyframesDirty = !1, o.viewableRange = o.createViewableRange(), o.keyframeControllers = [], o.updateProgress(o.getPosition()), o.onDOMRead = o.onDOMRead.bind(o), o.onDOMWrite = o.onDOMWrite.bind(o), o.gui = null, o.finalizeInit(), o
                }
                return o(t, e), s(t, [{
                    key: "finalizeInit",
                    value: function() {
                        this.element._animInfo = new h.AnimInfo(this, null, (!0)), this.setupRAFEmitter()
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.expressionParser.destroy(), this.expressionParser = null, this.timeParser.destroy(), this.timeParser = null;
                        for (var e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].destroy();
                        this.timelines = null, this.viewableRange = null, this.gui && (this.gui.destroy(), this.gui = null), this.metrics.destroy(), this.metrics = null, this.rafEmitter.destroy(), this.rafEmitter = null, this.anim = null, this.element = null, this.isEnabled = !1, a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "removeKeyframeController",
                    value: function(e) {
                        var t = this;
                        this.keyframeControllers.includes(e) && (e._allKeyframes = [], this.keyframesDirty = !0, y.update(function() {
                            var i = t.keyframeControllers.indexOf(e);
                            i !== -1 && (t.keyframeControllers.splice(i, 1), e.destroy(), t.gui && t.gui.create())
                        }))
                    }
                }, {
                    key: "remove",
                    value: function() {
                        this.anim.removeGroup(this)
                    }
                }, {
                    key: "setupRAFEmitter",
                    value: function(e) {
                        this.rafEmitter && this.rafEmitter.destroy(), this.rafEmitter = e || new y.create, this.rafEmitter.on("update", this.onDOMRead), this.rafEmitter.on("draw", this.onDOMWrite)
                    }
                }, {
                    key: "requestDOMChange",
                    value: function() {
                        return !!this.isEnabled && this.rafEmitter.run()
                    }
                }, {
                    key: "onDOMRead",
                    value: function() {
                        this.keyframesDirty && this.onKeyframesDirty();
                        for (var e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].onDOMRead(this.timelines)
                    }
                }, {
                    key: "onDOMWrite",
                    value: function() {
                        for (var e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].onDOMWrite(this.timelines);
                        this.needsUpdate() && this.requestDOMChange()
                    }
                }, {
                    key: "needsUpdate",
                    value: function() {
                        if (this._keyframesDirty) return !0;
                        for (var e = 0, t = this.keyframeControllers.length; e < t; e++)
                            if (this.keyframeControllers[e].needsUpdate()) return !0;
                        return !1
                    }
                }, {
                    key: "addKeyframe",
                    value: function(e, t) {
                        var i = this.anim.getControllerForTarget(e);
                        return null === i && (i = new f(this, e), this.keyframeControllers.push(i)), this.keyframesDirty = !0, i.addKeyframe(t)
                    }
                }, {
                    key: "forceUpdate",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = e.recalculateActiveKeyframes,
                            i = void 0 !== t && t,
                            r = e.waitForNextUpdate,
                            n = void 0 === r || r;
                        this.isEnabled && (i && this.determineActiveKeyframes(), this.metrics.refreshAll(), this.viewableRange = this.createViewableRange(), this.hasDuration() && (this.timelineUpdateRequired = !0,
                            n ? this.keyframesDirty = !0 : this.onKeyframesDirty()))
                    }
                }, {
                    key: "onKeyframesDirty",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = e.preventOnScroll,
                            i = void 0 !== t && t;
                        this.determineActiveKeyframes();
                        for (var r = 0, n = this.keyframeControllers.length; r < n; r++) this.keyframeControllers[r].updateAnimationConstraints();
                        this.updateProgress(this.getPosition()), this.updateBounds(), i || this._onScroll(), this.gui && this.gui.create(), this.keyframesDirty = !1
                    }
                }, {
                    key: "reconcile",
                    value: function() {
                        for (var e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].reconcile()
                    }
                }, {
                    key: "determineActiveKeyframes",
                    value: function(e) {
                        e = e || u(Array.from(document.documentElement.classList));
                        for (var t = 0, i = this.keyframeControllers.length; t < i; t++) this.keyframeControllers[t].determineActiveKeyframes(e)
                    }
                }, {
                    key: "updateBounds",
                    value: function() {
                        if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
                        for (var e = {
                                min: Number.POSITIVE_INFINITY,
                                max: Number.NEGATIVE_INFINITY
                            }, t = 0, i = this.keyframeControllers.length; t < i; t++) this.keyframeControllers[t].getBounds(e);
                        var r = this.convertTValueToScrollPosition(e.min),
                            n = this.convertTValueToScrollPosition(e.max);
                        n - r < h.pageMetrics.windowHeight ? (e.min = this.convertScrollPositionToTValue(r - .5 * h.pageMetrics.windowHeight), e.max = this.convertScrollPositionToTValue(n + .5 * h.pageMetrics.windowHeight)) : (e.min -= .001, e.max += .001), this.boundsMin = e.min, this.boundsMax = e.max, this.timelineUpdateRequired = !0
                    }
                }, {
                    key: "_onBreakpointChange",
                    value: function(e, t) {
                        this.keyframesDirty = !0, this.determineActiveKeyframes()
                    }
                }, {
                    key: "updateProgress",
                    value: function(e) {
                        return this.hasDuration() ? void(this.timelines.localUnclamped = (e - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a)) : void(this.timelines.local = this.timelines.localUnclamped = 0)
                    }
                }, {
                    key: "performTimelineDispatch",
                    value: function() {
                        for (var e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].updateLocalProgress(this.timelines.local);
                        this.trigger(h.EVENTS.ON_TIMELINE_UPDATE, this.timelines.local), this.timelineUpdateRequired = !1, this.lastPosition !== this.timelines.local && (this.lastPosition <= this.boundsMin && this.timelines.localUnclamped > this.boundsMin ? this.trigger(h.EVENTS.ON_TIMELINE_START, this) : this.lastPosition >= this.boundsMin && this.timelines.localUnclamped < this.boundsMin ? this.trigger(h.EVENTS.ON_TIMELINE_START + ":reverse", this) : this.lastPosition <= this.boundsMax && this.timelines.localUnclamped > this.boundsMax ? this.trigger(h.EVENTS.ON_TIMELINE_COMPLETE, this) : this.lastPosition >= this.boundsMax && this.timelines.localUnclamped < this.boundsMax && this.trigger(h.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this)), null !== this.gui && this.gui.onScrollUpdate(this.timelines)
                    }
                }, {
                    key: "_onScroll",
                    value: function(e) {
                        if (!this.isEnabled) return !1;
                        void 0 === e && (e = this.getPosition()), this.updateProgress(e);
                        var t = this.lastPosition === this.boundsMin || this.lastPosition === this.boundsMax,
                            i = this.timelines.localUnclamped === this.boundsMin || this.timelines.localUnclamped === this.boundsMax;
                        if (!this.timelineUpdateRequired && t && i) return void(this.timelines.local = this.timelines.localUnclamped);
                        if (this.timelineUpdateRequired || this.timelines.localUnclamped > this.boundsMin && this.timelines.localUnclamped < this.boundsMax) return this.timelines.local = c.clamp(this.timelines.localUnclamped, this.boundsMin, this.boundsMax), this.performTimelineDispatch(), this.requestDOMChange(), void(this.lastPosition = this.timelines.localUnclamped);
                        var r = this.lastPosition > this.boundsMin && this.lastPosition < this.boundsMax,
                            n = this.timelines.localUnclamped <= this.boundsMin || this.timelines.localUnclamped >= this.boundsMax;
                        return r && n ? (this.timelines.local = c.clamp(this.timelines.localUnclamped, this.boundsMin, this.boundsMax), this.performTimelineDispatch(), this.requestDOMChange(), void(this.lastPosition = this.timelines.localUnclamped)) : void(null !== this.gui && this.gui.onScrollUpdate(this.timelines))
                    }
                }, {
                    key: "convertScrollPositionToTValue",
                    value: function(e) {
                        return this.hasDuration() ? c.map(e, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
                    }
                }, {
                    key: "convertTValueToScrollPosition",
                    value: function(e) {
                        return this.hasDuration() ? c.map(e, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
                    }
                }, {
                    key: "hasDuration",
                    value: function() {
                        return this.viewableRange.a !== this.viewableRange.d
                    }
                }, {
                    key: "getPosition",
                    value: function() {
                        return h.pageMetrics.scrollY
                    }
                }, {
                    key: "createViewableRange",
                    value: function() {
                        return new h.ViewableRange(this.metrics.get(this.element), h.pageMetrics.windowHeight)
                    }
                }, {
                    key: "getControllerForTarget",
                    value: function(e) {
                        return this.anim.getControllerForTarget(e)
                    }
                }, {
                    key: "trigger",
                    value: function(e, t) {
                        if ("undefined" != typeof this._events[e])
                            for (var i = this._events[e].length - 1; i >= 0; i--) void 0 !== t ? this._events[e][i](t) : this._events[e][i]()
                    }
                }, {
                    key: "keyframesDirty",
                    set: function(e) {
                        this._keyframesDirty = e, this._keyframesDirty && this.requestDOMChange()
                    },
                    get: function() {
                        return this._keyframesDirty
                    }
                }, {
                    key: "keyFrames",
                    get: function() {
                        return this.viewableRange
                    }
                }]), t
            }(l);
        t.exports = _
    }, {
        "./KeyframeController": 238,
        "./Model/AnimSystemModel": 242,
        "./Model/ElementMetricsLookup": 244,
        "./Parsing/ExpressionParser": 248,
        "./Parsing/TimeParser": 250,
        "./utils/arrayToObject": 253,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-raf-emitter/RAFEmitter": 206,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/sm-math-utils": 280
    }],
    252: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function p(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : p(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("./ScrollGroup"),
            c = e("@marcom/sm-math-utils"),
            u = 0,
            h = {
                create: e("@marcom/ac-raf-emitter/RAFEmitter")
            },
            m = function(e) {
                function t(e, i) {
                    r(this, t), e || (e = document.createElement("div"), e.className = "TimeGroup-" + u++);
                    var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    return o.name = o.name || e.getAttribute("data-anim-time-group"), o.timeParser.groupIsTimeBased = !0, o._isPaused = !0, o._repeats = 0, o._isReversed = !1, o._timeScale = 1, o
                }
                return o(t, e), s(t, [{
                    key: "finalizeInit",
                    value: function() {
                        if (!this.anim) throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                        this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this), a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "finalizeInit", this).call(this)
                    }
                }, {
                    key: "progress",
                    value: function(e) {
                        if (void 0 === e) return 0 === this.boundsMax ? 0 : this.timelines.local / this.boundsMax;
                        var t = e * this.boundsMax;
                        this._onScroll(t)
                    }
                }, {
                    key: "time",
                    value: function(e) {
                        return void 0 === e ? this.timelines.local : (e = c.clamp(e, this.boundsMin, this.boundsMax), void this._onScroll(e))
                    }
                }, {
                    key: "play",
                    value: function(e) {
                        this.reversed(!1), this.isEnabled = !0, this._isPaused = !1, this.time(e), this._playheadEmitter.run()
                    }
                }, {
                    key: "reverse",
                    value: function(e) {
                        this.reversed(!0), this.isEnabled = !0, this._isPaused = !1, this.time(e), this._playheadEmitter.run()
                    }
                }, {
                    key: "restart",
                    value: function() {
                        this._isReversed ? (this.progress(1), this.reverse()) : (this.progress(0), this.play())
                    }
                }, {
                    key: "pause",
                    value: function(e) {
                        this.time(e), this._isPaused = !0
                    }
                }, {
                    key: "paused",
                    value: function(e) {
                        return void 0 === e ? this._isPaused : (this._isPaused = e, this._isPaused || this.play(), this)
                    }
                }, {
                    key: "onPlayTimeUpdate",
                    value: function(e) {
                        if (!this._isPaused) {
                            var i = c.clamp(e.delta / 1e3, 0, .5);
                            this._isReversed && (i = -i);
                            var r = this.time(),
                                n = r + i * this._timeScale;
                            if (this._repeats === t.REPEAT_FOREVER || this._repeats > 0) {
                                var o = !1;
                                !this._isReversed && n > this.boundsMax ? (n -= this.boundsMax, o = !0) : this._isReversed && n < 0 && (n = this.boundsMax + n, o = !0), o && (this._repeats = this._repeats === t.REPEAT_FOREVER ? t.REPEAT_FOREVER : this._repeats - 1)
                            }
                            this.time(n), this._playheadEmitter.run()
                        }
                    }
                }, {
                    key: "updateProgress",
                    value: function(e) {
                        return this.hasDuration() ? void(this.timelines.localUnclamped = e) : void(this.timelines.local = this.timelines.localUnclamped = 0)
                    }
                }, {
                    key: "updateBounds",
                    value: function() {
                        if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
                        for (var e = {
                                min: Number.POSITIVE_INFINITY,
                                max: Number.NEGATIVE_INFINITY
                            }, t = 0, i = this.keyframeControllers.length; t < i; t++) this.keyframeControllers[t].getBounds(e);
                        this.boundsMin = 0, this.boundsMax = e.max, this.viewableRange.a = this.viewableRange.b = 0, this.viewableRange.c = this.viewableRange.d = this.boundsMax, this.timelineUpdateRequired = !0
                    }
                }, {
                    key: "setupRAFEmitter",
                    value: function(e) {
                        this._playheadEmitter = new h.create, this._playheadEmitter.on("update", this.onPlayTimeUpdate), a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setupRAFEmitter", this).call(this, e)
                    }
                }, {
                    key: "timeScale",
                    value: function(e) {
                        return void 0 === e ? this._timeScale : (this._timeScale = e, this)
                    }
                }, {
                    key: "repeats",
                    value: function(e) {
                        return void 0 === e ? this._repeats : (this._repeats = e, this)
                    }
                }, {
                    key: "reversed",
                    value: function(e) {
                        return void 0 === e ? this._isReversed : (this._isReversed = e, this)
                    }
                }, {
                    key: "getPosition",
                    value: function() {
                        return this.timelines.local
                    }
                }, {
                    key: "convertScrollPositionToTValue",
                    value: function(e) {
                        return e
                    }
                }, {
                    key: "convertTValueToScrollPosition",
                    value: function(e) {
                        return e
                    }
                }, {
                    key: "hasDuration",
                    value: function() {
                        return this.boundsMax > 0
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this._playheadEmitter.destroy(), this._playheadEmitter = null, a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "duration",
                    get: function() {
                        return this.boundsMax
                    }
                }]), t
            }(l);
        m.REPEAT_FOREVER = -1, t.exports = m
    }, {
        "./ScrollGroup": 251,
        "@marcom/ac-raf-emitter/RAFEmitter": 206,
        "@marcom/sm-math-utils": 280
    }],
    253: [function(e, t, i) {
        "use strict";
        var r = function(e) {
            return e.reduce(function(e, t) {
                return e[t] = t, e
            }, {})
        };
        t.exports = r
    }, {}],
    254: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("./SourceTemplate.js"),
            s = e("@marcom/xhr-request"),
            a = Object.freeze({
                responseType: "blob"
            }),
            l = function() {
                function e(t) {
                    r(this, e), t = Object.assign({}, t), this._requestOptions = Object.assign({}, a, t.xhr), this._template = new o(t), this._evtObserver = null, this._state = {
                        viewport: t.viewport,
                        resolution: t.resolution,
                        request: null,
                        objectUrl: ""
                    }, this._requestCache = new Map, this._history = [], this._initialize()
                }
                return n(e, null, [{
                    key: "convertToResolution",
                    value: function(e) {
                        return "boolean" != typeof e ? null : e ? "2x" : "1x"
                    }
                }, {
                    key: "convertViewportName",
                    value: function(e, t) {
                        return "L" === e || t !== !0 && "xlarge" === e ? "large" : "M" === e ? "medium" : "S" === e ? "small" : e
                    }
                }]), n(e, [{
                    key: "load",
                    value: function() {
                        var e = this,
                            t = this._state.request,
                            i = t.xhr.response,
                            r = !i,
                            n = void 0;
                        return n = r ? t.send() : 200 === t.xhr.status ? Promise.resolve({
                            response: i
                        }) : Promise.reject({
                            error: this._state.requestErr
                        }), n.then(function(t) {
                            var i = t.response;
                            return "blob" === e._requestOptions.responseType && (e._state.objectUrl = i = window.URL.createObjectURL(t.response), e._updateHistory()), Promise.resolve(i)
                        }, function(t) {
                            var i = e._state.requestErr = t.error;
                            return Promise.reject(i)
                        })
                    }
                }, {
                    key: "change",
                    value: function(t, i) {
                        t = t.toLowerCase(), "viewport" !== t && "resolution" !== t || ("viewport" === t ? i = e.convertViewportName(i) : "boolean" == typeof i && (i = e.convertToResolution(i)), this._state[t] = i, this._createOpenRequest())
                    }
                }, {
                    key: "abortLoad",
                    value: function() {
                        this._state.request.xhr.abort()
                    }
                }, {
                    key: "revokeLastObjectUrl",
                    value: function() {
                        if ("blob" === this._requestOptions.responseType) {
                            var e = this._history.length,
                                t = 2,
                                i = e - t;
                            if (i < 0) return;
                            var r = this._history[i];
                            window.URL.revokeObjectURL(r.objectUrl)
                        }
                    }
                }, {
                    key: "_createOpenRequest",
                    value: function() {
                        var e = this._state,
                            t = e.viewport + "_" + e.resolution,
                            i = this._requestCache.get(t);
                        if (!i) {
                            var r = this._template.createPath(e.viewport, e.resolution);
                            i = new s(r, this._requestOptions), this._requestCache.set(t, i), i.open()
                        }
                        e.request = i
                    }
                }, {
                    key: "_initialize",
                    value: function() {
                        this._createOpenRequest()
                    }
                }, {
                    key: "_updateHistory",
                    value: function() {
                        this._history.push(Object.assign({}, this._state))
                    }
                }, {
                    key: "_revokeAllObjectUrls",
                    value: function() {
                        "blob" === this._requestOptions.responseType && this._history.forEach(function(e) {
                            window.URL.revokeObjectURL(e.objectUrl)
                        })
                    }
                }, {
                    key: "request",
                    get: function() {
                        return this._state.request
                    }
                }, {
                    key: "assetUrl",
                    get: function() {
                        return this._state.request.requestUrl
                    }
                }, {
                    key: "objectUrl",
                    get: function() {
                        return this._state.objectUrl
                    }
                }, {
                    key: "viewport",
                    get: function() {
                        return this._state.viewport
                    }
                }, {
                    key: "resolution",
                    get: function() {
                        return this._state.resolution
                    }
                }, {
                    key: "requestCache",
                    get: function() {
                        return this._requestCache
                    }
                }, {
                    key: "history",
                    get: function() {
                        return this._history
                    }
                }]), e
            }();
        t.exports = l
    }, {
        "./SourceTemplate.js": 255,
        "@marcom/xhr-request": 287
    }],
    255: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e) {
            var t = new Map;
            return e.forEach(function(e, i) {
                t.set(i, e)
            }), t
        }
        var o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            s = e("./model"),
            a = function() {
                function e(t) {
                    r(this, e), t = Object.assign({}, t), this._template = "", this._model = t.model || s, this._state = {
                        viewport: "",
                        resolution: ""
                    }, this._initialize(t)
                }
                return o(e, null, [{
                    key: "formatPathSegment",
                    value: function(e) {
                        var t = /^\s*\/*\s*|\s*\/*\s*$/g;
                        return "/" + e.replace(t, "")
                    }
                }]), o(e, [{
                    key: "createPath",
                    value: function(e, t) {
                        this._updateState(e, t);
                        var i = this._model.TEMPLATE_PLACEHOLDERS;
                        return t = "1x" === t ? "" : "_" + t, this._template.replace(i.viewport, e).replace(i.resolution, t)
                    }
                }, {
                    key: "changeViewport",
                    value: function(e) {
                        return this.createPath(e, this._state.resolution)
                    }
                }, {
                    key: "changeResolution",
                    value: function(e) {
                        return this.createPath(this._state.viewport, e)
                    }
                }, {
                    key: "_initialize",
                    value: function(e) {
                        var t = this._setSegmentValues(e);
                        this._template = this._createTemplate(t)
                    }
                }, {
                    key: "_setSegmentValues",
                    value: function(e) {
                        var t = e.el,
                            i = this._model,
                            r = n(i.SEGMENT_MAP);
                        return r.forEach(function(r, n, o) {
                            var s = e[n];
                            r = s ? s : r;
                            var a = i.ATTRIB[n];
                            r = a && t && t.hasAttribute(a) ? t.getAttribute(a) : r, o.set(n, r)
                        }), r
                    }
                }, {
                    key: "_createTemplate",
                    value: function(t) {
                        var i = "",
                            r = this._model.TEMPLATE_PLACEHOLDERS;
                        return t.forEach(function(t, n) {
                            i += "viewport" === n ? e.formatPathSegment(r.viewport) : "resolution" === n ? r.resolution : "format" === n ? "." + t : e.formatPathSegment(t)
                        }), i
                    }
                }, {
                    key: "_updateState",
                    value: function(e, t) {
                        this._state.viewport = e, this._state.resolution = t
                    }
                }, {
                    key: "viewport",
                    get: function() {
                        return this._state.viewport
                    }
                }, {
                    key: "resolution",
                    get: function() {
                        return this._state.resolution
                    }
                }]), e
            }();
        t.exports = a
    }, {
        "./model": 256
    }],
    256: [function(e, t, i) {
        "use strict";

        function r() {
            var e = new Map;
            return e.set("basePath", "/105/media/"), e.set("locale", "us"), e.set("path", ""), e.set("name", ""), e.set("viewport", ""), e.set("resolution", ""), e.set("format", "mp4"), e
        }
        t.exports = {
            ATTRIB: {
                resolution: "data-source-resolution",
                viewport: "data-source-viewport",
                basePath: "data-source-basePath",
                locale: "data-source-locale",
                path: "data-source-path",
                name: "data-source-name"
            },
            TEMPLATE_PLACEHOLDERS: {
                viewport: "{{viewport}}",
                resolution: "{{resolution}}"
            },
            SEGMENT_MAP: r()
        }
    }, {}],
    257: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function p(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : p(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            c = {
                create: e("@marcom/ac-raf-emitter/RAFEmitter"),
                update: e("@marcom/ac-raf-emitter/update"),
                draw: e("@marcom/ac-raf-emitter/draw")
            },
            u = function() {},
            h = 0,
            m = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return i.el = e.el, i.gum = e.gum, i._keyframeController = null, i
                }
                return o(t, e), s(t, [{
                    key: "destroy",
                    value: function() {
                        this.el = null, this.gum = null, this._keyframeController = null, a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                    }
                }, {
                    key: "addKeyframe",
                    value: function(e) {
                        var t = e.el || this.el;
                        return this.anim.addKeyframe(t, e)
                    }
                }, {
                    key: "addDiscreteEvent",
                    value: function(e) {
                        e.event = e.event || "Generic-Event-Name-" + h++;
                        var t = void 0 !== e.end && e.end !== e.start,
                            i = this.addKeyframe(e);
                        return t ? (this._addCallbackIfNotNull(i, e.event + ":enter", e.onEnter), this._addCallbackIfNotNull(i, e.event + ":exit", e.onExit)) : (this._addCallbackIfNotNull(i, e.event, e.onEvent), this._addCallbackIfNotNull(i, e.event + ":reverse", e.onEventReverse)), i
                    }
                }, {
                    key: "addRAFLoop",
                    value: function(e) {
                        var t = ["start", "end"];
                        if (!t.every(function(t) {
                                return e.hasOwnProperty(t)
                            })) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + t.join(" "));
                        var i = new c.create;
                        i.on("update", e.onUpdate || u), i.on("draw", e.onDraw || u), i.on("draw", function() {
                            return i.run()
                        });
                        var r = e.onEnter,
                            n = e.onExit;
                        return e.onEnter = function() {
                            i.run(), r ? r() : 0
                        }, e.onExit = function() {
                            i.cancel(), n ? n() : 0
                        }, this.addDiscreteEvent(e)
                    }
                }, {
                    key: "addContinuousEvent",
                    value: function(e) {
                        e.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"), e.event = e.event || "Generic-Event-Name-" + h++;
                        var t = this.addKeyframe(e);
                        return t.controller.on(e.event, e.onDraw), t
                    }
                }, {
                    key: "mounted",
                    value: function() {
                        if (this.onComponentWillAppear || this.onComponentWillDisappear) {
                            this.onComponentWillAppear = this.onComponentWillAppear ? this.onComponentWillAppear.bind(this) : void 0, this.onComponentWillDisappear = this.onComponentWillDisappear ? this.onComponentWillDisappear.bind(this) : void 0;
                            var e = {
                                start: "-100vh - 1px",
                                end: "100% + 1px",
                                event: "_appear" + h++
                            };
                            e.onEnter = this.onComponentWillAppear, e.onExit = this.onComponentWillDisappear, this.addDiscreteEvent(e)
                        }
                    }
                }, {
                    key: "_addCallbackIfNotNull",
                    value: function(e, t, i) {
                        return !!i && (e.controller.on(t, i), !0)
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function(e) {}
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {}
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {}
                }, {
                    key: "anim",
                    get: function() {
                        return this.gum.anim
                    }
                }, {
                    key: "keyframeController",
                    get: function() {
                        return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el))
                    }
                }]), t
            }(l);
        t.exports = m
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-raf-emitter/RAFEmitter": 206,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216
    }],
    258: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            l = e("@marcom/delayed-initializer"),
            c = e("@marcom/anim-system"),
            u = e("@marcom/anim-system/Model/AnimSystemModel"),
            h = e("./ComponentMap"),
            m = {},
            p = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return i.el = e, i.anim = c, i.components = [], i.el.getAttribute("data-anim-scroll-group") || i.el.setAttribute("data-anim-scroll-group", "bubble-gum-group"), c.on(u.EVENTS.ON_DOM_GROUPS_CREATED, function(e) {
                        i.componentsInitialized = !1, i.initComponents(), i.setupEvents()
                    }), c.on(u.EVENTS.ON_DOM_KEYFRAMES_CREATED, function() {
                        i.components.forEach(function(e) {
                            return e.mounted()
                        }), i.trigger(t.EVENTS.DOM_COMPONENTS_MOUNTED)
                    }), l.add(function() {
                        return c.initialize()
                    }), i
                }
                return o(t, e), s(t, [{
                    key: "initComponents",
                    value: function() {
                        var e = Array.prototype.slice.call(this.el.querySelectorAll("[data-component-list]"));
                        this.el.hasAttribute("[data-component-list]") && e.push(this.el);
                        for (var t = 0; t < e.length; t++)
                            for (var i = e[t], r = i.getAttribute("data-component-list"), n = r.split(" "), o = 0, s = n.length; o < s; o++) {
                                var a = n[o];
                                "" !== a && " " !== a && this.addComponent({
                                    el: i,
                                    componentName: a
                                })
                            }
                        this.componentsInitialized = !0
                    }
                }, {
                    key: "setupEvents",
                    value: function() {
                        this.onResizeDebounced = this.onResizeDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this), this.onBreakpointChange = this.onBreakpointChange.bind(this), c.on(u.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate), c.on(u.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced), c.on(u.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)
                    }
                }, {
                    key: "addComponent",
                    value: function(e) {
                        var i = e.el,
                            r = e.componentName,
                            n = e.data;
                        if (!h.hasOwnProperty(r)) throw "BubbleGum::addComponent could not add component to" + i.className + " no component type '" + r + "'found!";
                        var o = h[r];
                        if (!t.componentIsSupported(o, r)) return void 0 === m[r] && (console.log("BubbleGum::addComponent unsupported component '" + r + "'. Reason: '" + r + ".IS_SUPPORTED' returned false"), m[r] = !0), null;
                        var s = i.dataset.componentList || "";
                        s.includes(r) || (i.dataset.componentList = s.split(" ").concat(r).join(" "));
                        var a = new o({
                            el: i,
                            data: n,
                            gum: this,
                            pageMetrics: u.pageMetrics
                        });
                        return this.components.push(a), this.componentsInitialized && a.mounted(), a
                    }
                }, {
                    key: "removeComponent",
                    value: function(e) {
                        var t = this.components.indexOf(e);
                        t !== -1 && (this.components.splice(t, 1), e.el.dataset.componentList = e.el.dataset.componentList.replace(e.constructor.name, ""), e.destroy())
                    }
                }, {
                    key: "getComponentOfType",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement,
                            i = "[data-component-list*=" + e + "]",
                            r = t.matches(i) ? t : t.querySelector(i);
                        return r ? this.components.find(function(e) {
                            return e.el === r
                        }) : null
                    }
                }, {
                    key: "getComponentsOfType",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement,
                            i = "[data-component-list*=" + e + "]",
                            r = t.matches(i) ? [t] : Array.from(t.querySelectorAll(i));
                        return this.components.filter(function(e) {
                            return r.includes(e.el)
                        })
                    }
                }, {
                    key: "getComponentsForElement",
                    value: function(e) {
                        return this.components.filter(function(e) {
                            return e.el
                        })
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function() {
                        this.components.forEach(function(e) {
                            return e.onResizeImmediate(u.pageMetrics)
                        })
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function() {
                        this.components.forEach(function(e) {
                            return e.onResizeDebounced(u.pageMetrics)
                        })
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function() {
                        this.components.forEach(function(e) {
                            return e.onBreakpointChange(u.pageMetrics)
                        })
                    }
                }], [{
                    key: "componentIsSupported",
                    value: function(e, t) {
                        var i = e.IS_SUPPORTED;
                        if (void 0 === i) return !0;
                        if ("function" != typeof i) return console.error('BubbleGum::addComponent error in "' + t + '".IS_SUPPORTED - it should be a function which returns true/false'), !0;
                        var r = e.IS_SUPPORTED();
                        return void 0 === r ? (console.error('BubbleGum::addComponent error in "' + t + '".IS_SUPPORTED - it should be a function which returns true/false'), !0) : r
                    }
                }]), t
            }(a);
        p.EVENTS = {
            DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED"
        }, t.exports = p
    }, {
        "./ComponentMap": 259,
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/anim-system": 237,
        "@marcom/anim-system/Model/AnimSystemModel": 242,
        "@marcom/delayed-initializer": 262
    }],
    259: [function(e, t, i) {
        "use strict";
        t.exports = {
            BaseComponent: e("./BaseComponent")
        }
    }, {
        "./BaseComponent": 257
    }],
    260: [function(e, t, i) {
        "use strict";
        t.exports = function(e) {
            var t = e.element,
                i = e.attribute,
                r = e.defaultOptions,
                n = t.getAttribute(i) || "{}",
                o = null;
            try {
                o = JSON.parse(n)
            } catch (s) {
                return void console.error("attributeToJSON Error! Invalid JSON in `" + i + "` for element:", t)
            }
            for (var a in r)
                if (!o.hasOwnProperty(a)) {
                    if (null === r[a]) return void console.error("attributeToJSON Error! Required key `" + a + "` missing from attribute JSON `" + i + "` for element:", t);
                    o[a] = r[a]
                }
            return o
        }
    }, {}],
    261: [function(e, t, i) {
        "use strict";
        var r = {
                create: e("gl-mat4/create"),
                invert: e("gl-mat4/invert"),
                clone: e("gl-mat4/clone"),
                transpose: e("gl-mat4/transpose")
            },
            n = {
                create: e("gl-vec3/create"),
                dot: e("gl-vec3/dot"),
                normalize: e("gl-vec3/normalize"),
                length: e("gl-vec3/length"),
                cross: e("gl-vec3/cross"),
                fromValues: e("gl-vec3/fromValues")
            },
            o = {
                create: e("gl-vec4/create"),
                transformMat4: e("gl-vec4/transformMat4"),
                fromValues: e("gl-vec4/fromValues")
            },
            s = (Math.PI / 180, 180 / Math.PI),
            a = 0,
            l = 1,
            c = 3,
            u = 4,
            h = 5,
            m = 7,
            p = 11,
            d = 12,
            f = 13,
            y = 15,
            _ = function(e, t) {
                t = t || !1;
                for (var i = r.clone(e), a = n.create(), l = n.create(), u = n.create(), h = o.create(), d = o.create(), f = (n.create(), 0); f < 16; f++) i[f] /= i[y];
                var _ = r.clone(i);
                _[c] = 0, _[m] = 0, _[p] = 0, _[y] = 1;
                var E = (i[3], i[7], i[11], i[12]),
                    w = i[13],
                    S = i[14],
                    T = (i[15], o.create());
                if (b(i[c]) && b(i[m]) && b(i[p])) h = o.fromValues(0, 0, 0, 1);
                else {
                    T[0] = i[c], T[1] = i[m], T[2] = i[p], T[3] = i[y];
                    var C = r.invert(r.create(), _),
                        P = r.transpose(r.create(), C);
                    h = o.transformMat4(h, T, P)
                }
                a[0] = E, a[1] = w, a[2] = S;
                var O = [n.create(), n.create(), n.create()];
                O[0][0] = i[0], O[0][1] = i[1], O[0][2] = i[2], O[1][0] = i[4], O[1][1] = i[5], O[1][2] = i[6], O[2][0] = i[8], O[2][1] = i[9], O[2][2] = i[10], l[0] = n.length(O[0]), n.normalize(O[0], O[0]), u[0] = n.dot(O[0], O[1]), O[1] = g(O[1], O[0], 1, -u[0]), l[1] = n.length(O[1]), n.normalize(O[1], O[1]), u[0] /= l[1], u[1] = n.dot(O[0], O[2]), O[2] = g(O[2], O[0], 1, -u[1]), u[2] = n.dot(O[1], O[2]), O[2] = g(O[2], O[1], 1, -u[2]), l[2] = n.length(O[2]), n.normalize(O[2], O[2]), u[1] /= l[2], u[2] /= l[2];
                var x = n.cross(n.create(), O[1], O[2]);
                if (n.dot(O[0], x) < 0)
                    for (f = 0; f < 3; f++) l[f] *= -1, O[f][0] *= -1, O[f][1] *= -1, O[f][2] *= -1;
                d[0] = .5 * Math.sqrt(Math.max(1 + O[0][0] - O[1][1] - O[2][2], 0)), d[1] = .5 * Math.sqrt(Math.max(1 - O[0][0] + O[1][1] - O[2][2], 0)), d[2] = .5 * Math.sqrt(Math.max(1 - O[0][0] - O[1][1] + O[2][2], 0)), d[3] = .5 * Math.sqrt(Math.max(1 + O[0][0] + O[1][1] + O[2][2], 0)), O[2][1] > O[1][2] && (d[0] = -d[0]), O[0][2] > O[2][0] && (d[1] = -d[1]), O[1][0] > O[0][1] && (d[2] = -d[2]);
                var A = o.fromValues(d[0], d[1], d[2], 2 * Math.acos(d[3])),
                    k = v(d);
                return t && (u[0] = Math.round(u[0] * s * 100) / 100, u[1] = Math.round(u[1] * s * 100) / 100, u[2] = Math.round(u[2] * s * 100) / 100, k[0] = Math.round(k[0] * s * 100) / 100, k[1] = Math.round(k[1] * s * 100) / 100, k[2] = Math.round(k[2] * s * 100) / 100, A[3] = Math.round(A[3] * s * 100) / 100), {
                    translation: a,
                    scale: l,
                    skew: u,
                    perspective: h,
                    quaternion: d,
                    eulerRotation: k,
                    axisAngle: A
                }
            },
            g = function(e, t, i, r) {
                var o = n.create();
                return o[0] = i * e[0] + r * t[0], o[1] = i * e[1] + r * t[1], o[2] = i * e[2] + r * t[2], o
            },
            v = function(e) {
                var t, i, r, o = e[3] * e[3],
                    s = e[0] * e[0],
                    a = e[1] * e[1],
                    l = e[2] * e[2],
                    c = s + a + l + o,
                    u = e[0] * e[1] + e[2] * e[3];
                return u > .499 * c ? (i = 2 * Math.atan2(e[0], e[3]), r = Math.PI / 2, t = 0, n.fromValues(t, i, r)) : u < -.499 * c ? (i = -2 * Math.atan2(e[0], e[3]), r = -Math.PI / 2, t = 0, n.fromValues(t, i, r)) : (i = Math.atan2(2 * e[1] * e[3] - 2 * e[0] * e[2], s - a - l + o), r = Math.asin(2 * u / c), t = Math.atan2(2 * e[0] * e[3] - 2 * e[1] * e[2], -s + a - l + o), n.fromValues(t, i, r))
            },
            b = function(e) {
                return Math.abs(e) < 1e-4
            },
            E = function(e) {
                var t = String(getComputedStyle(e).transform).trim(),
                    i = r.create();
                if ("none" === t || "" === t) return i;
                var n, o, s = t.slice(0, t.indexOf("("));
                if ("matrix3d" === s)
                    for (n = t.slice(9, -1).split(","), o = 0; o < n.length; o++) i[o] = parseFloat(n[o]);
                else {
                    if ("matrix" !== s) throw new TypeError("Invalid Matrix Value");
                    for (n = t.slice(7, -1).split(","), o = n.length; o--;) n[o] = parseFloat(n[o]);
                    i[a] = n[0], i[l] = n[1], i[d] = n[4], i[u] = n[2], i[h] = n[3], i[f] = n[5]
                }
                return i
            };
        t.exports = function(e, t) {
            var i = E(e);
            return _(i, t)
        }
    }, {
        "gl-mat4/clone": 305,
        "gl-mat4/create": 306,
        "gl-mat4/invert": 309,
        "gl-mat4/transpose": 317,
        "gl-vec3/create": 318,
        "gl-vec3/cross": 319,
        "gl-vec3/dot": 320,
        "gl-vec3/fromValues": 321,
        "gl-vec3/length": 322,
        "gl-vec3/normalize": 323,
        "gl-vec4/create": 324,
        "gl-vec4/fromValues": 325,
        "gl-vec4/transformMat4": 326
    }],
    262: [function(e, t, i) {
        "use strict";
        var r = !1,
            n = !1,
            o = [];
        t.exports = {
            NUMBER_OF_FRAMES_TO_WAIT: 30,
            add: function(e) {
                var t = this;
                if (n && e(), o.push(e), !r) {
                    r = !0;
                    var i = document.documentElement.scrollHeight,
                        s = 0,
                        a = function l() {
                            var e = document.documentElement.scrollHeight;
                            if (i !== e) s = 0;
                            else if (s++, s >= t.NUMBER_OF_FRAMES_TO_WAIT) return void o.forEach(function(e) {
                                return e()
                            });
                            i = e, requestAnimationFrame(l)
                        };
                    requestAnimationFrame(a)
                }
            }
        }
    }, {}],
    263: [function(e, t, i) {
        "use strict";
        t.exports = {
            getContentDimensions: e("./getContentDimensions"),
            getDimensions: e("./getDimensions"),
            getMaxScrollPosition: e("./getMaxScrollPosition"),
            getPagePosition: e("./getPagePosition"),
            getPercentInViewport: e("./getPercentInViewport"),
            getPixelsInViewport: e("./getPixelsInViewport"),
            getPosition: e("./getPosition"),
            getScrollPosition: e("./getScrollPosition"),
            getViewportPosition: e("./getViewportPosition"),
            isInViewport: e("./isInViewport")
        }
    }, {
        "./getContentDimensions": 264,
        "./getDimensions": 265,
        "./getMaxScrollPosition": 266,
        "./getPagePosition": 267,
        "./getPercentInViewport": 268,
        "./getPixelsInViewport": 269,
        "./getPosition": 270,
        "./getScrollPosition": 271,
        "./getViewportPosition": 272,
        "./isInViewport": 273
    }],
    264: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t) {
            var i = 1;
            return t && (i = e.getBoundingClientRect().width / e.offsetWidth), {
                width: e.scrollWidth * i,
                height: e.scrollHeight * i
            }
        }
    }, {}],
    265: [function(e, t, i) {
        "use strict";
        t.exports = function(e, t) {
            var i;
            return t ? (i = e.getBoundingClientRect(), {
                width: i.width,
                height: i.height
            }) : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
    }, {}],
    266: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            return "x" === t ? e.scrollWidth - e.clientWidth : e.scrollHeight - e.clientHeight
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.exports = function(e, t) {
            var i = "undefined" == typeof e ? "undefined" : n(e);
            return t = "string" === i ? e : t, e = e && "string" !== i && e !== window ? e : document.documentElement, t && /^[xy]$/i.test(t) ? r(e, t) : {
                x: r(e, "x"),
                y: r(e, "y")
            }
        }
    }, {}],
    267: [function(e, t, i) {
        "use strict";
        var r = e("./getDimensions"),
            n = e("./getScrollPosition");
        t.exports = function(e, t) {
            var i;
            if (t) {
                var o = n(),
                    s = e.getBoundingClientRect();
                i = {
                    top: s.top + o.y,
                    right: s.right + o.x,
                    bottom: s.bottom + o.y,
                    left: s.left + o.x
                }
            } else {
                var a = r(e);
                for (i = {
                        top: e.offsetTop,
                        right: a.width,
                        bottom: a.height,
                        left: e.offsetLeft
                    }; e = e.offsetParent;) i.top += e.offsetTop, i.left += e.offsetLeft;
                i.right += i.left, i.bottom += i.top
            }
            var l = document.documentElement.offsetTop,
                c = document.documentElement.offsetLeft;
            return {
                top: i.top + l,
                right: i.right + c,
                bottom: i.bottom + l,
                left: i.left + c
            }
        }
    }, {
        "./getDimensions": 265,
        "./getScrollPosition": 271
    }],
    268: [function(e, t, i) {
        "use strict";
        var r = e("./getDimensions"),
            n = e("./getPixelsInViewport");
        t.exports = function(e, t) {
            var i = n(e, t),
                o = r(e, t);
            return {
                x: i.x / o.width,
                y: i.y / o.height
            }
        }
    }, {
        "./getDimensions": 265,
        "./getPixelsInViewport": 269
    }],
    269: [function(e, t, i) {
        "use strict";
        var r = e("./getViewportPosition");
        t.exports = function(e, t) {
            var i = window.innerWidth,
                n = window.innerHeight,
                o = r(e, t),
                s = {
                    x: o.right - o.left,
                    y: o.bottom - o.top
                };
            return o.top < 0 && (s.y += o.top), o.bottom > n && (s.y -= o.bottom - n), o.left < 0 && (s.x += o.left), o.right > i && (s.x -= o.right - i), s.x = s.x < 0 ? 0 : s.x, s.y = s.y < 0 ? 0 : s.y, s
        }
    }, {
        "./getViewportPosition": 272
    }],
    270: [function(e, t, i) {
        "use strict";
        var r = e("./getDimensions");
        t.exports = function(e, t) {
            var i, n, o, s, a, l, c;
            return t ? (i = e.getBoundingClientRect(), n = i.top, o = i.left, s = i.width, a = i.height, e.offsetParent && (l = e.offsetParent.getBoundingClientRect(), n -= l.top, o -= l.left)) : (c = r(e, t), n = e.offsetTop, o = e.offsetLeft, s = c.width, a = c.height), {
                top: n,
                right: o + s,
                bottom: n + a,
                left: o
            }
        }
    }, {
        "./getDimensions": 265
    }],
    271: [function(e, t, i) {
        "use strict";

        function r(e) {
            return "x" === e ? window.scrollX || window.pageXOffset : window.scrollY || window.pageYOffset
        }

        function n(e, t, i) {
            return "x" === t ? i ? r("x") : e.scrollLeft : i ? r("y") : e.scrollTop
        }
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.exports = function(e, t) {
            var i = "undefined" == typeof e ? "undefined" : o(e);
            t = "string" === i ? e : t, e = e && "string" !== i ? e : window;
            var r = e === window;
            return t && /^[xy]$/i.test(t) ? n(e, t, r) : {
                x: n(e, "x", r),
                y: n(e, "y", r)
            }
        }
    }, {}],
    272: [function(e, t, i) {
        "use strict";
        var r = e("./getPagePosition"),
            n = e("./getScrollPosition");
        t.exports = function(e, t) {
            var i;
            if (t) return i = e.getBoundingClientRect(), {
                top: i.top,
                right: i.right,
                bottom: i.bottom,
                left: i.left
            };
            i = r(e);
            var o = n();
            return {
                top: i.top - o.y,
                right: i.right - o.x,
                bottom: i.bottom - o.y,
                left: i.left - o.x
            }
        }
    }, {
        "./getPagePosition": 267,
        "./getScrollPosition": 271
    }],
    273: [function(e, t, i) {
        "use strict";

        function r(e, t, i) {
            var r = {
                x: 0,
                y: 0
            };
            if (!t) return r;
            var o = "undefined" == typeof t ? "undefined" : n(t);
            t = "number" === o || "string" === o ? {
                x: t,
                y: t
            } : Object.assign(r, t);
            var a;
            return Object.keys(r).forEach(function(r) {
                var n = t[r];
                if ("string" == typeof n || n > 1) {
                    a = a || s(e, i);
                    var o = parseInt(n, 10) || 0;
                    n = o / ("x" === r ? a.width : a.height)
                }
                t[r] = n
            }), t
        }
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = e("./getPercentInViewport"),
            s = e("./getDimensions");
        t.exports = function(e, t, i) {
            var n = o(e, t);
            return i = r(e, i, t), n.y > 0 && n.y >= i.y && n.x > 0 && n.x >= i.x
        }
    }, {
        "./getDimensions": 265,
        "./getPercentInViewport": 268
    }],
    274: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("./model").controls,
            s = e("@marcom/ac-console/warn"),
            a = function() {
                function e(t, i) {
                    r(this, e), i = Object.assign({}, i), this._model = i.model || o, this._container = t, this._ctrls = new Map, this._state = {
                        arePresent: !1
                    }
                }
                return n(e, [{
                    key: "initialize",
                    value: function() {
                        var e = this,
                            t = this._container;
                        if (t) {
                            var i = this._model.SELECTOR_MAP;
                            i.forEach(function(i, r) {
                                if ("container" !== r) {
                                    var n = t.querySelector(i);
                                    n && (e._ctrls.set(r, n), e._state.arePresent = !0)
                                }
                            })
                        }
                    }
                }, {
                    key: "isPresent",
                    value: function(e) {
                        return !!this._ctrls.get(e)
                    }
                }, {
                    key: "getElement",
                    value: function(e) {
                        var t = this._ctrls.get(e);
                        return t || null
                    }
                }, {
                    key: "enable",
                    value: function(e) {
                        this._setDisabled(e, !1)
                    }
                }, {
                    key: "disable",
                    value: function(e) {
                        this._setDisabled(e, !0)
                    }
                }, {
                    key: "_setDisabled",
                    value: function(e, t) {
                        var i = this._ctrls,
                            r = function(r, n) {
                                var o = i.get(r);
                                o ? o.disabled = n : s("Unable to " + (t ? "disable" : "enable") + " the " + e + " control. The element does not exist.")
                            };
                        "string" == typeof e ? r(e, t) : Array.isArray(e) && e.forEach(function(e) {
                            r(e, t)
                        })
                    }
                }, {
                    key: "disableAll",
                    value: function() {
                        var e = this;
                        this._ctrls.forEach(function(t, i) {
                            e.disable(i)
                        })
                    }
                }, {
                    key: "attach",
                    value: function(e, t) {
                        var i = this._ctrls.get(e);
                        return i && "function" == typeof t ? void i.addEventListener("click", t) : void s("Unable to attach " + e + " control.")
                    }
                }, {
                    key: "remove",
                    value: function(e, t) {
                        var i = this._ctrls.get(e);
                        return "string" != typeof e && "function" != typeof t || !this._ctrls.get(e) ? void s("Unable to remove " + e + " control.") : void i.removeEventListener("click", t)
                    }
                }, {
                    key: "arePresent",
                    get: function() {
                        return this._state.arePresent
                    }
                }, {
                    key: "allElements",
                    get: function() {
                        return this._ctrls
                    }
                }]), e
            }();
        t.exports = a
    }, {
        "./model": 279,
        "@marcom/ac-console/warn": 49
    }],
    275: [function(e, t, i) {
        "use strict";
        "use stric";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("./model").frames,
            s = e("@marcom/ac-console/warn"),
            a = function() {
                function e(t, i) {
                    r(this, e), i = Object.assign({}, i), this._model = i.model || o, this._container = t, this._frames = new Map, this._promise = {}, this._state = {
                        arePresent: !1
                    }
                }
                return n(e, [{
                    key: "isPresent",
                    value: function(e) {
                        return !!this._frames.get(e)
                    }
                }, {
                    key: "isActive",
                    value: function(e) {
                        return this._state[e].active
                    }
                }, {
                    key: "getElement",
                    value: function(e) {
                        var t = this._frames.get(e);
                        return t ? t : (s("The " + e + "Frame does not appear to exist."), null)
                    }
                }, {
                    key: "initialize",
                    value: function() {
                        var e = this,
                            t = this._container;
                        if (t) {
                            var i = this._model.SELECTOR_MAP;
                            i.forEach(function(i, r) {
                                if ("container" !== r) {
                                    var n = t.querySelector(i);
                                    n && (e._frames.set(r, n), e._state.arePresent = !0, e._state[r] = {}, e._state[r].active = n.classList.contains(e._model.CLASS.active), e._state[r].hasCSSTransition = e._checkForCSSTransition(n, r), e._promise[r] = {}, e._promise[r].activate = null, e._promise[r].deactivate = null)
                                }
                            })
                        }
                    }
                }, {
                    key: "activate",
                    value: function(e) {
                        return this._setActivity(e, !0)
                    }
                }, {
                    key: "deactivate",
                    value: function(e) {
                        return this._setActivity(e, !1)
                    }
                }, {
                    key: "deactivateAll",
                    value: function() {
                        var e = this,
                            t = [];
                        return this._frames.forEach(function(i, r) {
                            t.push(e.deactivate(r))
                        }), Promise.all(t)
                    }
                }, {
                    key: "_checkForCSSTransition",
                    value: function(e, t) {
                        var i = window.getComputedStyle(e)["transition-duration"],
                            r = i && "0s" !== i;
                        return r || s("InlineVideo : Frames : " + (t ? t + "Frame" : e) + " does not have a valid CSS transition for (de)activation"), r
                    }
                }, {
                    key: "_toggleActivity",
                    value: function(e, t) {
                        t || (t = this.getElement(e)), t.classList.toggle(this._model.CLASS.active), this._state[e].active = !this._state[e].active
                    }
                }, {
                    key: "_setActivity",
                    value: function(e, t) {
                        var i = this,
                            r = this._frames.get(e);
                        if (!r) return Promise.reject("The " + e + "Frame element does not exist");
                        var n = t ? "activate" : "deactivate",
                            o = t ? "deactivate" : "activate",
                            s = this._promise[e][n];
                        if (s) return s;
                        var a = this._promise[e][o] || Promise.resolve();
                        return a.then(function() {
                            return i._promise[e][o] = null, i._promise[e][n] = new Promise(function(o, s) {
                                var a = i._state[e].active;
                                if (!(t && !a || !t && a)) return i._promise[e][n] = null, void o();
                                var l = !!r.offsetHeight;
                                if (i._state[e].hasCSSTransition && l) {
                                    var c = function u() {
                                        r.removeEventListener("transitionend", u), i._promise[e][n] = null, o()
                                    };
                                    r.addEventListener("transitionend", c), i._toggleActivity(e, r)
                                } else i._toggleActivity(e, r), i._promise[e][n] = null, o()
                            })
                        })
                    }
                }, {
                    key: "arePresent",
                    get: function() {
                        return this._state.arePresent
                    }
                }]), e
            }();
        t.exports = a
    }, {
        "./model": 279,
        "@marcom/ac-console/warn": 49
    }],
    276: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("./model").indicators,
            s = e("@marcom/ac-console/warn"),
            a = function() {
                function e(t, i) {
                    r(this, e), i = Object.assign({}, i), this._model = i.model || o, this._container = t, this._indicators = new Map, this._state = {
                        arePresent: !1
                    }
                }
                return n(e, [{
                    key: "initialize",
                    value: function() {
                        var e = this,
                            t = this._container;
                        if (t) {
                            var i = this._model.SELECTOR_MAP;
                            i.forEach(function(i, r) {
                                if ("container" !== r) {
                                    var n = t.querySelector(i);
                                    n && (e._indicators.set(r, n), e._state.arePresent = !0, e._state[r] = {}, e._state[r].active = n.classList.contains(e._model.CLASS.active))
                                }
                            })
                        }
                    }
                }, {
                    key: "isPresent",
                    value: function(e) {
                        return !!this._indicators.get(e)
                    }
                }, {
                    key: "isActive",
                    value: function(e) {
                        return this._state[e].active
                    }
                }, {
                    key: "getElement",
                    value: function(e) {
                        var t = this._indicators.get(e);
                        return t || null
                    }
                }, {
                    key: "activate",
                    value: function(e) {
                        this._setActivity(e, !1)
                    }
                }, {
                    key: "deactivate",
                    value: function(e) {
                        this._setActivity(e, !0)
                    }
                }, {
                    key: "_setActivity",
                    value: function(e, t) {
                        var i = this._indicators.get(e);
                        if (!i) return void s("Unable to " + (t ? "deactivate" : "activate") + " the " + e + " indicator. The element does not exist.");
                        var r = t ? "remove" : "add";
                        this._state[e].active = !t, i.classList[r](this._model.CLASS.active)
                    }
                }, {
                    key: "arePresent",
                    get: function() {
                        return this._state.arePresent
                    }
                }, {
                    key: "allElements",
                    get: function() {
                        return this._indicators
                    }
                }]), e
            }();
        t.exports = a
    }, {
        "./model": 279,
        "@marcom/ac-console/warn": 49
    }],
    277: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function y(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : y(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("./Video"),
            c = e("./Controls"),
            u = e("./Frames"),
            h = e("./Indicators"),
            m = e("./model"),
            p = e("@marcom/ac-console/warn"),
            d = e("@marcom/ac-console/Error"),
            f = function(e) {
                function t(e, i) {
                    r(this, t), i = Object.assign({}, i), i.model = i.model || m, i.model = Object.assign({}, i.model, i.model.video), delete i.model.video;
                    var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    return o._controls = {}, o._frames = {}, o._indicators = {}, o
                }
                return o(t, e), s(t, [{
                    key: "initialize",
                    value: function() {
                        a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "initialize", this).call(this);
                        var e = this._container;
                        if (!e) return void d("InlineVideo Error : A video element was passed as the containing element. InlineVideo class expects a container element holding the video, optional frames, and optional controls.");
                        var i = e.querySelector(this._model.controls.SELECTOR_MAP.get("container")),
                            r = e.querySelector(this._model.frames.SELECTOR_MAP.get("container")) || e,
                            n = e.querySelector(this._model.indicators.SELECTOR_MAP.get("container")),
                            o = this._model;
                        i && (this._controls = new c(i, {
                            model: o.controls
                        }), this._controls.initialize(), this._controls.arePresent && this._attachControls()), r && (this._frames = new u(r, {
                            model: o.frames
                        }), this._frames.initialize(), this._frames.arePresent || p("No inline-video frames appear to be present. At minimum, a static frame should be present for fallback.")), n && (this._indicators = new h(n, {
                            model: o.indicators
                        }), this._indicators.initialize())
                    }
                }, {
                    key: "load",
                    value: function() {
                        var e = this._state,
                            i = this._indicators,
                            r = "loading";
                        return e.loaded || e.loaded || !i.arePresent || i.activate(r), a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "load", this).call(this)
                    }
                }, {
                    key: "play",
                    value: function() {
                        var e = this,
                            i = this._frames,
                            r = this._controls,
                            n = i.isPresent("end") && i.isActive("end") ? i.deactivate("end") : Promise.resolve(),
                            o = this._promise.load;
                        return r.arePresent && o && o.then(function() {
                            r.disable(["play", "replay"]), r.enable("pause")
                        }), n.then(function() {
                            return a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "play", e).call(e)
                        }, function(e) {
                            p(e)
                        })
                    }
                }, {
                    key: "pause",
                    value: function() {
                        var e = this._controls;
                        return a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "pause", this).call(this).then(function() {
                            e.arePresent && (e.disable("pause"), e.enable("play"))
                        }, function(e) {
                            p(e)
                        })
                    }
                }, {
                    key: "reset",
                    value: function() {
                        var e = this._controls;
                        return a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "reset", this).call(this).then(function() {
                            e.arePresent && (e.disable("pause"), e.enable("play"))
                        }, function(e) {
                            p(e)
                        })
                    }
                }, {
                    key: "replay",
                    value: function() {
                        var e = this._controls,
                            i = e.arePresent;
                        return i && (e.disable("replay"), e.enable("pause")), a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "replay", this).call(this)["catch"](function(e) {
                            p(e)
                        })
                    }
                }, {
                    key: "_attachControls",
                    value: function() {
                        var e = this,
                            t = this._controls,
                            i = t.allElements;
                        i.forEach(function(i, r) {
                            var n = e[r];
                            n ? t.attach(r, n) : p("Unable to attach " + r + " control. No equivalent video method.")
                        })
                    }
                }, {
                    key: "_onLoadSuccess",
                    value: function(e) {
                        var i = this._controls,
                            r = this._frames,
                            n = this._indicators,
                            o = "loading";
                        return a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_onLoadSuccess", this).call(this, e).then(function() {
                            return n.arePresent && n.deactivate(o), i.arePresent && i.enable("play"), r.arePresent ? r.deactivateAll() : Promise.resolve()
                        })["catch"](function(e) {
                            p(e)
                        }).then(function() {
                            return Promise.resolve()
                        })
                    }
                }, {
                    key: "_onLoadFailure",
                    value: function(e) {
                        var i = this,
                            r = this._controls,
                            n = this._frames,
                            o = this._indicators,
                            s = "loading";
                        return a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_onLoadFailure", this).call(this, e)["catch"](function(e) {}).then(function() {
                            return o.arePresent && o.deactivate(s), r.arePresent && r.disableAll(), n.arePresent ? n.activate("static") : Promise.resolve()
                        }).then(function() {
                            var e = n.deactivate("end"),
                                t = n.deactivate("start");
                            return Promise.all([e, t])
                        })["catch"](function(e) {
                            p(e)
                        }).then(function() {
                            var t = i._el;
                            return t.getAttribute("src") && (t.setAttribute("src", ""), i._video.source.revokeLastObjectUrl()), Promise.reject(e)
                        })
                    }
                }, {
                    key: "_onEnded",
                    value: function(e) {
                        var i = this,
                            r = this._controls,
                            n = this._frames;
                        r.arePresent && (r.disable("pause"), r.isPresent("replay") ? r.enable("replay") : r.isPresent("play") && r.enable("play"));
                        var o = n.isPresent("end") && !n.isActive("end") ? n.activate("end") : Promise.resolve();
                        return o["catch"](function(e) {
                            p(e)
                        }).then(function() {
                            return a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_onEnded", i).call(i, e)
                        })
                    }
                }, {
                    key: "frames",
                    get: function() {
                        return this._frames
                    }
                }, {
                    key: "controls",
                    get: function() {
                        return this._controls
                    }
                }, {
                    key: "indicators",
                    get: function() {
                        return this._indicators
                    }
                }]), t
            }(l);
        t.exports = f
    }, {
        "./Controls": 274,
        "./Frames": 275,
        "./Indicators": 276,
        "./Video": 278,
        "./model": 279,
        "@marcom/ac-console/Error": 46,
        "@marcom/ac-console/warn": 49
    }],
    278: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("./model").video,
            s = e("@marcom/asset-source/AssetSource"),
            a = e("@marcom/ac-console/error"),
            l = function() {
                function e(t, i) {
                    r(this, e), i = Object.assign({}, i), this._model = i.model || o, delete i.model, this._options = i;
                    var n = "VIDEO" === t.tagName;
                    this._container = n ? null : t, this._el = n ? t : null, this._source = null, this._promise = {
                        load: null,
                        nativePlay: null
                    }, this._state = {
                        loading: !1,
                        loaded: !1,
                        hasPlayed: !1,
                        assetUrl: ""
                    }, this.load = this.load.bind(this), this.play = this.play.bind(this), this.pause = this.pause.bind(this), this.reset = this.reset.bind(this), this.replay = this.replay.bind(this)
                }
                return n(e, null, [{
                    key: "convertToResolution",
                    value: function(e) {
                        return s.convertToResolution(e)
                    }
                }, {
                    key: "convertViewportName",
                    value: function(e, t) {
                        return s.convertViewportName(e, t)
                    }
                }]), n(e, [{
                    key: "initialize",
                    value: function() {
                        var e = this._container;
                        e && (this._el = this._container.querySelector(this._model.SELECTOR.video)), this._options.el = this._el, this._source = new s(this._options)
                    }
                }, {
                    key: "load",
                    value: function() {
                        var e = this;
                        return this._promise.load && this._state.assetUrl === this._source.assetUrl ? this._promise.load : (this._state.loaded = !1, this._state.loading = !0, this._promise.load = this._source.load().then(function(t) {
                            return e._onLoadSuccess(t)
                        }, function(t) {
                            return e._onLoadFailure(t)
                        }))
                    }
                }, {
                    key: "play",
                    value: function() {
                        var e = this,
                            t = this._promise.load;
                        return t && !this._promise.nativePlay && this._el.paused ? t.then(function() {
                            return new Promise(function(t, i) {
                                e._el.onended = function() {
                                    return e._onEnded(t)
                                };
                                var r = e._el.play();
                                e._promise.nativePlay = r = r ? r : Promise.resolve(), r.then(function() {
                                    e._state.hasPlayed = !0, e._promise.nativePlay = null
                                }, function(e) {
                                    i(e)
                                })
                            })
                        }, function(e) {
                            return Promise.reject(e)
                        }) : Promise.reject("Unable to play.")
                    }
                }, {
                    key: "pause",
                    value: function() {
                        var e = this,
                            t = this._promise.nativePlay;
                        return t = t ? t : Promise.resolve(), t.then(function() {
                            return !e._el.paused && e._state.loaded && e._el.pause(), Promise.resolve()
                        }, function(e) {
                            return Promise.reject(e)
                        })
                    }
                }, {
                    key: "reset",
                    value: function() {
                        var e = this,
                            t = this._promise.nativePlay;
                        return t = t ? t : Promise.resolve(), t.then(function() {
                            return e._state.loaded && (e._el.paused || e._el.pause(), e._el.currentTime = 0), Promise.resolve()
                        }, function(e) {
                            return Promise.reject(e)
                        })
                    }
                }, {
                    key: "replay",
                    value: function() {
                        return this.reset().then(this.play)
                    }
                }, {
                    key: "_onLoadSuccess",
                    value: function(e) {
                        var t = this;
                        return new Promise(function(i, r) {
                            var n = function o() {
                                return t._el.removeEventListener("loadeddata", o), t._onFirstFrameLoaded(i)
                            };
                            t._el.addEventListener("loadeddata", n), t._el.setAttribute("src", e), t._el.load()
                        })
                    }
                }, {
                    key: "_onFirstFrameLoaded",
                    value: function(e) {
                        return this._state.assetUrl = this._source.assetUrl, this._state.loaded = !0, this._state.loading = !1, this._source.revokeLastObjectUrl(), e()
                    }
                }, {
                    key: "_onLoadFailure",
                    value: function(e) {
                        return a("inline-video load error:", e), this._state.loaded = !1, this._state.loading = !1, Promise.reject(e)
                    }
                }, {
                    key: "_onEnded",
                    value: function(e) {
                        return e()
                    }
                }, {
                    key: "el",
                    get: function() {
                        return this._el
                    }
                }, {
                    key: "source",
                    get: function() {
                        return this._source
                    }
                }, {
                    key: "state",
                    get: function() {
                        return this._state
                    }
                }]), e
            }();
        t.exports = l
    }, {
        "./model": 279,
        "@marcom/ac-console/error": 46,
        "@marcom/asset-source/AssetSource": 254
    }],
    279: [function(e, t, i) {
        "use strict";
        var r = {
                video: {
                    SELECTOR: {
                        video: "video",
                        mediaContainer: ".inline-video-media"
                    }
                },
                frames: {
                    SELECTOR_MAP: new Map,
                    CLASS: {
                        active: "frame-active"
                    }
                },
                controls: {
                    SELECTOR_MAP: new Map
                },
                indicators: {
                    SELECTOR_MAP: new Map,
                    CLASS: {
                        active: "indicator-active"
                    }
                }
            },
            n = r.frames,
            o = r.controls,
            s = r.indicators;
        n.SELECTOR_MAP.set("container", ".inline-video-media"), n.SELECTOR_MAP.set("static", ".inline-video-frame-static"), n.SELECTOR_MAP.set("start", ".inline-video-frame-start"), n.SELECTOR_MAP.set("end", ".inline-video-frame-end"), o.SELECTOR_MAP.set("container", ".inline-video-controls-panel"), o.SELECTOR_MAP.set("play", ".inline-video-controls-play"), o.SELECTOR_MAP.set("replay", ".inline-video-controls-replay"), o.SELECTOR_MAP.set("pause", ".inline-video-controls-pause"), o.SELECTOR_MAP.set("reset", ".inline-video-controls-reset"), s.SELECTOR_MAP.set("container", ".inline-video-indicators"), s.SELECTOR_MAP.set("loading", ".inline-video-indicators-loading"), t.exports = r
    }, {}],
    280: [function(e, t, i) {
        "use strict";
        t.exports = {
            lerp: function(e, t, i) {
                return t + (i - t) * e
            },
            map: function(e, t, i, r, n) {
                return r + (n - r) * (e - t) / (i - t)
            },
            mapClamp: function(e, t, i, r, n) {
                var o = r + (n - r) * (e - t) / (i - t);
                return Math.max(r, Math.min(n, o))
            },
            norm: function(e, t, i) {
                return (e - t) / (i - t)
            },
            clamp: function(e, t, i) {
                return Math.max(t, Math.min(i, e))
            },
            randFloat: function(e, t) {
                return Math.random() * (t - e) + e
            },
            randInt: function(e, t) {
                return Math.floor(Math.random() * (t - e) + e)
            }
        }
    }, {}],
    281: [function(e, t, i) {
        "use strict";
        t.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0,
                    documentMode: !1
                }
            },
            os: {
                osx: !1,
                ios: !1,
                android: !1,
                windows: !1,
                linux: !1,
                fireos: !1,
                chromeos: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0
                }
            }
        }
    }, {}],
    282: [function(e, t, i) {
        "use strict";
        t.exports = {
            browser: [{
                name: "edge",
                userAgent: "Edge",
                version: ["rv", "Edge"],
                test: function(e) {
                    return e.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === e.ua
                }
            }, {
                name: "chrome",
                userAgent: "Chrome"
            }, {
                name: "firefox",
                test: function(e) {
                    return e.ua.indexOf("Firefox") > -1 && e.ua.indexOf("Opera") === -1
                },
                version: "Firefox"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "safari",
                test: function(e) {
                    return e.ua.indexOf("Safari") > -1 && e.vendor.indexOf("Apple") > -1
                },
                version: "Version"
            }, {
                name: "ie",
                test: function(e) {
                    return e.ua.indexOf("IE") > -1 || e.ua.indexOf("Trident") > -1
                },
                version: ["MSIE", "rv"],
                parseDocumentMode: function() {
                    var e = !1;
                    return document.documentMode && (e = parseInt(document.documentMode, 10)), e
                }
            }, {
                name: "opera",
                userAgent: "Opera",
                version: ["Version", "Opera"]
            }],
            os: [{
                name: "windows",
                test: function(e) {
                    return e.ua.indexOf("Windows") > -1
                },
                version: "Windows NT"
            }, {
                name: "osx",
                userAgent: "Mac",
                test: function(e) {
                    return e.ua.indexOf("Macintosh") > -1
                }
            }, {
                name: "ios",
                test: function(e) {
                    return e.ua.indexOf("iPhone") > -1 || e.ua.indexOf("iPad") > -1
                },
                version: ["iPhone OS", "CPU OS"]
            }, {
                name: "linux",
                userAgent: "Linux",
                test: function(e) {
                    return (e.ua.indexOf("Linux") > -1 || e.platform.indexOf("Linux") > -1) && e.ua.indexOf("Android") === -1
                }
            }, {
                name: "fireos",
                test: function(e) {
                    return e.ua.indexOf("Firefox") > -1 && e.ua.indexOf("Mobile") > -1
                },
                version: "rv"
            }, {
                name: "android",
                userAgent: "Android",
                test: function(e) {
                    return e.ua.indexOf("Android") > -1
                }
            }, {
                name: "chromeos",
                userAgent: "CrOS"
            }]
        }
    }, {}],
    283: [function(e, t, i) {
        "use strict";

        function r(e) {
            return new RegExp(e + "[a-zA-Z\\s/\\:]+([0-9_/\\.]+)", "i")
        }

        function n(e, t) {
            if ("function" == typeof e.parseVersion) return e.parseVersion(t);
            var i = e.version || e.userAgent;
            "string" == typeof i && (i = [i]);
            for (var n, o = i.length, s = 0; s < o; s++)
                if (n = t.match(r(i[s])), n && n.length > 1) return n[1].replace(/_/g, ".");
            return !1
        }

        function o(e, t, i) {
            for (var r, o, s = e.length, a = 0; a < s; a++)
                if ("function" == typeof e[a].test ? e[a].test(i) === !0 && (r = e[a].name) : i.ua.indexOf(e[a].userAgent) > -1 && (r = e[a].name), r) {
                    if (t[r] = !0, o = n(e[a], i.ua), "string" == typeof o) {
                        var l = o.split(".");
                        t.version.string = o, l && l.length > 0 && (t.version.major = parseInt(l[0] || 0), t.version.minor = parseInt(l[1] || 0), t.version.patch = parseInt(l[2] || 0))
                    } else "edge" === r && (t.version.string = "12.0.0", t.version.major = "12", t.version.minor = "0", t.version.patch = "0");
                    return "function" == typeof e[a].parseDocumentMode && (t.version.documentMode = e[a].parseDocumentMode()), t
                }
            return t
        }

        function s(e) {
            var t = {};
            return t.browser = o(l.browser, a.browser, e), t.os = o(l.os, a.os, e), t
        }
        var a = e("./defaults"),
            l = e("./dictionary");
        t.exports = s
    }, {
        "./defaults": 281,
        "./dictionary": 282
    }],
    284: [function(e, t, i) {
        "use strict";
        var r = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        t.exports = e("./parseUserAgent")(r)
    }, {
        "./parseUserAgent": 283
    }],
    285: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            n.call(this), this._id = e || s.ID, this._options = Object.assign({}, s.OPTIONS, t), this._allowDOMEventDispatch = !1, this._allowElementStateData = !1, this._options.removeNamespace = "boolean" != typeof this._options.removeNamespace || this._options.removeNamespace, this._el = this._initViewportEl(this._id), this._resizing = !1, this._mediaQueryLists = {
                resolution: {
                    retina: window.matchMedia(c.RETINA)
                },
                orientation: {
                    portrait: window.matchMedia(c.PORTRAIT),
                    landscape: window.matchMedia(c.LANDSCAPE)
                }
            }, this._viewport = this._getViewport(this._options.removeNamespace), this._retina = this._getRetina(this._mediaQueryLists.resolution.retina), this._orientation = this._initOrientation(), this._addListeners(), this._updateElementStateData()
        }
        var n = e("@marcom/ac-event-emitter-micro").EventEmitterMicro,
            o = e("@marcom/ac-raf-emitter/update"),
            s = {
                ID: "viewport-emitter",
                OPTIONS: {
                    removeNamespace: !0
                }
            },
            a = {
                DOM_DISPATCH: "data-viewport-emitter-dispatch",
                STATE: "data-viewport-emitter-state"
            },
            l = "::before",
            c = {
                RETINA: "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)",
                PORTRAIT: "only screen and (orientation: portrait)",
                LANDSCAPE: "only screen and (orientation: landscape)"
            },
            u = {
                any: "change:any",
                orientation: "change:orientation",
                retina: "change:retina",
                viewport: "change:viewport"
            };
        Object.defineProperty(r, "DOM_DISPATCH_ATTRIBUTE", {
            get: function() {
                return a.DOM_DISPATCH
            }
        }), Object.defineProperty(r, "DOM_STATE_ATTRIBUTE", {
            get: function() {
                return a.STATE
            }
        });
        var h = r.prototype = Object.create(n.prototype);
        Object.defineProperty(h, "id", {
            get: function() {
                return this._id
            }
        }), Object.defineProperty(h, "element", {
            get: function() {
                return this._el
            }
        }), Object.defineProperty(h, "mediaQueryLists", {
            get: function() {
                return this._mediaQueryLists
            }
        }), Object.defineProperty(h, "viewport", {
            get: function() {
                return this._viewport
            }
        }), Object.defineProperty(h, "retina", {
            get: function() {
                return this._retina
            }
        }), Object.defineProperty(h, "orientation", {
            get: function() {
                return this._orientation
            }
        }), Object.defineProperty(h, "hasDomDispatch", {
            get: function() {
                return this._allowDOMEventDispatch
            }
        }), h.destroy = function() {
            this._removeListeners();
            for (var e in this._options) this._options[e] = null;
            for (var t in this._mediaQueryLists) {
                var i = this._mediaQueryLists[t];
                for (var r in i) i[r] = null
            }
            this._id = null, this._el = null, this._viewport = null, this._retina = null, this._orientation = null, n.prototype.destroy.call(this)
        }, h._initViewportEl = function(e) {
            var t = document.getElementById(e);
            return t || (t = document.createElement("div"), t.id = e, t = document.body.appendChild(t)), t.hasAttribute(a.DOM_DISPATCH) || (t.setAttribute(a.DOM_DISPATCH, ""), this._allowDOMEventDispatch = !0), t.hasAttribute(a.STATE) || (this._allowElementStateData = !0), t
        }, h._dispatch = function(e, t) {
            var i = {
                viewport: this._viewport,
                orientation: this._orientation,
                retina: this._retina
            };
            if (this._allowDOMEventDispatch) {
                var r = new CustomEvent(e, {
                        detail: t
                    }),
                    n = new CustomEvent(u.any, {
                        detail: i
                    });
                this._el.dispatchEvent(r), this._el.dispatchEvent(n)
            }
            this.trigger(e, t), this.trigger(u.any, i)
        }, h._addListeners = function() {
            this._onOrientationChange = this._onOrientationChange.bind(this), this._onRetinaChange = this._onRetinaChange.bind(this), this._onViewportChange = this._onViewportChange.bind(this), this._onViewportChangeUpdate = this._onViewportChangeUpdate.bind(this), this._mediaQueryLists.orientation.portrait.addListener(this._onOrientationChange), this._mediaQueryLists.orientation.landscape.addListener(this._onOrientationChange), this._mediaQueryLists.resolution.retina.addListener(this._onRetinaChange), window.addEventListener("resize", this._onViewportChange)
        }, h._removeListeners = function() {
            this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange), this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange), this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange), window.removeEventListener("resize", this._onViewportChange)
        }, h._updateElementStateData = function() {
            if (this._allowElementStateData) {
                var e = JSON.stringify({
                    viewport: this._viewport,
                    orientation: this._orientation,
                    retina: this._retina
                });
                this._el.setAttribute(a.STATE, e)
            }
        }, h._getViewport = function(e) {
            var t = window.getComputedStyle(this._el, l).content;
            return t ? (t = t.replace(/["']/g, ""), e ? t.split(":").pop() : t) : null
        }, h._getRetina = function(e) {
            return e.matches
        }, h._getOrientation = function(e) {
            var t = this._orientation;
            if (e.matches) {
                var i = /portrait|landscape/;
                return e.media.match(i)[0]
            }
            return t
        }, h._initOrientation = function() {
            var e = this._getOrientation(this._mediaQueryLists.orientation.portrait);
            return e ? e : this._getOrientation(this._mediaQueryLists.orientation.landscape)
        }, h._onViewportChange = function() {
            this._resizing || (this._resizing = !0, o(this._onViewportChangeUpdate))
        }, h._onViewportChangeUpdate = function() {
            var e = this._viewport;
            if (this._viewport = this._getViewport(this._options.removeNamespace), e !== this._viewport) {
                var t = {
                    from: e,
                    to: this._viewport
                };
                this._updateElementStateData(), this._dispatch(u.viewport, t)
            }
            this._resizing = !1
        }, h._onRetinaChange = function(e) {
            var t = this._retina;
            if (this._retina = this._getRetina(e), t !== this._retina) {
                var i = {
                    from: t,
                    to: this._retina
                };
                this._updateElementStateData(), this._dispatch(u.retina, i)
            }
        }, h._onOrientationChange = function(e) {
            var t = this._orientation;
            if (this._orientation = this._getOrientation(e), t !== this._orientation) {
                var i = {
                    from: t,
                    to: this._orientation
                };
                this._updateElementStateData(), this._dispatch(u.orientation, i)
            }
        }, t.exports = r
    }, {
        "@marcom/ac-event-emitter-micro": 119,
        "@marcom/ac-raf-emitter/update": 216
    }],
    286: [function(e, t, i) {
        "use strict";
        var r = e("./ViewportEmitter");
        t.exports = new r
    }, {
        "./ViewportEmitter": 285
    }],
    287: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("@marcom/ac-url/parseURL"),
            s = e("@marcom/ac-console/error"),
            a = e("@marcom/ac-console/log"),
            l = {
                requestMethod: "GET",
                timeout: 3e4
            },
            c = {
                response: null,
                xhr: null
            },
            u = {
                error: null,
                xhr: null
            },
            h = "href",
            m = function() {
                function e(t, i) {
                    return r(this, e), t || "string" == typeof t ? (this._src = o(t)[h], this._opts = Object.assign(l, i), this._xhr = new XMLHttpRequest, this._promise = null, this._metrics = {
                        progress: 0,
                        totalAssetSize: 0,
                        time: {
                            requested: 0,
                            load: {
                                start: 0,
                                end: 0,
                                total: 0
                            }
                        }
                    }, this._onLoadStart = this._onLoadStart.bind(this), this._onProgress = this._onProgress.bind(this), void(this._rejectData = this._rejectData.bind(this))) : void s("createXhr(src, opts), a src is required to create an XMLHttpRequest")
                }
                return n(e, null, [{
                    key: "isCORSRequest",
                    value: function(e) {
                        return window.location.hostname !== o(e).hostname
                    }
                }, {
                    key: "IS_SUPPORTED",
                    get: function() {
                        var e = window.XMLHttpRequest,
                            t = window.Promise,
                            i = e && "function" == typeof e,
                            r = t && "function" == typeof t;
                        return i && r
                    }
                }]), n(e, [{
                    key: "open",
                    value: function() {
                        0 === this._xhr.readyState && (this._xhr.open(this._opts.requestMethod, this._src, !0, this._opts.user, this._opts.password), this._setXhrProps(), a("XmlHttpRequest opened and properties set"))
                    }
                }, {
                    key: "send",
                    value: function(e) {
                        var t = this;
                        return e = void 0 === e ? null : e, this._promise ? this._promise : this._promise = new Promise(function(i, r) {
                            t._xhr.onprogress = t._onProgress, t._xhr.onloadstart = t._onLoadStart, t._xhr.onload = function() {
                                return t._onLoad(i, r)
                            }, t._xhr.ontimeout = function(e) {
                                return t._rejectData(r, e)
                            }, t._xhr.onerror = function(e) {
                                return t._rejectData(r, e)
                            }, t._xhr.onabort = function(e) {
                                return t._rejectData(r, e)
                            }, t._metrics.time.requested = new Date, t._xhr.send(e), a("XmlHttpRequest sent")
                        })
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        var e = this;
                        return 4 !== this._xhr.readyState && this._xhr.abort(), this._promise = this._promise || Promise.resolve(), this._promise.then(function() {
                            e._nullifyConstructorProps()
                        })
                    }
                }, {
                    key: "_nullifyConstructorProps",
                    value: function() {
                        this._src = null, this._metrics = {
                            progress: null,
                            totalAssetSize: null,
                            time: {
                                requested: null,
                                load: {
                                    start: null,
                                    end: null,
                                    total: null
                                }
                            }
                        }
                    }
                }, {
                    key: "_calcTotalLoadTime",
                    value: function() {
                        this._metrics.time.load.end = Date.now(), this._metrics.time.load.total = this._metrics.time.load.end - this._metrics.time.load.start
                    }
                }, {
                    key: "_setXhrProps",
                    value: function() {
                        var e = this;
                        Object.keys(this._opts).forEach(function(t) {
                            t in e._xhr && "function" != typeof e._xhr[t] && (e._xhr[t] = e._opts[t])
                        })
                    }
                }, {
                    key: "_onLoadStart",
                    value: function() {
                        this._metrics.time.load.start = new Date, this._metrics.progress = 0, a("XmlHttpRequest loading")
                    }
                }, {
                    key: "_onLoad",
                    value: function(e, t) {
                        var i = this._xhr.status;
                        if (200 !== i && 4 === this._xhr.readyState) return this._rejectData(t, i);
                        this._calcTotalLoadTime();
                        var r = Object.assign({}, c, {
                            response: this._xhr.response,
                            xhr: this._xhr
                        });
                        return a("XmlHttpRequest loaded"), e(r)
                    }
                }, {
                    key: "_onProgress",
                    value: function(e) {
                        this._metrics.totalAssetSize || (this._metrics.totalAssetSize = e.total), this._metrics.progress = e.total ? e.loaded / e.total : 0
                    }
                }, {
                    key: "_rejectData",
                    value: function(e, t) {
                        var i = Object.assign({}, u, {
                            error: t,
                            xhr: this._xhr
                        });
                        return s("XhrRequest failed due to", i), e(i)
                    }
                }, {
                    key: "xhr",
                    get: function() {
                        return this._xhr
                    }
                }, {
                    key: "requestUrl",
                    get: function() {
                        return this._src
                    }
                }, {
                    key: "progress",
                    get: function() {
                        return this._metrics.progress
                    }
                }, {
                    key: "totalAssetSize",
                    get: function() {
                        return this._metrics.totalAssetSize
                    }
                }, {
                    key: "requestedAtTime",
                    get: function() {
                        return this._metrics.time.requested
                    }
                }, {
                    key: "loadStartTime",
                    get: function() {
                        return this._metrics.time.load.start
                    }
                }, {
                    key: "loadEndTime",
                    get: function() {
                        return this._metrics.time.load.end
                    }
                }, {
                    key: "totalLoadTime",
                    get: function() {
                        return this._metrics.time.load.total
                    }
                }]), e
            }();
        t.exports = m
    }, {
        "@marcom/ac-console/error": 46,
        "@marcom/ac-console/log": 48,
        "@marcom/ac-url/parseURL": 236
    }],
    288: [function(e, t, i) {
        Function.prototype.bind || (Function.prototype.bind = function(e) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var t = Array.prototype.slice.call(arguments, 1),
                i = this,
                r = function() {},
                n = function() {
                    return i.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                };
            return r.prototype = this.prototype, n.prototype = new r, n
        })
    }, {}],
    289: [function(e, t, i) {
        t.exports = e("es6-promise").polyfill()
    }, {
        "es6-promise": 295
    }],
    290: [function(e, t, i) {
        ! function() {
            for (var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(t, i) {
                var r = Date.now(),
                    n = Math.max(0, 16 - (r - e)),
                    o = window.setTimeout(function() {
                        t(r + n)
                    }, n);
                return e = r + n, o
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
                clearTimeout(e)
            })
        }()
    }, {}],
    291: [function(e, t, i) {
        "use strict";
        t.exports = {
            Queue: e("./ac-queue/Queue"),
            QueueItem: e("./ac-queue/QueueItem"),
            LiveQueue: e("./ac-queue/LiveQueue")
        }
    }, {
        "./ac-queue/LiveQueue": 292,
        "./ac-queue/Queue": 293,
        "./ac-queue/QueueItem": 294
    }],
    292: [function(e, t, i) {
        "use strict";

        function r(e) {
            this._queue = new n, this._maxProcesses = e || 1, this._availableSlots = this._maxProcesses, this._rafId = 0, this._isRunning = !1, this._boundFunctions = {
                _run: this._run.bind(this),
                _releaseSlot: this._releaseSlot.bind(this)
            }
        }
        e("ac-polyfills/Promise"), e("ac-polyfills/requestAnimationFrame"), e("ac-polyfills/Function/prototype.bind");
        var n = e("./Queue"),
            o = (e("./QueueItem"), r.prototype);
        o.start = function() {
            this._isRunning && cancelAnimationFrame(this._rafId), this._rafId = requestAnimationFrame(this._boundFunctions._run), this._isRunning = !0
        }, o.pause = function() {
            this._isRunning && (cancelAnimationFrame(this._rafId), this._rafId = 0), this._isRunning = !1
        }, o.stop = function() {
            this.pause(), this.clear()
        }, o.enqueue = function(e, t) {
            if ("function" != typeof e) throw new Error("LiveQueue can only enqueue functions");
            return this._queue.enqueue(e, t)
        }, o.clear = function() {
            this._queue = new n
        }, o.destroy = function() {
            this.pause(), this._isRunning = !1, this._queue = null, this._boundFunctions = null
        }, o.count = function() {
            return this._queue.count() + this.pending()
        }, o.pending = function() {
            return this._maxProcesses - this._availableSlots
        }, o.isEmpty = function() {
            return 0 === this.count()
        }, o._run = function() {
            if (this._isRunning && (this._rafId = requestAnimationFrame(this._boundFunctions._run), !this._queue.isEmpty() && 0 != this._availableSlots)) {
                var e = this._queue.dequeue(),
                    t = e.data();
                this._isPromise(t) && (this._retainSlot(), t.then(this._boundFunctions._releaseSlot, this._boundFunctions._releaseSlot)), this._stopRunningIfDone()
            }
        }, o._retainSlot = function() {
            this._availableSlots--
        }, o._releaseSlot = function() {
            this._availableSlots++, this._stopRunningIfDone()
        }, o._stopRunningIfDone = function() {
            0 != this._rafId && 0 === this._queue.count() && this._availableSlots == this._maxProcesses && (cancelAnimationFrame(this._rafId), this._rafId = 0)
        }, o._isPromise = function(e) {
            return !(!e || "function" != typeof e.then)
        }, t.exports = r
    }, {
        "./Queue": 293,
        "./QueueItem": 294,
        "ac-polyfills/Function/prototype.bind": 288,
        "ac-polyfills/Promise": 289,
        "ac-polyfills/requestAnimationFrame": 290
    }],
    293: [function(e, t, i) {
        "use strict";

        function r() {
            this._items = []
        }
        var n = e("./QueueItem"),
            o = r.prototype;
        o.enqueue = function(e, t) {
            return void 0 === t && (t = r.PRIORITY_DEFAULT), this.enqueueQueueItem(new n(e, t))
        }, o.enqueueQueueItem = function(e) {
            return this._items.push(e), e
        }, o.dequeue = function() {
            this._heapSort();
            var e = this._items.length - 1,
                t = this._items[0];
            return this._items[0] = this._items[e], this._items.pop(), t
        }, o.peek = function() {
            return 0 == this.count() ? null : (this._heapSort(), this._items[0])
        }, o.isEmpty = function() {
            return 0 === this._items.length
        }, o.count = function() {
            return this._items.length
        }, o.toString = function() {
            for (var e = ["Queue total items: " + this.count() + "\n"], t = 0; t < this.count(); ++t) e.push(this._items[t].toString() + "\n");
            return e.join("")
        }, o._heapSort = function() {
            for (var e = 0, t = this._items.length - 1; t >= 0; t--)
                for (var i = t; i > 0;) {
                    e++;
                    var r = Math.floor((i - 1) / 2);
                    if (this._items[i].compareTo(this._items[r]) >= 0) break;
                    var n = this._items[i];
                    this._items[i] = this._items[r], this._items[r] = n, i = r
                }
        }, r.PRIORITY_LOW = 10, r.PRIORITY_DEFAULT = 5, r.PRIORITY_HIGH = 1, t.exports = r
    }, {
        "./QueueItem": 294
    }],
    294: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            this.priority = t, this.data = e, this.insertionOrder = n++
        }
        var n = 0,
            o = r.prototype;
        o.compareTo = function(e) {
            return this.priority < e.priority ? -1 : this.priority > e.priority ? 1 : this.insertionOrder < e.insertionOrder ? -1 : 1
        }, o.toString = function() {
            return "QueueItem {priority:" + this.priority + ",\tdata:" + this.data + "\tinsertionOrder:" + this.insertionOrder + "}"
        }, t.exports = r
    }, {}],
    295: [function(e, t, i) {
        "use strict";
        var r = e("./promise/promise").Promise,
            n = e("./promise/polyfill").polyfill;
        i.Promise = r, i.polyfill = n
    }, {
        "./promise/polyfill": 299,
        "./promise/promise": 300
    }],
    296: [function(e, t, i) {
        "use strict";

        function r(e) {
            var t = this;
            if (!n(e)) throw new TypeError("You must pass an array to all.");
            return new t(function(t, i) {
                function r(e) {
                    return function(t) {
                        n(e, t)
                    }
                }

                function n(e, i) {
                    a[e] = i, 0 === --l && t(a)
                }
                var s, a = [],
                    l = e.length;
                0 === l && t([]);
                for (var c = 0; c < e.length; c++) s = e[c], s && o(s.then) ? s.then(r(c), i) : n(c, s)
            })
        }
        var n = e("./utils").isArray,
            o = e("./utils").isFunction;
        i.all = r
    }, {
        "./utils": 304
    }],
    297: [function(e, t, i) {
        (function(e, t) {
            "use strict";

            function r() {
                return function() {
                    e.nextTick(s)
                }
            }

            function n() {
                var e = 0,
                    t = new u(s),
                    i = document.createTextNode("");
                return t.observe(i, {
                        characterData: !0
                    }),
                    function() {
                        i.data = e = ++e % 2
                    }
            }

            function o() {
                return function() {
                    h.setTimeout(s, 1)
                }
            }

            function s() {
                for (var e = 0; e < m.length; e++) {
                    var t = m[e],
                        i = t[0],
                        r = t[1];
                    i(r)
                }
                m = []
            }

            function a(e, t) {
                var i = m.push([e, t]);
                1 === i && l()
            }
            var l, c = "undefined" != typeof window ? window : {},
                u = c.MutationObserver || c.WebKitMutationObserver,
                h = "undefined" != typeof t ? t : void 0 === this ? window : this,
                m = [];
            l = "undefined" != typeof e && "[object process]" === {}.toString.call(e) ? r() : u ? n() : o(), i.asap = a
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        _process: 169
    }],
    298: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            return 2 !== arguments.length ? n[e] : void(n[e] = t)
        }
        var n = {
            instrument: !1
        };
        i.config = n, i.configure = r
    }, {}],
    299: [function(e, t, i) {
        (function(t) {
            "use strict";

            function r() {
                var e;
                e = "undefined" != typeof t ? t : "undefined" != typeof window && window.document ? window : self;
                var i = "Promise" in e && "resolve" in e.Promise && "reject" in e.Promise && "all" in e.Promise && "race" in e.Promise && function() {
                    var t;
                    return new e.Promise(function(e) {
                        t = e
                    }), o(t)
                }();
                i || (e.Promise = n)
            }
            var n = e("./promise").Promise,
                o = e("./utils").isFunction;
            i.polyfill = r
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./promise": 300,
        "./utils": 304
    }],
    300: [function(e, t, i) {
        "use strict";

        function r(e) {
            if (!y(e)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
            if (!(this instanceof r)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
            this._subscribers = [], n(e, this)
        }

        function n(e, t) {
            function i(e) {
                c(t, e)
            }

            function r(e) {
                h(t, e)
            }
            try {
                e(i, r)
            } catch (n) {
                r(n)
            }
        }

        function o(e, t, i, r) {
            var n, o, s, a, u = y(i);
            if (u) try {
                n = i(r), s = !0
            } catch (m) {
                a = !0, o = m
            } else n = r, s = !0;
            l(t, n) || (u && s ? c(t, n) : a ? h(t, o) : e === T ? c(t, n) : e === C && h(t, n))
        }

        function s(e, t, i, r) {
            var n = e._subscribers,
                o = n.length;
            n[o] = t, n[o + T] = i, n[o + C] = r
        }

        function a(e, t) {
            for (var i, r, n = e._subscribers, s = e._detail, a = 0; a < n.length; a += 3) i = n[a], r = n[a + t], o(t, i, r, s);
            e._subscribers = null
        }

        function l(e, t) {
            var i, r = null;
            try {
                if (e === t) throw new TypeError("A promises callback cannot return that same promise.");
                if (f(t) && (r = t.then, y(r))) return r.call(t, function(r) {
                    return !!i || (i = !0, void(t !== r ? c(e, r) : u(e, r)))
                }, function(t) {
                    return !!i || (i = !0, void h(e, t))
                }), !0
            } catch (n) {
                return !!i || (h(e, n), !0)
            }
            return !1
        }

        function c(e, t) {
            e === t ? u(e, t) : l(e, t) || u(e, t)
        }

        function u(e, t) {
            e._state === w && (e._state = S, e._detail = t, d.async(m, e))
        }

        function h(e, t) {
            e._state === w && (e._state = S, e._detail = t, d.async(p, e))
        }

        function m(e) {
            a(e, e._state = T)
        }

        function p(e) {
            a(e, e._state = C)
        }
        var d = e("./config").config,
            f = (e("./config").configure, e("./utils").objectOrFunction),
            y = e("./utils").isFunction,
            _ = (e("./utils").now, e("./all").all),
            g = e("./race").race,
            v = e("./resolve").resolve,
            b = e("./reject").reject,
            E = e("./asap").asap;
        d.async = E;
        var w = void 0,
            S = 0,
            T = 1,
            C = 2;
        r.prototype = {
            constructor: r,
            _state: void 0,
            _detail: void 0,
            _subscribers: void 0,
            then: function(e, t) {
                var i = this,
                    r = new this.constructor(function() {});
                if (this._state) {
                    var n = arguments;
                    d.async(function() {
                        o(i._state, r, n[i._state - 1], i._detail)
                    })
                } else s(this, r, e, t);
                return r
            },
            "catch": function(e) {
                return this.then(null, e)
            }
        }, r.all = _, r.race = g, r.resolve = v, r.reject = b, i.Promise = r
    }, {
        "./all": 296,
        "./asap": 297,
        "./config": 298,
        "./race": 301,
        "./reject": 302,
        "./resolve": 303,
        "./utils": 304
    }],
    301: [function(e, t, i) {
        "use strict";

        function r(e) {
            var t = this;
            if (!n(e)) throw new TypeError("You must pass an array to race.");
            return new t(function(t, i) {
                for (var r, n = 0; n < e.length; n++) r = e[n], r && "function" == typeof r.then ? r.then(t, i) : t(r)
            })
        }
        var n = e("./utils").isArray;
        i.race = r
    }, {
        "./utils": 304
    }],
    302: [function(e, t, i) {
        "use strict";

        function r(e) {
            var t = this;
            return new t(function(t, i) {
                i(e)
            })
        }
        i.reject = r
    }, {}],
    303: [function(e, t, i) {
        "use strict";

        function r(e) {
            if (e && "object" == typeof e && e.constructor === this) return e;
            var t = this;
            return new t(function(t) {
                t(e)
            })
        }
        i.resolve = r
    }, {}],
    304: [function(e, t, i) {
        "use strict";

        function r(e) {
            return n(e) || "object" == typeof e && null !== e
        }

        function n(e) {
            return "function" == typeof e
        }

        function o(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
        var s = Date.now || function() {
            return (new Date).getTime()
        };
        i.objectOrFunction = r, i.isFunction = n, i.isArray = o, i.now = s
    }, {}],
    305: [function(e, t, i) {
        function r(e) {
            var t = new Float32Array(16);
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }
        t.exports = r
    }, {}],
    306: [function(e, t, i) {
        function r() {
            var e = new Float32Array(16);
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
        }
        t.exports = r
    }, {}],
    307: [function(e, t, i) {
        function r(e, t, i) {
            var r = t[0],
                n = t[1],
                o = t[2],
                s = t[3],
                a = r + r,
                l = n + n,
                c = o + o,
                u = r * a,
                h = r * l,
                m = r * c,
                p = n * l,
                d = n * c,
                f = o * c,
                y = s * a,
                _ = s * l,
                g = s * c;
            return e[0] = 1 - (p + f), e[1] = h + g, e[2] = m - _, e[3] = 0, e[4] = h - g, e[5] = 1 - (u + f), e[6] = d + y, e[7] = 0, e[8] = m + _, e[9] = d - y, e[10] = 1 - (u + p), e[11] = 0, e[12] = i[0], e[13] = i[1], e[14] = i[2], e[15] = 1, e
        }
        t.exports = r
    }, {}],
    308: [function(e, t, i) {
        function r(e) {
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
        }
        t.exports = r
    }, {}],
    309: [function(e, t, i) {
        function r(e, t) {
            var i = t[0],
                r = t[1],
                n = t[2],
                o = t[3],
                s = t[4],
                a = t[5],
                l = t[6],
                c = t[7],
                u = t[8],
                h = t[9],
                m = t[10],
                p = t[11],
                d = t[12],
                f = t[13],
                y = t[14],
                _ = t[15],
                g = i * a - r * s,
                v = i * l - n * s,
                b = i * c - o * s,
                E = r * l - n * a,
                w = r * c - o * a,
                S = n * c - o * l,
                T = u * f - h * d,
                C = u * y - m * d,
                P = u * _ - p * d,
                O = h * y - m * f,
                x = h * _ - p * f,
                A = m * _ - p * y,
                k = g * A - v * x + b * O + E * P - w * C + S * T;
            return k ? (k = 1 / k, e[0] = (a * A - l * x + c * O) * k, e[1] = (n * x - r * A - o * O) * k, e[2] = (f * S - y * w + _ * E) * k, e[3] = (m * w - h * S - p * E) * k, e[4] = (l * P - s * A - c * C) * k, e[5] = (i * A - n * P + o * C) * k, e[6] = (y * b - d * S - _ * v) * k, e[7] = (u * S - m * b + p * v) * k, e[8] = (s * x - a * P + c * T) * k, e[9] = (r * P - i * x - o * T) * k, e[10] = (d * w - f * b + _ * g) * k, e[11] = (h * b - u * w - p * g) * k, e[12] = (a * C - s * O - l * T) * k, e[13] = (i * O - r * C + n * T) * k, e[14] = (f * v - d * E - y * g) * k, e[15] = (u * E - h * v + m * g) * k, e) : null
        }
        t.exports = r
    }, {}],
    310: [function(e, t, i) {
        function r(e, t, i) {
            var r = t[0],
                n = t[1],
                o = t[2],
                s = t[3],
                a = t[4],
                l = t[5],
                c = t[6],
                u = t[7],
                h = t[8],
                m = t[9],
                p = t[10],
                d = t[11],
                f = t[12],
                y = t[13],
                _ = t[14],
                g = t[15],
                v = i[0],
                b = i[1],
                E = i[2],
                w = i[3];
            return e[0] = v * r + b * a + E * h + w * f, e[1] = v * n + b * l + E * m + w * y, e[2] = v * o + b * c + E * p + w * _, e[3] = v * s + b * u + E * d + w * g, v = i[4], b = i[5], E = i[6], w = i[7], e[4] = v * r + b * a + E * h + w * f, e[5] = v * n + b * l + E * m + w * y, e[6] = v * o + b * c + E * p + w * _, e[7] = v * s + b * u + E * d + w * g, v = i[8], b = i[9], E = i[10], w = i[11], e[8] = v * r + b * a + E * h + w * f, e[9] = v * n + b * l + E * m + w * y, e[10] = v * o + b * c + E * p + w * _, e[11] = v * s + b * u + E * d + w * g, v = i[12], b = i[13], E = i[14], w = i[15], e[12] = v * r + b * a + E * h + w * f, e[13] = v * n + b * l + E * m + w * y, e[14] = v * o + b * c + E * p + w * _, e[15] = v * s + b * u + E * d + w * g, e
        }
        t.exports = r
    }, {}],
    311: [function(e, t, i) {
        function r(e, t, i, r) {
            var n, o, s, a, l, c, u, h, m, p, d, f, y, _, g, v, b, E, w, S, T, C, P, O, x = r[0],
                A = r[1],
                k = r[2],
                I = Math.sqrt(x * x + A * A + k * k);
            return Math.abs(I) < 1e-6 ? null : (I = 1 / I, x *= I, A *= I, k *= I, n = Math.sin(i), o = Math.cos(i), s = 1 - o, a = t[0], l = t[1], c = t[2], u = t[3], h = t[4], m = t[5], p = t[6], d = t[7], f = t[8], y = t[9], _ = t[10], g = t[11], v = x * x * s + o, b = A * x * s + k * n, E = k * x * s - A * n, w = x * A * s - k * n, S = A * A * s + o, T = k * A * s + x * n, C = x * k * s + A * n, P = A * k * s - x * n, O = k * k * s + o, e[0] = a * v + h * b + f * E, e[1] = l * v + m * b + y * E, e[2] = c * v + p * b + _ * E, e[3] = u * v + d * b + g * E, e[4] = a * w + h * S + f * T, e[5] = l * w + m * S + y * T, e[6] = c * w + p * S + _ * T, e[7] = u * w + d * S + g * T, e[8] = a * C + h * P + f * O, e[9] = l * C + m * P + y * O, e[10] = c * C + p * P + _ * O, e[11] = u * C + d * P + g * O, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e)
        }
        t.exports = r
    }, {}],
    312: [function(e, t, i) {
        function r(e, t, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                o = t[4],
                s = t[5],
                a = t[6],
                l = t[7],
                c = t[8],
                u = t[9],
                h = t[10],
                m = t[11];
            return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = o * n + c * r, e[5] = s * n + u * r, e[6] = a * n + h * r, e[7] = l * n + m * r, e[8] = c * n - o * r, e[9] = u * n - s * r, e[10] = h * n - a * r, e[11] = m * n - l * r, e
        }
        t.exports = r
    }, {}],
    313: [function(e, t, i) {
        function r(e, t, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                o = t[0],
                s = t[1],
                a = t[2],
                l = t[3],
                c = t[8],
                u = t[9],
                h = t[10],
                m = t[11];
            return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = o * n - c * r, e[1] = s * n - u * r, e[2] = a * n - h * r, e[3] = l * n - m * r, e[8] = o * r + c * n, e[9] = s * r + u * n, e[10] = a * r + h * n, e[11] = l * r + m * n, e
        }
        t.exports = r
    }, {}],
    314: [function(e, t, i) {
        function r(e, t, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                o = t[0],
                s = t[1],
                a = t[2],
                l = t[3],
                c = t[4],
                u = t[5],
                h = t[6],
                m = t[7];
            return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = o * n + c * r, e[1] = s * n + u * r, e[2] = a * n + h * r, e[3] = l * n + m * r, e[4] = c * n - o * r, e[5] = u * n - s * r, e[6] = h * n - a * r, e[7] = m * n - l * r, e
        }
        t.exports = r
    }, {}],
    315: [function(e, t, i) {
        function r(e, t, i) {
            var r = i[0],
                n = i[1],
                o = i[2];
            return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * o, e[9] = t[9] * o, e[10] = t[10] * o, e[11] = t[11] * o, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
        }
        t.exports = r
    }, {}],
    316: [function(e, t, i) {
        function r(e, t, i) {
            var r, n, o, s, a, l, c, u, h, m, p, d, f = i[0],
                y = i[1],
                _ = i[2];
            return t === e ? (e[12] = t[0] * f + t[4] * y + t[8] * _ + t[12], e[13] = t[1] * f + t[5] * y + t[9] * _ + t[13], e[14] = t[2] * f + t[6] * y + t[10] * _ + t[14], e[15] = t[3] * f + t[7] * y + t[11] * _ + t[15]) : (r = t[0], n = t[1], o = t[2], s = t[3], a = t[4], l = t[5], c = t[6], u = t[7], h = t[8], m = t[9], p = t[10], d = t[11], e[0] = r, e[1] = n, e[2] = o, e[3] = s, e[4] = a, e[5] = l, e[6] = c, e[7] = u, e[8] = h, e[9] = m, e[10] = p, e[11] = d, e[12] = r * f + a * y + h * _ + t[12], e[13] = n * f + l * y + m * _ + t[13], e[14] = o * f + c * y + p * _ + t[14], e[15] = s * f + u * y + d * _ + t[15]), e
        }
        t.exports = r
    }, {}],
    317: [function(e, t, i) {
        function r(e, t) {
            if (e === t) {
                var i = t[1],
                    r = t[2],
                    n = t[3],
                    o = t[6],
                    s = t[7],
                    a = t[11];
                e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = i, e[6] = t[9], e[7] = t[13], e[8] = r, e[9] = o, e[11] = t[14], e[12] = n, e[13] = s, e[14] = a
            } else e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
            return e
        }
        t.exports = r
    }, {}],
    318: [function(e, t, i) {
        function r() {
            var e = new Float32Array(3);
            return e[0] = 0, e[1] = 0, e[2] = 0, e
        }
        t.exports = r
    }, {}],
    319: [function(e, t, i) {
        function r(e, t, i) {
            var r = t[0],
                n = t[1],
                o = t[2],
                s = i[0],
                a = i[1],
                l = i[2];
            return e[0] = n * l - o * a, e[1] = o * s - r * l, e[2] = r * a - n * s, e
        }
        t.exports = r
    }, {}],
    320: [function(e, t, i) {
        function r(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        }
        t.exports = r
    }, {}],
    321: [function(e, t, i) {
        function r(e, t, i) {
            var r = new Float32Array(3);
            return r[0] = e, r[1] = t, r[2] = i, r
        }
        t.exports = r
    }, {}],
    322: [function(e, t, i) {
        function r(e) {
            var t = e[0],
                i = e[1],
                r = e[2];
            return Math.sqrt(t * t + i * i + r * r)
        }
        t.exports = r
    }, {}],
    323: [function(e, t, i) {
        function r(e, t) {
            var i = t[0],
                r = t[1],
                n = t[2],
                o = i * i + r * r + n * n;
            return o > 0 && (o = 1 / Math.sqrt(o), e[0] = t[0] * o, e[1] = t[1] * o, e[2] = t[2] * o), e
        }
        t.exports = r
    }, {}],
    324: [function(e, t, i) {
        function r() {
            var e = new Float32Array(4);
            return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e
        }
        t.exports = r
    }, {}],
    325: [function(e, t, i) {
        function r(e, t, i, r) {
            var n = new Float32Array(4);
            return n[0] = e, n[1] = t, n[2] = i, n[3] = r, n
        }
        t.exports = r
    }, {}],
    326: [function(e, t, i) {
        function r(e, t, i) {
            var r = t[0],
                n = t[1],
                o = t[2],
                s = t[3];
            return e[0] = i[0] * r + i[4] * n + i[8] * o + i[12] * s, e[1] = i[1] * r + i[5] * n + i[9] * o + i[13] * s, e[2] = i[2] * r + i[6] * n + i[10] * o + i[14] * s, e[3] = i[3] * r + i[7] * n + i[11] * o + i[15] * s, e
        }
        t.exports = r
    }, {}],
    327: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/anim-system/Model/AnimSystemModel"),
            c = e("@marcom/ac-raf-emitter/update"),
            u = e("@marcom/ac-raf-emitter/draw"),
            h = 17,
            m = 106,
            p = 82,
            d = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._pageMetrics = l.pageMetrics, i._stickyContainer = i.el.querySelector(".sticky-container"), i._copyContainer = i.el.querySelector(".copy-container"), i._imageChip = i.el.querySelector(".image-chip"), i._copyWrappers = i.el.querySelectorAll(".copy-wrapper"), i._lastCopyWrapper = i._copyWrappers[i._copyWrappers.length - 1], i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        this.setStickyContainerHeight()
                    }
                }, {
                    key: "setStickyContainerHeight",
                    value: function() {
                        var e = this;
                        return "S" === this._pageMetrics.breakpoint ? void(this._stickyContainer.style.height = "0") : void c(function() {
                            var t = window.getComputedStyle(e._copyContainer),
                                i = parseInt(t.getPropertyValue("top")),
                                r = parseInt(t.getPropertyValue("height")),
                                n = parseInt(window.getComputedStyle(e._lastCopyWrapper).getPropertyValue("height")),
                                o = parseInt(window.getComputedStyle(e._imageChip).getPropertyValue("height")),
                                s = e._pageMetrics.windowHeight,
                                a = (s - o) / 2,
                                l = (o - n) / 2,
                                c = "L" === e._pageMetrics.breakpoint ? m : p,
                                d = i + r + a + l - c,
                                f = d / h;
                            u(function() {
                                e._stickyContainer.style.height = f + "em"
                            })
                        })
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        this.setStickyContainerHeight()
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {
                        this.setStickyContainerHeight()
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList;
                        return e.contains("chip-enhanced") && !e.contains("aow") && !e.contains("reduced-motion")
                    }
                }]), t
            }(a);
        t.exports = d
    }, {
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/anim-system/Model/AnimSystemModel": 242,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    328: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/ac-gallery/fade/FadeGallery"),
            c = e("@marcom/anim-system/Model/AnimSystemModel"),
            u = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i.galleryVisible = !1, i.lastItemIndex = 0, i.onGalleryUpdate = i.onGalleryUpdate.bind(i), i.onGalleryUpdateComplete = i.onGalleryUpdateComplete.bind(i), i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        this.keyframeCreator = this.gum.getComponentOfType("CameraOperationsKeyframeCreator"), this.createDestroyGallery = this.createDestroyGallery.bind(this), this.createDestroyGallery()
                    }
                }, {
                    key: "createDestroyGallery",
                    value: function() {
                        this.galleryVisible || "S" !== c.pageMetrics.breakpoint ? (this.destroyGallery(), this.keyframeCreator && this.keyframeCreator.setupScrollGroup()) : (this.keyframeCreator && this.keyframeCreator.setupTimeGroup(), this.createGallery())
                    }
                }, {
                    key: "createGallery",
                    value: function() {
                        this.gallery = new l(this.el, {
                            resizeContainer: !0,
                            crossFade: !0
                        }), this.galleryVisible = !0, this.gallery.on(l.UPDATE, this.onGalleryUpdate), this.gallery.on(l.UPDATE_COMPLETE, this.onGalleryUpdateComplete)
                    }
                }, {
                    key: "destroyGallery",
                    value: function() {
                        this.galleryVisible && (this.gallery.destroy(), this.galleryVisible = !1)
                    }
                }, {
                    key: "onGalleryUpdate",
                    value: function(e) {
                        var t = e.incoming[0],
                            i = this.gallery.getItemIndex(t),
                            r = i + 1,
                            n = Math.abs(this.lastItemIndex - i),
                            o = 1 / n;
                        o < 1 && (o *= .5), this.keyframeCreator && this.keyframeCreator.chapterPlayer.playToChapter({
                            index: r,
                            timeScale: o
                        })
                    }
                }, {
                    key: "onGalleryUpdateComplete",
                    value: function(e) {
                        var t = e.incoming[0];
                        this.lastItemIndex = this.gallery.getItemIndex(t)
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        this.createDestroyGallery()
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList.contains("static-interaction"),
                            t = document.documentElement.classList.contains("reduced-motion");
                        return !(e || t)
                    }
                }]), t
            }(a);
        t.exports = u
    }, {
        "@marcom/ac-gallery/fade/FadeGallery": 154,
        "@marcom/anim-system/Model/AnimSystemModel": 242,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    329: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/anim-system"),
            c = e("@marcom/anim-system/Model/AnimSystemModel"),
            u = {
                create: e("@marcom/ac-raf-emitter/RAFEmitter"),
                update: e("@marcom/ac-raf-emitter/update"),
                draw: e("@marcom/ac-raf-emitter/draw")
            },
            h = e("../../shared/helpers/waitframes"),
            m = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i.timeGroup = null, i.scrollGroup = null, i.chapterPlayer = null, i.onAnimateInTrigger = i.onAnimateInTrigger.bind(i), i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = {
                            el: this.el.parentElement,
                            start: "50% - 55vh",
                            end: "50% - 55vh + 45vh",
                            event: "AnimateGalleryToFirstChapter",
                            onEnter: this.onAnimateInTrigger
                        };
                        this.animateInKeyframe = this.addDiscreteEvent(e)
                    }
                }, {
                    key: "onAnimateInTrigger",
                    value: function() {
                        var e = this;
                        this.chapterPlayer && 0 === this.chapterPlayer.currentChapter.index && u.draw(function() {
                            return e.chapterPlayer.playToNextChapter()
                        })
                    }
                }, {
                    key: "setupTimeGroup",
                    value: function() {
                        var e = this;
                        this.timeGroup || (this.scrollGroup && (this.scrollGroup.remove(), this.scrollGroup = null), h(5).then(function() {
                            e.timeGroup = l.createTimeGroup(e.el), e.timeGroup.friendlyName = "CameraComputation TimeGroup", e.chapterPlayer = e.gum.addComponent({
                                el: e.el,
                                componentName: "TimelineChapterPlayer",
                                data: e
                            }), e.createTimeKeyframes(), e.animateInKeyframe.isCurrentlyInRange && e.onAnimateInTrigger()
                        }))
                    }
                }, {
                    key: "setupScrollGroup",
                    value: function() {
                        var e = this;
                        this.scrollGroup || (this.timeGroup && (this.timeGroup.remove(), this.timeGroup = null, this.gum.removeComponent(this.chapterPlayer), this.chapterPlayer = null), h(5).then(function() {
                            e.scrollGroup = l.createScrollGroup(e.el), e.scrollGroup.friendlyName = "CameraComputation ScrollGroup", e.createScrollingKeyframes()
                        }))
                    }
                }, {
                    key: "createTimeKeyframes",
                    value: function() {
                        var e = this,
                            t = function(t) {
                                return e.el.querySelector(t)
                            },
                            i = function(t) {
                                return e.el.querySelectorAll(t)
                            },
                            r = .8;
                        this.timeGroup.addKeyframe(t(".figure-container"), {
                            start: 0,
                            end: .75,
                            easeFunction: "easeInOutSin",
                            rotationX: [0, -15],
                            ease: r
                        }), this.timeGroup.addKeyframe(t(".figure-container"), {
                            start: 0,
                            end: .75,
                            x: [0, "-25vw"],
                            easeFunction: "easeInOutSin",
                            breakpointMask: "ML"
                        });
                        var n = .043,
                            o = Array.from(i(".image-computation"));
                        o.reverse().forEach(function(t, i, s) {
                            var a = o.length,
                                l = a - i,
                                c = "0.75 + (" + l + "/" + a + ") * 1.0";
                            t.setAttribute("opacity", 1 - i * n), e.timeGroup.addKeyframe(t, {
                                start: 0,
                                end: "(" + i + "/" + a + ") * 0.3 + 1",
                                opacity: [1, 1 - i * n],
                                rotationY: [0, -45],
                                z: [l / 2, l / 2],
                                easeFunction: "easeOutQuint",
                                ease: r
                            }), e.timeGroup.addKeyframe(t, {
                                start: .45 + .02 * i,
                                end: c,
                                x: [0, "15%w * " + (i - 3) + " + 25%w"],
                                easeFunction: "easeInOutCubic",
                                ease: r
                            })
                        }), l.forceUpdate({
                            recalculateActiveKeyframes: !0,
                            waitForNextUpdate: !1
                        });
                        var s = o[0],
                            a = l.getControllerForTarget(s),
                            c = a.keyframes.opacity[0],
                            u = Object.assign({}, c.jsonProps);
                        u.z = void 0, u.rotationY = void 0, u.start = "(" + u.start + " + " + u.end + ")/1.6", u.opacity = [1, 0], this.timeGroup.addKeyframe(s, u), c.jsonProps.opacity = void 0, c.jsonProps.z = [o.length, o.length], c.overwriteProps(c.jsonProps);
                        var h = Array.from(this.el.parentElement.querySelectorAll(".computation-copy .row-computation")),
                            m = (h.length, "1.75");
                        this.chapterPlayer.addChapter({
                            name: "animate-in-complete",
                            position: m
                        }), h.forEach(function(t, i, s) {
                            if (i !== s.length - 1) {
                                var a = 1.5,
                                    l = m + " + " + a + " * " + i,
                                    c = l + " + 0.75";
                                e.timeGroup.addKeyframe(o[i + 1], {
                                    start: l,
                                    end: c,
                                    easeFunction: "easeInOutCubic",
                                    x: [null, "15%w * -3 + 25%w"],
                                    opacity: [null, 0],
                                    ease: r
                                }), e.chapterPlayer.addChapter({
                                    name: "end-chapter-animation-" + i,
                                    position: l + " + " + a
                                });
                                for (var u = i + 1 + 1; u < o.length; u++) {
                                    var h = o[u],
                                        p = parseFloat(h.getAttribute("opacity"));
                                    p += n, h.setAttribute("opacity", p);
                                    var d = l + " + " + u + "/" + o.length + " * " + a + " * 0.5",
                                        f = d + " + " + a + " * 0.5";
                                    e.timeGroup.addKeyframe(h, {
                                        start: d,
                                        end: f,
                                        easeFunction: "easeInOutCubic",
                                        opacity: [null, p],
                                        x: [null, "(15%w * " + (u - i - 3) + " + 15%w)"],
                                        ease: r
                                    })
                                }
                            }
                        })
                    }
                }, {
                    key: "createScrollingKeyframes",
                    value: function() {
                        var e = this,
                            t = function(t) {
                                return e.el.querySelector(t)
                            },
                            i = function(t) {
                                return e.el.querySelectorAll(t)
                            },
                            r = function(e, t) {
                                return Object.assign(e, t)
                            },
                            n = {
                                relativeTo: ".computation-images",
                                ease: .75
                            };
                        this.scrollGroup.addKeyframe(t(".figure-container"), r({
                            start: "0",
                            end: "20vh",
                            easeFunction: "easeInOutSin",
                            x: [0, 0],
                            rotationX: [0, -15]
                        }, n));
                        var o = .043,
                            s = Array.from(i(".image-computation"));
                        s.reverse().forEach(function(t, i, a) {
                            var l = s.length,
                                c = l - i,
                                u = "40vh + (3.5vh*" + .75 * c + ")";
                            t.setAttribute("opacity", 1 - i * o), e.scrollGroup.addKeyframe(t, r({
                                start: "0",
                                end: "30vh",
                                opacity: [1, 1 - i * o],
                                rotationY: [1, -45],
                                easeFunction: "easeOutQuad"
                            }, n)), e.scrollGroup.addKeyframe(t, r({
                                start: "15vh",
                                end: u,
                                x: [0, "15%w * " + (i - 1) + " + 25%w"],
                                easeFunction: "easeInOutCubic"
                            }, n))
                        }), l.forceUpdate({
                            recalculateActiveKeyframes: !0,
                            waitForNextUpdate: !1
                        });
                        var a = s[0],
                            c = l.getControllerForTarget(a),
                            u = c.keyframes.opacity[0];
                        u.jsonProps.opacity[1] = 0;
                        var h = Array.from(this.el.parentElement.querySelectorAll(".computation-copy .row-computation")),
                            m = 60;
                        h.forEach(function(t, i, r) {
                            if (i !== r.length - 1) {
                                var n = l.getControllerForTarget(t),
                                    a = n.getNearestKeyframeForAttribute(1, "opacity");
                                if (a) {
                                    var c = a.jsonProps.start,
                                        u = "." + Array.from(t.classList).join(".");
                                    i += 1, e.scrollGroup.addKeyframe(s[i], {
                                        start: c,
                                        end: c + "0.5px",
                                        relativeTo: u,
                                        ease: .1,
                                        easeFunction: "easeInOutCubic",
                                        x: [null, "10%w * -1 + 25%w"],
                                        opacity: [null, .001]
                                    });
                                    for (var h = i + 1; h < s.length; h++) {
                                        var p = s[h],
                                            d = (h - i) / (s.length - i) * .5,
                                            f = 1 - d,
                                            y = parseFloat(p.getAttribute("opacity"));
                                        y += o, p.setAttribute("opacity", y);
                                        var _ = c + " + " + m + "vh * " + .75 * d;
                                        e.scrollGroup.addKeyframe(p, {
                                            start: _,
                                            end: c + " + " + m + "vh * 0.5 - " + 10 * f + "vh",
                                            relativeTo: u,
                                            ease: .5,
                                            easeFunction: "easeInOutQuad",
                                            opacity: [null, y],
                                            x: [null, "(15%w * " + (h - i - 1) + " + 25%w)"]
                                        })
                                    }
                                }
                            }
                        })
                    }
                }, {
                    key: "pageMetrics",
                    get: function() {
                        return c.pageMetrics
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList.contains("static-interaction"),
                            t = document.documentElement.classList.contains("reduced-motion");
                        return !(e || t)
                    }
                }]), t
            }(a);
        t.exports = m
    }, {
        "../../shared/helpers/waitframes": 356,
        "@marcom/ac-raf-emitter/RAFEmitter": 206,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/anim-system": 237,
        "@marcom/anim-system/Model/AnimSystemModel": 242,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    330: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/ac-eclipse/src/clips/ClipEasing"),
            c = {
                draw: e("@marcom/ac-raf-emitter/draw")
            },
            u = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i.friendlyName = "TimelineChapterPlayer", i.keyframeCreator = e.data, i.chapters = [], i.currentChapter = null, i.clip = null, i._time = 0, i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        this.timeGroup = this.keyframeCreator.timeGroup, this.currentChapter = this.addChapter({
                            name: "start",
                            position: 0
                        })
                    }
                }, {
                    key: "addChapter",
                    value: function(e) {
                        var t = this,
                            i = e.name,
                            r = e.position,
                            n = this.timeGroup.addKeyframe(this, {
                                start: r,
                                end: r,
                                event: i
                            }),
                            o = new h(i, r, n);
                        return this.chapters.push(o), c.draw(function() {
                            t.chapters.sort(function(e, t) {
                                return e.start < t.start ? -1 : e.start > t.start ? 1 : 0
                            }), t.chapters.forEach(function(e, t) {
                                return e.index = t
                            })
                        }), o
                    }
                }, {
                    key: "playToChapter",
                    value: function(e) {
                        var t = this;
                        this.clip && this.clip.destroy();
                        var i = void 0 !== e.index ? this.chapters[e.index] : this.getChapterWithName(e.name);
                        if (i) {
                            this.currentChapter = i;
                            var r = void 0 !== e.duration ? e.duration : this.getDurationToChapter(i),
                                n = void 0 !== e.timeScale ? e.timeScale : 1,
                                o = void 0 !== e.ease ? e.ease : "linear",
                                s = new l(this, r * n, {
                                    _time: i.start
                                }, {
                                    destroyOnComplete: !0,
                                    ease: o,
                                    onUpdate: function() {
                                        t.timeGroup.time(t._time)
                                    }
                                });
                            s.play()
                        }
                    }
                }, {
                    key: "playToNextChapter",
                    value: function() {
                        var e = this.chapters.indexOf(this.currentChapter),
                            t = e + 1;
                        t >= this.chapters.length && (t = 0), this.playToChapter({
                            index: t
                        })
                    }
                }, {
                    key: "playToPreviousChapter",
                    value: function() {
                        var e = this.chapters.indexOf(this.currentChapter),
                            t = e - 1;
                        t < 0 && (t = this.chapters.length - 1), this.playToChapter({
                            index: t
                        })
                    }
                }, {
                    key: "getChapterWithName",
                    value: function(e) {
                        for (var t = 0, i = this.chapters.length; t < i; t++)
                            if (this.chapters[t].name === e) return this.chapters[t];
                        return null
                    }
                }, {
                    key: "getChapterAtIndex",
                    value: function(e) {
                        return this.chapters[e]
                    }
                }, {
                    key: "getDurationToChapter",
                    value: function(e) {
                        var t = this.timeGroup.time(),
                            i = e.start;
                        return Math.abs(t - i);
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function(e) {}
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {}
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {}
                }, {
                    key: "now",
                    get: function() {
                        return this.timeGroup.time()
                    }
                }]), t
            }(a),
            h = function() {
                function e(t, i, n) {
                    r(this, e), this.name = t, this.index = 0, this.keyframe = n, this.position = i
                }
                return s(e, [{
                    key: "start",
                    get: function() {
                        return this.keyframe.start
                    }
                }]), e
            }();
        t.exports = u
    }, {
        "@marcom/ac-eclipse/src/clips/ClipEasing": 99,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    331: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/anim-system"),
            c = e("./ChipGridGL"),
            u = e("@marcom/ac-raf-emitter/update"),
            h = function(e) {
                function t(e) {
                    return r(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = this,
                            t = function(t) {
                                return e.el.querySelector(t)
                            },
                            i = function(t) {
                                return Array.from(e.el.querySelectorAll(t))
                            };
                        u(function() {
                            var r = (l.getGroupForTarget(e.el), l.createTimeGroup(t(".chip"))),
                                n = 0;
                            r.addKeyframe(t(".chip-background"), {
                                start: .01,
                                toggle: !0,
                                cssClass: "show"
                            }), r.addKeyframe(t(".chip-headline"), {
                                start: .05,
                                toggle: !0,
                                cssClass: "show"
                            });
                            var o = i(".chip [data-order]");
                            o.forEach(function(e) {
                                var t = parseFloat(e.getAttribute("data-order")),
                                    i = t + " * 0.1 + 0.6";
                                r.addKeyframe(e, {
                                    start: i,
                                    end: i + " + 0.2",
                                    ease: 1,
                                    easeFunction: "easeInQuad",
                                    opacity: [0, 1]
                                })
                            }), i(".column [data-order]").forEach(function(e) {
                                var t = parseFloat(e.getAttribute("data-order"));
                                n = t + " * 0.15 + 0.5", r.addKeyframe(e, {
                                    start: n,
                                    toggle: !0,
                                    cssClass: "show"
                                })
                            }), r.addKeyframe(t(".chip-background-glow"), {
                                start: 1.45,
                                end: 3,
                                ease: 1,
                                opacity: [0, 1]
                            }), r.addKeyframe(t(".chip-headline-background-shadow"), {
                                start: 3.25,
                                end: 3.5,
                                ease: 1,
                                opacity: [0, 1],
                                easeFunction: "easeInQuad"
                            }), e.addKeyframe({
                                toggle: !0,
                                start: "-100vh",
                                end: "0px",
                                cssClass: "instant-hide",
                                relativeTo: ".chip-details-container"
                            }), e.addDiscreteEvent({
                                start: "0px",
                                relativeTo: ".chip-details-container",
                                eventName: "play",
                                onEvent: function() {
                                    r.play(0)
                                },
                                onEventReverse: function() {
                                    r.progress(0), r.pause(0), r.forceUpdate()
                                }
                            })
                        })
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return c.IS_SUPPORTED()
                    }
                }]), t
            }(a);
        t.exports = h
    }, {
        "./ChipGridGL": 332,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/anim-system": 237,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    332: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/anim-system"),
            l = e("@marcom/anim-system/Model/AnimSystemModel"),
            c = e("@marcom/bubble-gum/BaseComponent"),
            u = e("./Object3DAnimProxy"),
            h = e("../../shared/helpers/THREELoader"),
            m = e("@marcom/data-attribute-to-json"),
            p = {
                measure: e("@marcom/ac-raf-emitter/update"),
                mutate: e("@marcom/ac-raf-emitter/draw")
            },
            d = e("../../shared/helpers/waitframes"),
            f = {
                FRONT: 1,
                MIDDLE: 0,
                BACK: -.05
            },
            y = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i.renderer = null, i.timeline = a.createTimeGroup(), i.timeline.name = "Hardware To Grid Timeline", i.timeline.timeScale(1), i.retinaScale = window.devicePixelRatio > 1 ? 2 : 1, i._threeHasLoaded = !1, i._imagesHaveLoaded = !1, i.isWaitingToResize = !1, i.resizeTimeout = -1, i.recreateScene = i.recreateScene.bind(i), i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = this;
                        this.config = m({
                            element: this.el,
                            attribute: "data-chip-grid-config",
                            defaultOptions: {
                                screenImage1: null,
                                screenImage2: null,
                                gridImage1: null,
                                assetContainer: null
                            }
                        });
                        var t = this.anim.getControllerForTarget(this.el.parentElement.parentElement);
                        t.once("ProgressiveImageLoad:enter", function() {
                            e.el.parentElement.querySelector(e.config.assetContainer).classList.remove("progressive-image"), e._imagesHaveLoaded = !0, p.mutate(function() {
                                return e.setupScene()
                            })
                        }), h.add(function() {
                            return e.onThreeJSReady()
                        })
                    }
                }, {
                    key: "onThreeJSReady",
                    value: function() {
                        var e = this;
                        this._threeHasLoaded = !0, THREE.ImageUtils.crossOrigin = "", this.textureLoader = new THREE.TextureLoader, this.textureLoader.setCrossOrigin(""), this.progressKeyframe = this.addContinuousEvent({
                            el: this.el.parentElement,
                            start: "0%",
                            end: "100% - 120vh",
                            progress: [0, 1],
                            ease: 1,
                            onDraw: function(t) {
                                e.timeline.hasDuration() && e.timeline.progress(t.tweenProps.progress.current)
                            }
                        }), this.anim.getGroupForTarget(this.el).metrics.add(this.el), this.timeline.rafEmitter.on("draw", function() {
                            e.scene && (e.scene.visible = e.timeline.progress() > 0, e.bloomPass.threshold = e.params.bloomThreshold, e.bloomPass.strength = e.params.bloomStrength, e.bloomPass.radius = e.params.bloomRadius, e.renderer.toneMappingExposure = e.params.exposure, e.renderer.toneMappingWhitePoint = e.params.whitePoint, e.bloomPass.strength < .1 ? e.renderer.render(e.scene, e.camera) : e.composer.render(.1))
                        }), this.removableItems = [], this.setupScene()
                    }
                }, {
                    key: "setupScene",
                    value: function() {
                        var e = this;
                        if (this._imagesHaveLoaded && this._threeHasLoaded) {
                            var t = this.anim.getGroupForTarget(this.el).metrics.get(this.el);
                            this.camera = this.camera || new THREE.PerspectiveCamera(100, t.width / t.height, 1, 2e4), this.makeCameraPixelPerfect(), this.scene || (this.scene = new THREE.Scene), this.root || (this.root = new THREE.Object3D, this.scene.add(this.root));
                            var i = new u(new THREE.Mesh(new THREE.PlaneBufferGeometry(t.width, t.height, 2, 2), new THREE.MeshBasicMaterial({
                                color: 0
                            })), "topBar");
                            i.z = f.FRONT, this.root.add(i.object), this.removableItems.push(i);
                            var r = new u(new THREE.Mesh(new THREE.PlaneBufferGeometry(t.width, t.height, 2, 2), new THREE.MeshBasicMaterial({
                                color: 0
                            })), "bottomBar");
                            r.z = f.FRONT, this.root.add(r.object), this.removableItems.push(r);
                            var n = .5,
                                o = this.timeline,
                                s = this.screenContainer = new u(new THREE.Group, "screenContainer");
                            s.z = 0, this.root.add(s.object), this.removableItems.push(s);
                            var a = this.getBackgroundImage(this.config.screenImage1, !0);
                            this.textureLoader.load(a.url, function(t) {
                                t.generateMipmaps = !1, t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping, t.minFilter = THREE.LinearFilter;
                                var i = t.image.naturalWidth * (e.retinaScale / 2),
                                    r = t.image.naturalHeight * (e.retinaScale / 2);
                                s.userData.width = i, s.userData.height = r;
                                var a = new THREE.MeshBasicMaterial({
                                        map: t,
                                        transparent: !0
                                    }),
                                    l = new u(new THREE.Mesh(new THREE.PlaneBufferGeometry(i, r, 2, 2), a), "screen1");
                                e.removableItems.push(l), o.addKeyframe(l, {
                                    start: 0,
                                    end: .1,
                                    opacity: [0, 1],
                                    ease: 1,
                                    easeFunction: "easeInQuad"
                                }), o.addKeyframe(s, {
                                    start: .1,
                                    end: 1.1,
                                    scale: [1 / e.retinaScale, "100vw / 85%w"],
                                    ease: .5,
                                    easeFunction: "easeInOutQuad"
                                }), o.addKeyframe(s, {
                                    start: .1,
                                    end: 1.1,
                                    y: [0, e.getImageZoomOffset() + " * 100vw / 85%w"],
                                    ease: .5,
                                    easeFunction: "easeInOutQuad"
                                }), o.addKeyframe(s, {
                                    start: 1.1,
                                    end: 4.9,
                                    y: [null, "40% * 100vw / 80%w"],
                                    ease: n
                                }), o.addKeyframe(s, {
                                    start: 4.9,
                                    end: 5.1,
                                    y: [null, "45% * 100vw / 80%w"],
                                    ease: n
                                }), o.addKeyframe(l, {
                                    start: 1.4,
                                    end: 1.41,
                                    opacity: [null, 0],
                                    ease: 1,
                                    easeFunction: "easeInQuad"
                                }), e.forceUpdate(), s.object.add(l.object);
                                var c = e.getBackgroundImage(e.config.screenImage2, !0);
                                e.textureLoader.load(c.url, function(t) {
                                    t.generateMipmaps = !1, t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping, t.minFilter = THREE.LinearFilter;
                                    var i = t.image.naturalWidth * (e.retinaScale / 2),
                                        r = t.image.naturalHeight * (e.retinaScale / 2),
                                        a = new THREE.MeshBasicMaterial({
                                            map: t,
                                            transparent: !0
                                        }),
                                        l = new u(new THREE.Mesh(new THREE.PlaneBufferGeometry(i, r, 2, 2), a), "screen2");
                                    s.object.add(l.object), e.removableItems.push(l), o.addKeyframe(s, {
                                        start: 1.1,
                                        end: 1.5,
                                        scale: [null, "(100vw / (" + i + "*0.85))"],
                                        ease: n
                                    }), o.addKeyframe(l, {
                                        start: 1.1,
                                        end: 1.4,
                                        y: [0, 0],
                                        opacity: [0, 1],
                                        ease: 1,
                                        easeFunction: "linear"
                                    }), e.forceUpdate(), s.object.add(l.object)
                                })
                            });
                            var c = this.getBackgroundImage(this.config.gridImage1);
                            this.textureLoader.load(c.url, function(t) {
                                var i = t.image.naturalWidth,
                                    r = t.image.naturalHeight,
                                    n = new THREE.Group;
                                n.userData.width = i, n.userData.height = r;
                                var s = new u(n, "gridContainer");
                                s.z = 0, e.removableItems.push(s), t.anisotropy = e.renderer.getMaxAnisotropy();
                                var a = window.devicePixelRatio > 1 ? .5 : 1,
                                    l = (e.getGridOffset(), new THREE.MeshBasicMaterial({
                                        map: t,
                                        transparent: !0,
                                        side: THREE.DoubleSide,
                                        depthTest: !1
                                    })),
                                    c = new u(new THREE.Mesh(new THREE.PlaneBufferGeometry(i, r, 16, 16), l), "grid");
                                e.removableItems.push(c), s.object.add(c.object), o.addKeyframe(c, {
                                    start: 6,
                                    end: 6.25,
                                    easeFunction: "easeInQuad",
                                    y: [Math.round(.5 * r), Math.round(.5 * r)],
                                    ease: 1
                                }), o.addKeyframe(c, {
                                    start: 4.74,
                                    end: 4.75,
                                    opacity: [0, 1],
                                    ease: 1
                                }), o.addKeyframe(c, {
                                    start: 6,
                                    end: 6.25,
                                    opacity: [1, .5],
                                    ease: 1
                                }), s.rotationX = -90;
                                var h = o.addKeyframe(s, {
                                        start: 4.75,
                                        end: 6,
                                        ease: .75,
                                        scale: ["50vw / 30%w", a],
                                        rotationX: [-90, 0],
                                        easeFunction: "easeInOutQuad"
                                    }),
                                    m = o.expressionParser.parseExpression(h, "-50% * " + a + " + 25vh") + e.getGridOffset();
                                o.addKeyframe(s, {
                                    start: 5,
                                    end: 6,
                                    ease: .75,
                                    y: [0, Math.round(m)],
                                    easeFunction: "[0.250, 0.250, 0.600, 0.950]"
                                }), e.forceUpdate(), e.root.add(s.object)
                            });
                            var h = ["100%", "(50% + 15)"];
                            o.addKeyframe(i, {
                                start: 0,
                                end: 1,
                                easeFunction: "easeInOutCubic",
                                y: h,
                                ease: n
                            }), o.addKeyframe(r, {
                                start: 0,
                                end: 1,
                                easeFunction: "easeInOutCubic",
                                y: h.map(function(e) {
                                    return e + " * -1"
                                }),
                                ease: n
                            }), o.addKeyframe(i, {
                                start: 1,
                                end: 2,
                                easeFunction: "easeOutCubic",
                                y: ["(50% + 15)", "(50% + 2)"],
                                ease: n
                            }), o.addKeyframe(r, {
                                start: 1,
                                end: 2,
                                easeFunction: "easeOutCubic",
                                y: ["(50% + 15) * -1", "(50% + 1) * -1"],
                                ease: n
                            });
                            var m = this.getBackgroundImage(this.config.textOverlay);
                            this.textureLoader.load(m.url, function(t) {
                                var i = t.image.naturalWidth,
                                    r = t.image.naturalHeight,
                                    n = new THREE.MeshBasicMaterial({
                                        map: t,
                                        transparent: !0
                                    }),
                                    s = new u(new THREE.Mesh(new THREE.PlaneBufferGeometry(i, r, 2, 2), n), "text-overlay");
                                e.root.add(s.object), e.removableItems.push(s);
                                var a = e.getTextOverlayTiming();
                                o.addKeyframe(s, {
                                    start: a.start - .1,
                                    end: a.start - .099,
                                    opacity: [0, 1],
                                    ease: 1
                                });
                                var c = .7,
                                    h = a.manifestoMetrics.height + " / " + 100 * c + "%",
                                    m = a.manifestoMetrics.width + " / 75%w",
                                    p = r * (a.manifestoMetrics.height / (r * c)),
                                    d = (p - r) / 2.1;
                                o.addKeyframe(s, {
                                    start: a.start,
                                    end: a.end,
                                    x: ["-3% * " + m, "-3% * " + m],
                                    y: ["-100vh + " + d + "px", "50% + " + d + "px"],
                                    scaleY: [h, h],
                                    scaleX: [m, m],
                                    z: [f.FRONT, f.FRONT],
                                    ease: 1,
                                    easeFunction: "linear",
                                    breakpointMask: "L"
                                }), "S" !== l.pageMetrics.breakpoint && "M" !== l.pageMetrics.breakpoint || (c = 1, h = a.manifestoMetrics.height + " / " + 100 * c + "%", p = r * (a.manifestoMetrics.height / (r * c))), o.addKeyframe(s, {
                                    start: a.start,
                                    end: a.end,
                                    x: [0, 0],
                                    y: ["-50vh - 25%", "50vh - 25%"],
                                    scaleY: [h, h],
                                    scaleX: [m, m],
                                    z: [f.FRONT, f.FRONT],
                                    ease: 1,
                                    easeFunction: "linear",
                                    breakpointMask: "SM"
                                }), o.addKeyframe(s, {
                                    start: a.end + .05,
                                    end: a.end + .051,
                                    opacity: [1, 0],
                                    ease: 1
                                }), e.forceUpdate()
                            }), o.addKeyframe(i, {
                                start: 5,
                                end: 5.3,
                                y: [null, "(50% + 2)"],
                                ease: .5,
                                snapAtCreation: !0
                            }), o.addKeyframe(r, {
                                start: 5,
                                end: 5.3,
                                easeFunction: "linear",
                                y: [null, "-45%"],
                                ease: n,
                                snapAtCreation: !0
                            }), this.renderer || (this.renderer = new THREE.WebGLRenderer({
                                antialias: !0,
                                alpha: !0
                            }), this.renderer.toneMapping = THREE.LinearToneMapping), this.renderer.setSize(t.width, t.height), this.renderer.setPixelRatio(this.retinaScale);
                            var p = new u(this.camera, "camera");
                            o.addKeyframe(p, {
                                start: 4.75,
                                end: 5.5,
                                y: [0, "25vh"],
                                easeFunction: "easeInOutSin",
                                ease: .75,
                                snapAtCreation: !0
                            }), this.initPostprocessing(this.scene, this.camera), o.addKeyframe(this.params, {
                                start: .8,
                                end: 1.5,
                                ease: .35,
                                bloomThreshold: [0, .25],
                                bloomStrength: [0, 2],
                                bloomRadius: [0, .3]
                            }), o.addKeyframe(this.params, {
                                start: 1.5,
                                end: 2,
                                ease: .75,
                                exposure: [1, 1]
                            }), o.addKeyframe(this.params, {
                                start: 4.7,
                                end: 5.1,
                                ease: .75,
                                bloomThreshold: [null, 0],
                                bloomStrength: [null, 0],
                                bloomRadius: [null, 0],
                                exposure: [null, 1]
                            }), this.forceUpdate(), this.renderer.domElement.parentElement || this.el.appendChild(this.renderer.domElement)
                        }
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {
                        this.renderer && !this.isWaitingToResize && (this.isWaitingToResize = !0, clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(this.recreateScene, 1e3))
                    }
                }, {
                    key: "recreateScene",
                    value: function() {
                        var e = this;
                        d(1).then(function() {
                            e.timeline.keyframeControllers.forEach(function(e) {
                                e.remove()
                            }), d(3).then(function() {
                                e.timeline.metrics.destroy(), e.timeline.metrics._symbols = [], e.timeline.metrics._lut = {}, e.timeline.metrics.add(e.timeline.element), e.removableItems.forEach(function(e) {
                                    return e.destroy()
                                }), e.removableItems = [], d(2).then(function() {
                                    e.setupScene(), e.isWaitingToResize = !1
                                })
                            })
                        })
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {}
                }, {
                    key: "initPostprocessing",
                    value: function(e, t) {
                        this.params || (this.params = {
                            friendlyName: "bloomFilter",
                            projection: "normal",
                            background: !1,
                            exposure: 1,
                            bloomThreshold: .1,
                            bloomStrength: 2.8,
                            bloomRadius: .5,
                            whitePoint: 1
                        }), this.composer || (this.composer = new THREE.EffectComposer(this.renderer)), this.renderPass || (this.renderPass = new THREE.RenderPass(this.scene, this.camera), this.composer.addPass(this.renderPass));
                        var i = this.anim.getGroupForTarget(this.el).metrics.get(this.el),
                            r = i.width,
                            n = i.height;
                        this.bloomPass || (this.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(r, n), this.params.bloomStrength, this.params.bloomRadius, this.params.bloomThreshold), this.bloomPass.renderToScreen = !0, this.composer.addPass(this.bloomPass)), this.composer.setSize(r, n)
                    }
                }, {
                    key: "makeCameraPixelPerfect",
                    value: function() {
                        var e = this.anim.getGroupForTarget(this.el).metrics.get(this.el);
                        this.camera.aspect = e.width / e.height;
                        var t = this.camera.fov,
                            i = t * (Math.PI / 180);
                        this.camera.position.z = e.height / (2 * Math.tan(i / 2)), this.camera.updateProjectionMatrix()
                    }
                }, {
                    key: "getBackgroundImage",
                    value: function(e, t) {
                        var i = document.querySelector(e),
                            r = getComputedStyle(i),
                            n = r.backgroundImage.match(/url\("?(.*?)"?\)/i)[1];
                        if (!n.includes("_2x") && t) {
                            var o = n.split(/(\.png|\.jpg)/);
                            n = o[0] + "_2x" + o[1]
                        }
                        var s = r.width,
                            a = r.height;
                        return {
                            url: n,
                            width: parseFloat(s),
                            height: parseFloat(a)
                        }
                    }
                }, {
                    key: "getGridOffset",
                    value: function() {
                        var e = l.pageMetrics.breakpoint;
                        switch (e) {
                            case "L":
                                return 14;
                            case "M":
                                return 80;
                            case "S":
                                return 86;
                            default:
                                return null
                        }
                    }
                }, {
                    key: "getImageZoomOffset",
                    value: function() {
                        var e = l.pageMetrics.breakpoint,
                            t = this.retinaScale > 1;
                        switch (e) {
                            case "L":
                                return t ? 280 : 120;
                            case "M":
                                return t ? 210 : 105;
                            case "S":
                                return t ? 125 : 120;
                            default:
                                return null
                        }
                    }
                }, {
                    key: "forceUpdate",
                    value: function() {
                        this.timeline.forceUpdate({
                            recalculateActiveKeyframes: !0,
                            waitForNextUpdate: !1
                        });
                        var e = this.progressKeyframe.controller.tweenProps.progress.current;
                        this.timeline.progress(e)
                    }
                }, {
                    key: "getTextOverlayTiming",
                    value: function() {
                        var e = 6.25,
                            t = this.getManifestoMetrics(),
                            i = this.anim.getGroupForTarget(this.manifestorWrapperEl),
                            r = l.pageMetrics.windowHeight,
                            n = l.pageMetrics.windowHeight / 2;
                        t.top -= r, t.bottom -= .75 * n;
                        var o = i.convertTValueToScrollPosition(this.progressKeyframe.start),
                            s = i.convertTValueToScrollPosition(this.progressKeyframe.end),
                            a = s - o,
                            c = (t.top - o) / a,
                            u = (t.bottom - o) / a,
                            h = c * e,
                            m = u * e;
                        return {
                            manifestoMetrics: t,
                            scrollDuration: a,
                            start: h,
                            end: m
                        }
                    }
                }, {
                    key: "getManifestoMetrics",
                    value: function() {
                        return this.manifestorWrapperEl || (this.manifestorWrapperEl = this.el.parentElement.parentElement.querySelector(".manifesto-wrapper"), this.anim.getGroupForTarget(this.manifestorWrapperEl).metrics.add(this.manifestorWrapperEl)), Object.assign({}, this.anim.getGroupForTarget(this.manifestorWrapperEl).metrics.get(this.manifestorWrapperEl))
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList.contains("static-interaction"),
                            t = document.documentElement.classList.contains("no-webgl"),
                            i = document.documentElement.classList.contains("reduced-motion");
                        return !(e || t || i)
                    }
                }]), t
            }(c);
        t.exports = y
    }, {
        "../../shared/helpers/THREELoader": 355,
        "../../shared/helpers/waitframes": 356,
        "./Object3DAnimProxy": 333,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/anim-system": 237,
        "@marcom/anim-system/Model/AnimSystemModel": 242,
        "@marcom/bubble-gum/BaseComponent": 257,
        "@marcom/data-attribute-to-json": 260
    }],
    333: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = Math.PI / 180,
            s = 180 / Math.PI,
            a = function() {
                function e(t, i) {
                    var n = this;
                    r(this, e), this.object = t, this.friendlyName = i, this.boundingBox = new THREE.Box3, Object.defineProperties(this, {
                        x: {
                            get: function() {
                                return t.position.x
                            },
                            set: function(e) {
                                return t.position.x = e
                            }
                        },
                        y: {
                            get: function() {
                                return t.position.y
                            },
                            set: function(e) {
                                return t.position.y = e
                            }
                        },
                        z: {
                            get: function() {
                                return t.position.z
                            },
                            set: function(e) {
                                return t.position.z = e
                            }
                        },
                        rotationX: {
                            get: function() {
                                return t.rotation.x * s
                            },
                            set: function(e) {
                                return t.rotation.x = e * o
                            }
                        },
                        rotationY: {
                            get: function() {
                                return t.rotation.y * s
                            },
                            set: function(e) {
                                return t.rotation.y = e * o
                            }
                        },
                        rotationZ: {
                            get: function() {
                                return t.rotation.z * s
                            },
                            set: function(e) {
                                return t.rotation.z = e * o
                            }
                        },
                        scaleX: {
                            get: function() {
                                return t.scale.x
                            },
                            set: function(e) {
                                t.scale.x = e
                            }
                        },
                        scaleY: {
                            get: function() {
                                return t.scale.y
                            },
                            set: function(e) {
                                return t.scale.y = e
                            }
                        },
                        scaleZ: {
                            get: function() {
                                return t.scale.z
                            },
                            set: function(e) {
                                return t.scale.z = e
                            }
                        },
                        scale: {
                            get: function() {
                                return t.scale.x
                            },
                            set: function(e) {
                                t.scale.x = t.scale.y = e
                            }
                        },
                        width: {
                            get: function() {
                                if (t.userData.width) return t.userData.width;
                                if (t.geometry) return t.geometry.parameters.width;
                                var e = t.scale.x,
                                    i = n.boundingBox.setFromObject(n.object).getSize().x;
                                return i / e
                            }
                        },
                        height: {
                            get: function() {
                                if (t.userData.height) return t.userData.height;
                                if (t.geometry) return t.geometry.parameters.height;
                                var e = t.scale.y,
                                    i = n.boundingBox.setFromObject(n.object).getSize().y;
                                return i / e
                            }
                        },
                        opacity: {
                            get: function() {
                                return t.material.opacity
                            },
                            set: function(e) {
                                t.material.opacity = e, e <= 0 ? t.visible = !1 : !t.visible && t.material.opacity > 0 && (t.visible = !0)
                            }
                        },
                        userData: {
                            get: function() {
                                return t.userData
                            }
                        }
                    })
                }
                return n(e, [{
                    key: "destroy",
                    value: function() {
                        this.object.material && this.object.material.dispose(), this.object.geometry && this.object.geometry.dispose(), this.object.parent && this.object.parent.remove(this.object), this.object.userData = null, this.object = null, this.boundingBox = null
                    }
                }]), e
            }();
        t.exports = a
    }, {}],
    334: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var r = t[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, i, r) {
                return i && e(t.prototype, i), r && e(t, r), t
            }
        }();
        try {
            var a = e("@marcom/ac-analytics").observer.Event
        } catch (l) {}
        var c = e("@marcom/bubble-gum/BaseComponent"),
            u = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._productLists = [document.getElementById("product-list-1"), document.getElementById("product-list-2")], i._productHeadlines = [document.querySelector("#product-headline-1"), document.querySelector("#product-headline-2")], i._productSelectors = [document.querySelector("#product-selector-1"), document.querySelector("#product-selector-2")], i._selectorDropdowns = [document.querySelector("#product-selector-1 .selector-dropdown"), document.querySelector("#product-selector-2 .selector-dropdown")], i._productsNewLength = i._selectorDropdowns[0].querySelectorAll("option").length, i
                }
                return o(t, e), s(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return !0
                    }
                }]), s(t, [{
                    key: "mounted",
                    value: function() {
                        this._initialize()
                    }
                }, {
                    key: "_initialize",
                    value: function() {
                        this._setProductSelector(), this._setEvents(), this._initializeCustomAnalytics()
                    }
                }, {
                    key: "_setProductSelector",
                    value: function() {
                        this._productsNewLength <= 1 ? (this._productHeadlines[0].style.display = "block", this._productSelectors[1].style.display = "block") : (this._productSelectors[0].style.display = "block", this._productSelectors[1].style.display = "block")
                    }
                }, {
                    key: "_setEvents",
                    value: function() {
                        var e = this;
                        this._selectorDropdowns.forEach(function(t, i) {
                            t.addEventListener("change", function(t) {
                                e._onProductSelectorChange(t, i)
                            }, !1)
                        })
                    }
                }, {
                    key: "_onProductSelectorChange",
                    value: function(e, t) {
                        var i = e.currentTarget.value,
                            r = t;
                        this._updateProductSelector(i, t), this._updateProductHardware(i, r);
                        var n = this._getAnalyticsString();
                        this._triggerAnalyticsEvent(n)
                    }
                }, {
                    key: "_updateProductSelector",
                    value: function(e, t) {
                        var i = this._selectorDropdowns[t].querySelectorAll("option");
                        i.forEach(function(t) {
                            t.value === e ? t.setAttribute("selected", "") : t.removeAttribute("selected")
                        })
                    }
                }, {
                    key: "_updateProductHardware",
                    value: function(e, t) {
                        var i = this._productLists[t].querySelectorAll(".product-image");
                        i.forEach(function(t) {
                            t.classList.remove("current"), t.classList.contains(e) && t.classList.add("current")
                        })
                    }
                }, {
                    key: "_getAnalyticsString",
                    value: function() {
                        var e = this._selectorDropdowns[0].querySelector("option:checked").value,
                            t = this._selectorDropdowns[1].querySelector("option:checked").value,
                            i = e + " | " + t;
                        return i
                    }
                }, {
                    key: "_initializeCustomAnalytics",
                    value: function() {
                        this.analyticsOptions = {
                            interactionEvents: ["custom-event"]
                        }, new a(this, this.analyticsOptions)
                    }
                }, {
                    key: "_triggerAnalyticsEvent",
                    value: function(e) {
                        this.trigger("custom-event", {
                            eVar79: e,
                            title: "combi-selector"
                        })
                    }
                }]), t
            }(c);
        t.exports = u
    }, {
        "@marcom/ac-analytics": void 0,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    335: [function(e, t, i) {
        "use strict";

        function r(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function a(e) {
            for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) i[r - 1] = arguments[r];
            return Object.assign.apply(Object, [{}, e].concat(i))
        }
        var l = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            c = e("@marcom/bubble-gum/BaseComponent"),
            u = e("@marcom/ac-image-to-canvas-grid"),
            h = e("@marcom/ac-feature/cssPropertyAvailable"),
            m = e("@marcom/ac-feature/canvasAvailable"),
            p = e("@marcom/ac-feature/prefersReducedMotion"),
            d = e("@marcom/ac-raf-emitter/update"),
            f = e("@marcom/ac-raf-emitter/draw"),
            y = e("@marcom/ac-gallery").FadeGallery,
            _ = e("@marcom/ac-gpu-reporter").GPUReporter,
            g = e("@marcom/useragent-detect"),
            v = e("@marcom/ac-feature/isTablet"),
            b = e("@marcom/viewport-emitter/ViewportEmitter"),
            E = new b("compare-viewport-emitter"),
            w = e("@marcom/anim-system/Model/AnimSystemModel"),
            S = new _,
            T = S.getGPU(),
            C = "enhanced",
            P = "ready",
            O = 750,
            x = {
                relativeTo: ".section-display .sticky-container",
                ease: 1,
                snapAtCreation: !0
            },
            A = a(x, {
                relativeTo: ".section-display .manifesto-wrapper"
            }),
            k = a(x, {
                start: "105vh",
                end: "175vh"
            }),
            I = a(x, {
                start: "175vh",
                end: "175vh + 1px",
                ease: .15
            }),
            M = .07,
            D = .001,
            R = .999,
            F = function(e) {
                function t(e) {
                    n(this, t);
                    var i = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    i.scrollGroup = i.anim.getGroupForTarget(i.el), i.keyframes = [], i.metrics = {}, i.isFlipped = i.el.hasAttribute("data-display-animation-flipped"), i.elements = {
                        manifestoWrapper: i.el.querySelector(".manifesto-wrapper"),
                        stickyContainer: i.el.querySelector(".sticky-container"),
                        scalingHardware: i.el.querySelector(".scaling-hardware-image"),
                        slidingHardware: i.el.querySelector(".sliding-hardware"),
                        headline: i.el.querySelector(".compare-header-headline"),
                        gallery: document.getElementById("display-compare-gallery"),
                        tabnav: i.el.querySelector(".tabnav"),
                        leftPhone: i.el.querySelector(".hardware-iphonexsmax .hardware-anim-container"),
                        leftPhoneImage: i.el.querySelector(".hardware-iphonexsmax .hardware-image"),
                        leftPhoneLabel: i.el.querySelector(".hardware-iphonexsmax .hardware-label"),
                        leftPhoneBadge: i.el.querySelector(".hardware-iphonexsmax .hardware-badge"),
                        rightPhone: i.el.querySelector(".hardware-iphonexs .hardware-anim-container"),
                        rightPhoneImage: i.el.querySelector(".hardware-iphonexs .hardware-image"),
                        rightPhoneLabel: i.el.querySelector(".hardware-iphonexs .hardware-label"),
                        rightPhoneBadge: i.el.querySelector(".hardware-iphonexs .hardware-badge"),
                        photoPreviewScreens: i.el.querySelectorAll(".photo-preview")
                    };
                    var r = function(e, t) {
                        t.addEventListener("focus", function(t) {
                            if (i[e] && !["mouse", "touch"].includes(t.target.getAttribute("data-focus-method"))) {
                                var r = window.scrollTo.bind(null, 0, i[e]);
                                g.browser.safari ? setTimeout(r, 100) : r()
                            }
                        })
                    };
                    return [i.elements.leftPhoneBadge, i.elements.rightPhoneBadge].concat(Array.from(i.elements.leftPhoneBadge.getElementsByTagName("a"))).concat(Array.from(i.elements.rightPhoneBadge.getElementsByTagName("a"))).forEach(r.bind(i, "slideScrollY")), r("comparisonScrollY", i.elements.stickyContainer), i._canvasGridTargetElement = i.elements.scalingHardware, E.on("change:viewport", function(e) {
                        i.isEnhanced && (i.updateViewport(), i.updateMetrics().then(function() {
                            i.updateKeyframes()
                        }), f(function() {
                            i._canvasGridTargetElement.style.background = null, i._canvasGrid && (i._canvasGridTargetElement.removeChild(i._canvasGrid), i._canvasGrid = null), i.convertImgToCanvas()
                        }))
                    }), i.updateExperienceForHeight(), i
                }
                return s(t, e), l(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = "Apple A7 GPU" === T || "Apple A8 GPU" === T || g.os.ios && g.os.version.major <= 10 || g.os.android && v();
                        return !e && !p() && h("position", "sticky") && m()
                    }
                }]), l(t, [{
                    key: "enhance",
                    value: function() {
                        var e = this;
                        this.isEnhanced || (this.isEnhanced = !0, f(function() {
                            e.el.classList.add(C), e.gallery = new y(e.elements.gallery, {
                                tabNavPaddles: !1
                            }), e.updateViewport(), e.updateMetrics().then(function() {
                                e.updateKeyframes()
                            })
                        }))
                    }
                }, {
                    key: "diminish",
                    value: function() {
                        var e = this;
                        this.isEnhanced && (this.isEnhanced = !1, f(function() {
                            e.el.classList.remove(C), e.gallery && e.gallery.destroy(), e.removeAllKeyframes()
                        }))
                    }
                }, {
                    key: "updateExperienceForHeight",
                    value: function() {
                        w.pageMetrics.windowHeight >= 600 ? this.enhance() : this.diminish()
                    }
                }, {
                    key: "mounted",
                    value: function() {
                        var e = this;
                        this.convertImgToCanvas(), setTimeout(function() {
                            e.el.classList.add(P)
                        }, O), this.addKeyframe(this.el, {
                            start: "-125vh",
                            end: "100%",
                            cssClass: "activated",
                            toggle: !0,
                            snapAtCreation: !0,
                            _preventStorage: !0
                        })
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function() {
                        this.updateExperienceForHeight()
                    }
                }, {
                    key: "updateKeyframes",
                    value: function() {
                        var e = this;
                        this.removeAllKeyframes();
                        var t = this.metrics.galleryWidth / 2,
                            i = this.metrics.hardwareSpacing2up / 2,
                            n = this.metrics.hardwareSpacing3up,
                            o = t + n,
                            s = this.metrics.leftPhoneImageHeight,
                            l = 100;
                        this.addKeyframe(this.elements.scalingHardware, a(A, {
                            start: "100rh - 100vh",
                            end: "100rh + 5vh",
                            style: {
                                on: {
                                    display: "block"
                                },
                                off: {
                                    display: "none"
                                }
                            }
                        })), this.addKeyframe(this.elements.scalingHardware, a(A, {
                            start: "100rh - 90vh",
                            end: "100rh - 30vh",
                            y: ["(100vh - " + s + ") / 2 + " + s + " + " + l, 0],
                            easeFunction: "easeOutSin",
                            ease: .7
                        })), this.addKeyframe(this.elements.scalingHardware, a(A, {
                            start: "100rh - 80vh",
                            end: "100rh",
                            scale: [1, this.metrics.scaleFactor],
                            easeFunction: "linear"
                        })), this.addKeyframe(this.elements.slidingHardware, a(A, {
                            start: "100rh - 1vh",
                            end: "100rh",
                            opacity: [D, R],
                            easeFunction: "easeOutSin",
                            ease: .7
                        })), this.addKeyframe(this.elements.scalingHardware, a(A, {
                            start: "100rh",
                            end: "100rh + 5vh",
                            ease: 1,
                            opacity: [R, D]
                        }));
                        var c = "50%w + " + i,
                            u = "-50%w - " + i;
                        if ("small" !== this.viewport) this.slideKeyframe = this.addKeyframe(this.elements.leftPhone, a(k, {
                            x: [this.isFlipped ? u : c, i]
                        })), this.addKeyframe(this.elements.rightPhone, a(k, {
                            x: [this.isFlipped ? c : u, i]
                        })), [this.elements.leftPhoneBadge, this.elements.rightPhoneBadge].forEach(function(t, r) {
                            var n = e.isFlipped ? 1 === r : 0 === r,
                                o = "large" === e.viewport ? 100 : 60,
                                s = e.metrics.phoneImageWidthDifference / 2,
                                l = n ? o - s : -o - s / 2;
                            e.addKeyframe(t, a(k, {
                                start: "105vh",
                                end: "105vh + 1px",
                                opacity: [0, 1],
                                ease: M
                            })), e.addKeyframe(t, a(k, {
                                x: [l, e.isFlipped ? 2 * i : 0],
                                y: ["-50%", "-50%"]
                            }))
                        });
                        else {
                            var h = {
                                start: "110vh",
                                end: "110vh + 1px",
                                ease: M
                            };
                            this.addKeyframe(this.elements.leftPhone, a(k, h, {
                                start: "101vh",
                                end: "103vh",
                                ease: .25,
                                x: [this.isFlipped ? u : c, null]
                            })), this.slideKeyframe = this.addKeyframe(this.elements.leftPhone, a(k, h, {
                                x: [this.isFlipped ? u : c, 0]
                            })), this.addKeyframe(this.elements.rightPhone, a(k, h, {
                                start: "101vh",
                                end: "103vh",
                                ease: .25,
                                x: [this.isFlipped ? c : u, null]
                            })), this.addKeyframe(this.elements.rightPhone, a(k, h, {
                                x: [this.isFlipped ? c : u, 0]
                            })), [this.elements.leftPhoneBadge, this.elements.rightPhoneBadge].forEach(function(t, i) {
                                e.addKeyframe(t, a(k, h, {
                                    y: [20, 0],
                                    opacity: [0, 1]
                                }))
                            })
                        }
                        if (this.headlineKeyframe = null, "small" !== this.viewport) {
                            this.headlineKeyframe = this.addKeyframe(this.elements.headline, a(I, {
                                y: [-20, 0],
                                opacity: [D, R],
                                ease: M
                            })), this.addKeyframe(this.elements.leftPhoneLabel, a(I, {
                                x: [this.isFlipped ? -32 : 60, 0],
                                opacity: [D, R],
                                ease: M
                            })), this.addKeyframe(this.elements.rightPhoneLabel, a(I, {
                                x: [this.isFlipped ? 60 : -32, 0],
                                opacity: [D, R],
                                ease: M
                            })), this.addKeyframe(this.elements.leftPhoneBadge, a(I, {
                                opacity: [R, D],
                                ease: M
                            })), this.addKeyframe(this.elements.rightPhoneBadge, a(I, {
                                opacity: [R, D],
                                ease: M
                            })), [this.elements.tabnav].concat(r(this.elements.photoPreviewScreens)).forEach(function(t) {
                                e.addKeyframe(t, a(I, {
                                    opacity: [D, R]
                                }))
                            });
                            var m = "" + (o - i),
                                p = "-" + (o - i);
                            this.addKeyframe(this.elements.leftPhoneImage, a(I, {
                                x: [this.isFlipped ? p : m, -i],
                                ease: M,
                                easeFunction: "easeOutSin"
                            })), this.addKeyframe(this.elements.rightPhoneImage, a(I, {
                                x: [this.isFlipped ? m : p, -i],
                                ease: M,
                                easeFunction: "easeOutSin"
                            })), this.addKeyframe(this.elements.gallery, a(I, {
                                opacity: [D, R],
                                scale: [.9, 1]
                            }))
                        }
                        f(function() {
                            e.slideScrollY = e.slideKeyframe ? Math.floor(e.scrollGroup.convertTValueToScrollPosition(e.slideKeyframe.end)) : null, e.comparisonScrollY = e.headlineKeyframe ? Math.ceil(e.scrollGroup.convertTValueToScrollPosition(e.headlineKeyframe.end)) : null
                        })
                    }
                }, {
                    key: "addKeyframe",
                    value: function(e, t) {
                        var i = this.anim.addKeyframe(e, t);
                        return t._preventStorage || this.keyframes.push(i), i
                    }
                }, {
                    key: "removeAllKeyframes",
                    value: function() {
                        this.keyframes.forEach(function(e) {
                            return e.remove()
                        })
                    }
                }, {
                    key: "updateViewport",
                    value: function() {
                        this.viewport = E.viewport, "xlarge" !== this.viewport && "medium-large" !== this.viewport || (this.viewport = "large"), "xsmall" === this.viewport && (this.viewport = "small")
                    }
                }, {
                    key: "updateMetrics",
                    value: function() {
                        var e = this;
                        return new Promise(function(t, i) {
                            d(function() {
                                var i = window.getComputedStyle(e.el);
                                e.metrics.hardwareSpacing2up = parseFloat(i.getPropertyValue("--hardware-spacing-2up")), e.metrics.hardwareSpacing3up = parseFloat(i.getPropertyValue("--hardware-spacing-3up")), e.metrics.scaleFactor = parseFloat(i.getPropertyValue("--hardware-scale-factor")), e.metrics.galleryWidth = e.elements.gallery.offsetWidth, e.metrics.leftPhoneImageHeight = e.elements.leftPhoneImage.offsetHeight, e.metrics.leftPhoneImageWidth = e.elements.leftPhoneImage.offsetWidth,
                                    e.metrics.rightPhoneImageWidth = e.elements.rightPhoneImage.offsetWidth, e.metrics.phoneImageWidthDifference = e.metrics.leftPhoneImageWidth - e.metrics.rightPhoneImageWidth, e.anim.forceUpdate(), t()
                            })
                        })
                    }
                }, {
                    key: "convertImgToCanvas",
                    value: function() {
                        var e = this;
                        d(function() {
                            var t = e._canvasGridTargetElement,
                                i = "emit-event" === t.getAttribute("data-progressive-image");
                            if (i) {
                                var r = function n() {
                                    t.removeEventListener("progressive-image:loaded", n), e._createCanvasGrid()
                                };
                                t.addEventListener("progressive-image:loaded", r)
                            } else e._createCanvasGrid()
                        })
                    }
                }, {
                    key: "_createCanvasGrid",
                    value: function() {
                        var e = this,
                            t = 3,
                            i = 2;
                        return u(this._canvasGridTargetElement, {
                            rows: t,
                            columns: i,
                            retina: E.retina
                        }).then(function(t) {
                            return new Promise(function(i, r) {
                                t.classList.add("canvas-wrapper"), e._canvasGrid = t, f(function() {
                                    e._canvasGridTargetElement.style.background = "none", e._canvasGridTargetElement.appendChild(t), i()
                                })
                            })
                        })
                    }
                }]), t
            }(c);
        if (!F.IS_SUPPORTED()) {
            var L = document.querySelector(".section-display");
            L && setTimeout(function() {
                L.classList.add(P)
            }, O)
        }
        t.exports = F
    }, {
        "@marcom/ac-feature/canvasAvailable": 122,
        "@marcom/ac-feature/cssPropertyAvailable": 126,
        "@marcom/ac-feature/isTablet": 134,
        "@marcom/ac-feature/prefersReducedMotion": 138,
        "@marcom/ac-gallery": 149,
        "@marcom/ac-gpu-reporter": 166,
        "@marcom/ac-image-to-canvas-grid": 171,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/anim-system/Model/AnimSystemModel": 242,
        "@marcom/bubble-gum/BaseComponent": 257,
        "@marcom/useragent-detect": 284,
        "@marcom/viewport-emitter/ViewportEmitter": 285
    }],
    336: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/ac-raf-emitter/update"),
            c = e("@marcom/ac-raf-emitter/draw"),
            u = function(e) {
                function t() {
                    return r(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = this;
                        this.dropdown = this.el.querySelector("select"), this.elementCache = {}, c(function() {
                            e.dropdown.disabled = !1
                        }), this.dropdown.value && this.setCurrentElement(this.dropdown.value), this.dropdown.addEventListener("change", function(t) {
                            e.setCurrentElement(t.target.value)
                        })
                    }
                }, {
                    key: "setCurrentElement",
                    value: function(e) {
                        var t = this;
                        l(function() {
                            var i = t.elementCache[e] = t.elementCache[e] || document.getElementById(e);
                            c(function() {
                                t.currentElement && t.currentElement.classList.remove("current"), i.classList.add("current"), t.currentElement = i
                            })
                        })
                    }
                }]), t
            }(a);
        t.exports = u
    }, {
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    337: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("./FaceIdUnlockSequence/SpriteSheetPlayer"),
            c = e("@marcom/ac-feature/prefersReducedMotion"),
            u = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._player = {}, i._frame = i.el.querySelector(".sprite-sequence"), i._loadMetrics = {
                        event: "",
                        controller: {}
                    }, i._state = {
                        reducedMotion: c()
                    }, i
                }
                return o(t, e), s(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return document.documentElement.classList.contains("sprite-sheet-player")
                    }
                }]), s(t, [{
                    key: "mounted",
                    value: function() {
                        this._player = new l({
                            canvas: document.getElementById("unlockAnimation"),
                            ctrlPanel: this.el.parentNode.querySelector(".inline-video-controls-panel")
                        }), this._setupAnimLoad(), this._setupAnimPlay()
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        var t = this._player;
                        t.state.loaded && t.reload()
                    }
                }, {
                    key: "_setupAnimLoad",
                    value: function(e) {
                        var t = this,
                            i = this._player,
                            r = i.state,
                            n = {
                                start: "-250vh + 50%",
                                end: "50% + 150vh",
                                event: "sprite-animation-load"
                            };
                        e = Object.assign({}, n, e);
                        var o = this.addDiscreteEvent(e);
                        this._loadMetrics.event = e.event;
                        var s = this._loadMetrics.controller = o.controller;
                        s.once(e.event + ":enter", function() {
                            r.loaded || r.loading || i.load().then(function(e) {
                                t._state.reducedMotion && (t._frame.classList.remove("frame-active"), t._player.gotoEnd())
                            }, function(e) {})
                        })
                    }
                }, {
                    key: "_setupAnimPlay",
                    value: function(e) {
                        var t = this._player,
                            i = this._frame,
                            r = {
                                start: "-100vh + 50%",
                                end: "50%",
                                event: "sprite-animation-play"
                            };
                        e = Object.assign({}, r, e);
                        var n = this.addDiscreteEvent(e);
                        this._state.reducedMotion || n.controller.once(e.event + ":enter", function() {
                            t.state.loaded ? (i.classList.remove("frame-active"), t.play()) : t.load().then(function() {
                                i.classList.remove("frame-active"), t.play()
                            }, function(e) {})
                        })
                    }
                }]), t
            }(a);
        t.exports = u
    }, {
        "./FaceIdUnlockSequence/SpriteSheetPlayer": 338,
        "@marcom/ac-feature/prefersReducedMotion": 138,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    338: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            o = e("@marcom/asset-source/AssetSource"),
            s = e("@marcom/viewport-emitter"),
            a = e("@marcom/ac-raf-emitter/RAFEmitter"),
            l = function() {
                function e(t) {
                    var i = this;
                    r(this, e), t = Object.assign({}, t);
                    var n = t.canvas,
                        o = t.ctrlPanel;
                    this._el = {
                        canvas: t.canvas,
                        ctrlPanel: o || null,
                        btnReplay: o ? o.querySelector(".inline-video-controls-replay") : null
                    }, this._rafEmitter = new a, this._spriteSheet = new Image, this._ctx = n.getContext("2d"), this._animationMetrics = {
                        frameData: {},
                        frameWidth: 0,
                        frameHeight: 0,
                        frameIndex: 0,
                        tickCount: 0,
                        totalFrames: 0
                    }, this._promise = {
                        load: null
                    }, this._state = {
                        loading: !1,
                        loaded: !1
                    }, this._onDraw = this._onDraw.bind(this), this._setSpriteCanvasFrameSize = this._setSpriteCanvasFrameSize.bind(this), this.play = this.play.bind(this), this.replay = this.replay.bind(this), this.gotoStart = this.gotoStart.bind(this), this.gotoEnd = this.gotoEnd.bind(this), this._el.btnReplay.addEventListener("click", this.replay), n.addEventListener("click", function() {
                        i._animationMetrics.frameIndex = 0
                    })
                }
                return n(e, [{
                    key: "load",
                    value: function() {
                        var e = this;
                        if (this._state.loading || this._state.loaded) return this._promise.load;
                        this._state.loading = !0;
                        var t = [this._getFrameData(), this._getSpriteSheet()];
                        return this._promise.load = Promise.all(t).then(function(t) {
                            var i = t[0],
                                r = ("string" == typeof t[0] ? JSON.parse(i) : i).frames,
                                n = t[1];
                            return new Promise(function(t, i) {
                                e._initAnimationMetrics(r);
                                var o = function s() {
                                    e._spriteSheet.removeEventListener("load", s), t(e._spriteSheet)
                                };
                                e._spriteSheet.addEventListener("load", o), e._spriteSheet.src = n
                            })
                        }, function(e) {}).then(this._setSpriteCanvasFrameSize).then(function() {
                            e._state.loading = !1, e._state.loaded = !0
                        }).then(this.gotoStart)
                    }
                }, {
                    key: "reload",
                    value: function() {
                        var e = this;
                        return this._state.loading = !1, this._state.loaded = !1, this.load().then(function() {
                            e._goToEndFrame()
                        })
                    }
                }, {
                    key: "play",
                    value: function() {
                        this._rafEmitter.on("draw", this._onDraw), this._rafEmitter.run()
                    }
                }, {
                    key: "replay",
                    value: function() {
                        this._el.btnReplay.setAttribute("disabled", ""), this._animationMetrics.frameIndex = 0, this.play()
                    }
                }, {
                    key: "gotoStart",
                    value: function() {
                        this._goToStartFrame()
                    }
                }, {
                    key: "gotoEnd",
                    value: function() {
                        this._goToEndFrame(), this._el.btnReplay.removeAttribute("disabled")
                    }
                }, {
                    key: "_onDraw",
                    value: function() {
                        var e = this._animationMetrics,
                            t = e.totalFrames - 1;
                        this._update(), this._render(), e.frameIndex < t ? this._rafEmitter.run() : (this._rafEmitter.off("draw", this._onDraw), this._el.btnReplay.removeAttribute("disabled"))
                    }
                }, {
                    key: "_getFrameData",
                    value: function() {
                        var e = new o({
                            path: "/iphone-xs/2018/674b340a-40f1-4156-bbea-00f386459d3c/face-id/",
                            name: "unlock",
                            viewport: o.convertViewportName(s.viewport),
                            resolution: o.convertToResolution(s.retina),
                            format: "json",
                            xhr: {
                                responseType: "json"
                            }
                        });
                        return e.load()
                    }
                }, {
                    key: "_convertFrameDataToArray",
                    value: function(e) {
                        var t = [];
                        return Object.keys(e).forEach(function(i) {
                            t.push(e[i])
                        }), t
                    }
                }, {
                    key: "_initAnimationMetrics",
                    value: function(e) {
                        var t = this._convertFrameDataToArray(e),
                            i = t.length,
                            r = t[0].sourceSize;
                        this._animationMetrics.frameData = t, this._animationMetrics.frameWidth = r.w, this._animationMetrics.frameHeight = r.h, this._animationMetrics.totalFrames = i
                    }
                }, {
                    key: "_getSpriteSheet",
                    value: function() {
                        var e = new o({
                            path: "https://www.apple.com/iphone-xs/2018/674b340a-40f1-4156-bbea-00f386459d3c/face-id/",
                            name: "unlock",
                            viewport: o.convertViewportName(s.viewport),
                            resolution: o.convertToResolution(s.retina),
                            format: "png"
                        });
                        return e.load()
                    }
                }, {
                    key: "_setSpriteCanvasFrameSize",
                    value: function() {
                        var e = this,
                            t = this._el.canvas,
                            i = this._animationMetrics,
                            r = s.retina,
                            n = r ? .5 : 1;
                        return new Promise(function(r, o) {
                            e._rafEmitter.once("draw", function() {
                                var e = t.width = i.frameWidth,
                                    o = t.height = i.frameHeight;
                                t.style.width = Math.round(e * n) + "px", t.style.height = Math.round(o * n) + "px", r()
                            }), e._rafEmitter.run()
                        })
                    }
                }, {
                    key: "_update",
                    value: function() {
                        var e = this._animationMetrics,
                            t = e.totalFrames - 1;
                        e.frameIndex < t ? this._animationMetrics.frameIndex += 1 : this._animationMetrics.frameIndex = t
                    }
                }, {
                    key: "_render",
                    value: function(e) {
                        var t = this._animationMetrics;
                        e = e || t.frameIndex;
                        var i = this._ctx,
                            r = this._el.canvas,
                            n = t.frameData[e];
                        i.clearRect(0, 0, r.width, r.height), i.drawImage(this._spriteSheet, n.frame.x, n.frame.y, n.frame.w, n.frame.h, n.spriteSourceSize.x, n.spriteSourceSize.y, n.frame.w, n.frame.h)
                    }
                }, {
                    key: "_goToStartFrame",
                    value: function() {
                        var e = 0;
                        this._render(e)
                    }
                }, {
                    key: "_goToEndFrame",
                    value: function() {
                        var e = this._animationMetrics.totalFrames - 1;
                        this._render(e)
                    }
                }, {
                    key: "state",
                    get: function() {
                        return this._state
                    }
                }]), e
            }();
        t.exports = l
    }, {
        "@marcom/ac-raf-emitter/RAFEmitter": 206,
        "@marcom/asset-source/AssetSource": 254,
        "@marcom/viewport-emitter": 286
    }],
    339: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function d(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : d(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("@marcom/ac-modal-basic").Modal,
            c = e("@marcom/dom-metrics").getPagePosition,
            u = e("@marcom/dom-metrics").getScrollPosition,
            h = e("@marcom/ac-raf-emitter/update"),
            m = e("@marcom/ac-raf-emitter/draw"),
            p = function(e) {
                function t(e, i) {
                    return r(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                }
                return o(t, e), s(t, [{
                    key: "updateExitPagePosition",
                    value: function(e) {
                        var t = this;
                        h(function() {
                            var i = c(e),
                                r = u(e);
                            t._scrollX = r.x, t._scrollY = i.top
                        })
                    }
                }, {
                    key: "_restoreScrollPosition",
                    value: function() {
                        var e = this;
                        m(function() {
                            a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_restoreScrollPosition", e).call(e)
                        })
                    }
                }]), t
            }(l);
        t.exports = p
    }, {
        "@marcom/ac-modal-basic": 178,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/dom-metrics": 263
    }],
    340: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/ac-gallery").FadeGallery,
            l = function(e) {
                function t(e, i) {
                    return r(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i))
                }
                return o(t, e), s(t, [{
                    key: "_onKeyboardInteraction",
                    value: function(e, t) {
                        e.call(null, {
                            interactionEvent: t
                        })
                    }
                }]), t
            }(a);
        t.exports = l
    }, {
        "@marcom/ac-gallery": 149
    }],
    341: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/ac-raf-emitter/update"),
            c = e("@marcom/ac-raf-emitter/draw"),
            u = e("./FadeGalleryOverrideExtend"),
            h = e("./VideoGalleryFadeItem"),
            m = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._fadeGallery = {
                        instance: {},
                        items: []
                    }, i._state = {
                        breakpoint: e.pageMetrics.breakpoint,
                        videoIsSupported: h.isSupported()
                    }, i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        this._initFadeGallery()
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {
                        "S" === e.breakpoint && this.setGalleryHeight()
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        var t = this;
                        this._state.breakpoint = e.breakpoint, this._state.videoIsSupported && this.setGalleryHeight().then(function() {
                            var i = [];
                            return t._fadeGallery.items.forEach(function(t) {
                                var r = t.video,
                                    n = void 0;
                                r.source.change("viewport", e.breakpoint), t.isShown && t.isInView ? r.frames.activate("start").then(function() {
                                    n = r.load()["catch"](function() {}), i.push(n)
                                }) : (n = r.load(), i.push(n))
                            }), Promise.all[i]
                        })["catch"](function() {})
                    }
                }, {
                    key: "_initFadeGallery",
                    value: function() {
                        var e = this._state.videoIsSupported,
                            t = {
                                resizeContainer: !0,
                                touch: !0,
                                enableArrowKeys: !1
                            };
                        e && (t.itemType = h), this._fadeGallery.instance = new u(this.el, t), this._fadeGallery.items = this._fadeGallery.instance.getItems(), e && (this._setupGalleryEvents(), this._setupAnimVideoLoad())
                    }
                }, {
                    key: "_calcProperGalleryHeight",
                    value: function() {
                        var e = this._fadeGallery.items,
                            t = 0;
                        return e.forEach(function(e) {
                            var i = e.getElement().querySelector(".slide-height-wrapper").clientHeight;
                            t = i > t ? i : t
                        }), t
                    }
                }, {
                    key: "setGalleryHeight",
                    value: function() {
                        var e = this;
                        return new Promise(function(t, i) {
                            l(function() {
                                var i = e._calcProperGalleryHeight() + "px";
                                c(function() {
                                    e.el.style.height = i, t()
                                })
                            })
                        })
                    }
                }, {
                    key: "_setupGalleryEvents",
                    value: function() {
                        this._onGalleryUpdateComplete = this._onGalleryUpdateComplete.bind(this), this._fadeGallery.instance.on(u.UPDATE_COMPLETE, this._onGalleryUpdateComplete)
                    }
                }, {
                    key: "_onGalleryUpdateComplete",
                    value: function(e) {
                        var t = e.incoming[0].video,
                            i = t.state,
                            r = e.outgoing[0].video,
                            n = r.state;
                        n.loaded && n.hasPlayed && r.reset(), i.loaded ? t.play()["catch"](function() {}) : t.load().then(function() {
                            t.play()["catch"](function() {})
                        }, function(e) {})
                    }
                }, {
                    key: "_setupAnimVideoLoad",
                    value: function() {
                        var e = this;
                        this._fadeGallery.items.forEach(function(t) {
                            var i = t.video,
                                r = i.state,
                                n = {
                                    start: "-250vh + 50%",
                                    end: "50% + 150vh",
                                    event: "inline-video-load",
                                    relativeTo: ".section-gestures"
                                },
                                o = e.addDiscreteEvent(n);
                            o.controller.once(n.event + ":enter", function() {
                                r.loaded || r.loading || i.load()["catch"](function() {})
                            })
                        })
                    }
                }, {
                    key: "galleryInstance",
                    get: function() {
                        return this._fadeGallery.instance
                    }
                }, {
                    key: "state",
                    get: function() {
                        return this._state
                    }
                }]), t
            }(a);
        t.exports = m
    }, {
        "./FadeGalleryOverrideExtend": 340,
        "./VideoGalleryFadeItem": 343,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    342: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("./BasicModal"),
            c = e("@marcom/ac-accessibility/CircularTab"),
            u = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                        o = i.el;
                    return i._el = {
                        btnOpen: o.querySelector("#btn-modal-open"),
                        content: o.querySelector("#gestures-modal-content")
                    }, i._modal = {}, i._circularTab = null, i._onModalOpen = i._onModalOpen.bind(i), i._onModalClose = i._onModalClose.bind(i), i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        this._initModal(), this._setupModalEvents()
                    }
                }, {
                    key: "_initModal",
                    value: function() {
                        var e = this._el,
                            t = document.createElement("div"),
                            i = document.createElement("div");
                        t.classList.add("modal-content-table"), i.classList.add("modal-content-cell"), i.appendChild(e.content), t.appendChild(i);
                        var r = {
                                retainScrollPosition: !0
                            },
                            n = {
                                classNames: {
                                    modalElement: "gestures-modal"
                                },
                                contentElement: t,
                                closeButton: !1
                            };
                        this._modal = new l(r, n), this._renderModal(), this._circularTab || (this._circularTab = new c(e.content)), this.trigger("modal:initialized")
                    }
                }, {
                    key: "_renderModal",
                    value: function() {
                        var e = this._modal;
                        e.render();
                        var t = e.renderer.modalElement,
                            i = t.firstChild,
                            r = i.firstChild;
                        t.setAttribute("data-modal-close", ""), i.setAttribute("data-modal-close", ""), r.setAttribute("data-modal-close", ""), this._el.content.classList.remove("hide-modal-content")
                    }
                }, {
                    key: "_setFocusToOpenBtn",
                    value: function() {
                        this._el.btnOpen.focus()
                    }
                }, {
                    key: "_onModalOpen",
                    value: function() {
                        this._circularTab.start()
                    }
                }, {
                    key: "_onModalClose",
                    value: function() {
                        this._circularTab.stop(), this._setFocusToOpenBtn()
                    }
                }, {
                    key: "_setupModalEvents",
                    value: function() {
                        var e = this._modal;
                        e.on("open", this._onModalOpen), e.on("close", this._onModalClose), this._el.btnOpen.addEventListener("click", function() {
                            e.open()
                        })
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        this._modal.opened && this._modal.updateExitPagePosition(this.el)
                    }
                }, {
                    key: "modalInstance",
                    get: function() {
                        return this._modal
                    }
                }]), t
            }(a);
        t.exports = u
    }, {
        "./BasicModal": 339,
        "@marcom/ac-accessibility/CircularTab": 1,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    343: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/ac-gallery").FadeGalleryItem,
            l = e("@marcom/inline-video/InlineVideo"),
            c = e("@marcom/viewport-emitter"),
            u = function(e) {
                function t() {
                    r(this, t);
                    var e = n(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)),
                        i = t.isSupported();
                    return e._state = {
                        isSupported: i
                    }, e._video = {}, i && (e._video = new l(e._el, {
                        path: "https://www.apple.com/iphone-xs/2018/674b340a-40f1-4156-bbea-00f386459d3c/display/",
                        viewport: l.convertViewportName(c.viewport),
                        resolution: l.convertToResolution(c.retina)
                    }), e._video.initialize()), e
                }
                return o(t, e), s(t, null, [{
                    key: "isSupported",
                    value: function() {
                        return document.documentElement.classList.contains("inline-video")
                    }
                }]), s(t, [{
                    key: "video",
                    get: function() {
                        return this._video
                    }
                }, {
                    key: "isShown",
                    get: function() {
                        return this._isShown
                    }
                }, {
                    key: "isSupported",
                    get: function() {
                        return this._state.isSupported
                    }
                }]), t
            }(a);
        t.exports = u
    }, {
        "@marcom/ac-gallery": 149,
        "@marcom/inline-video/InlineVideo": 277,
        "@marcom/viewport-emitter": 286
    }],
    344: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._components = {
                        modal: {},
                        gallery: {}
                    }, i._onModalOpen = i._onModalOpen.bind(i), i._onModalClose = i._onModalClose.bind(i), i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = this;
                        this._components.gallery = this.gum.getComponentOfType("GesturesGallery", this.el);
                        var t = this.el.querySelector('[data-component-list="GesturesModal"]'),
                            i = this._components.modal = this.gum.getComponentOfType("GesturesModal", t);
                        i.once("modal:initialized", function() {
                            var t = i.modalInstance;
                            t.on("open", e._onModalOpen), t.on("close", e._onModalClose)
                        })
                    }
                }, {
                    key: "_onModalOpen",
                    value: function() {
                        var e = this._components.gallery.galleryInstance;
                        this._setGalleryAccessibilityFocus(e), this._activateGallery(e)
                    }
                }, {
                    key: "_onModalClose",
                    value: function() {
                        var e = this._components.gallery.galleryInstance;
                        this._deactivateGallery(e)
                    }
                }, {
                    key: "_setGalleryAccessibilityFocus",
                    value: function(e) {
                        var t = e.getTabNav().tabnav,
                            i = t.el.querySelector(".current");
                        i.focus()
                    }
                }, {
                    key: "_activateGallery",
                    value: function(e) {
                        var t = this._components.gallery;
                        e.enableKeyboard(), t.setGalleryHeight().then(function() {
                            if (t.state.videoIsSupported) {
                                var i = e.getCurrentItem();
                                i.video.play()["catch"](function() {})
                            }
                        })["catch"]()
                    }
                }, {
                    key: "_deactivateGallery",
                    value: function(e) {
                        if (e.disableKeyboard(), this._components.gallery.state.videoIsSupported) {
                            var t = e.getCurrentItem();
                            t.video.reset()["catch"](function() {})
                        }
                    }
                }]), t
            }(a);
        t.exports = l
    }, {
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    345: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/inline-video/Video"),
            c = e("@marcom/viewport-emitter"),
            u = e("@marcom/ac-raf-emitter/draw"),
            h = "video-loaded",
            m = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._pageMetrics = e.pageMetrics, i.videoLoaded = !1, i.addContinuousEvent({
                        relativeTo: ".section-cameras .copy-container",
                        start: "67rh",
                        end: "78rh",
                        event: "video-progress",
                        progress: [0, 1],
                        onDraw: function(e) {
                            i.video && i.videoLoaded && i.video.el.duration && (i.video.el.currentTime = i.video.el.duration * e.tweenProps.progress.current)
                        }
                    }), i
                }
                return o(t, e), s(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList;
                        return e.contains("sticky") && !e.contains("reduced-motion") && !e.contains("aow")
                    }
                }]), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = this;
                        this.video = new l(this.el, {
                            path: "https://www.apple.com/iphone-xs/2018/674b340a-40f1-4156-bbea-00f386459d3c/overview/",
                            viewport: l.convertViewportName(this._pageMetrics.breakpoint),
                            resolution: l.convertToResolution(c.retina)
                        }), this.video.initialize(), this.video.load().then(function() {
                            e.setVideoLoaded()
                        })
                    }
                }, {
                    key: "setVideoLoaded",
                    value: function() {
                        var e = this;
                        this.videoLoaded || (this.videoLoaded = !0, u(function() {
                            e.el.classList.add(h)
                        }))
                    }
                }, {
                    key: "setVideoUnloaded",
                    value: function() {
                        var e = this;
                        this.videoLoaded && (this.videoLoaded = !1, this.video.source.abortLoad(), this.video = null, u(function() {
                            e.el.classList.remove(h)
                        }))
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        var t = l.convertViewportName(e.breakpoint);
                        l.convertViewportName(e.previousBreakpoint);
                        this.video.source.change("viewport", t)
                    }
                }]), t
            }(a);
        t.exports = m
    }, {
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/bubble-gum/BaseComponent": 257,
        "@marcom/inline-video/Video": 278,
        "@marcom/viewport-emitter": 286
    }],
    346: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/ac-image-to-canvas-grid"),
            c = e("@marcom/viewport-emitter"),
            u = e("@marcom/ac-raf-emitter/update"),
            h = e("@marcom/ac-raf-emitter/draw"),
            m = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._target = i.el.querySelector(".device-hardware"), i._canvasGrid = null, i
                }
                return o(t, e), s(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return document.documentElement.classList.contains("faceid-enhanced")
                    }
                }]), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = this,
                            t = function i() {
                                e._target.removeEventListener("progressive-image:loaded", i), e.createCanvas()
                            };
                        this._target.addEventListener("progressive-image:loaded", t)
                    }
                }, {
                    key: "createCanvas",
                    value: function() {
                        var e = this,
                            t = 2,
                            i = 1;
                        return l(this._target, {
                            rows: t,
                            columns: i,
                            retina: c.retina
                        }).then(function(t) {
                            return new Promise(function(i, r) {
                                t.classList.add("canvas-wrapper"), e._canvasGrid = t, h(function() {
                                    e._target.style.background = "none", e._target.appendChild(t), i()
                                })
                            })
                        })
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function(e) {
                        var t = this;
                        h(function() {
                            t.el.style.opacity = 0
                        })
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {
                        var t = this;
                        h(function() {
                            t.el.style.opacity = null
                        })
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        var t = this;
                        u(function() {
                            var e = !t._target.hasAttribute("data-progressive-image");
                            h(function() {
                                t._canvasGrid && (t._target.style.background = null, t._target.removeChild(t._canvasGrid), t._canvasGrid = null), !t._canvasGrid && e && t.createCanvas()
                            })
                        })
                    }
                }]), t
            }(a);
        t.exports = m
    }, {
        "@marcom/ac-image-to-canvas-grid": 171,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/bubble-gum/BaseComponent": 257,
        "@marcom/viewport-emitter": 286
    }],
    347: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function u(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : u(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            l = e("../../shared/components/BaseInlineVideo"),
            c = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._videoEvtController = null, i
                }
                return o(t, e), a(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList;
                        return e.contains("inline-video") && !e.contains("reduced-motion")
                    }
                }]), a(t, [{
                    key: "mounted",
                    value: function() {
                        var e = document.querySelector(".faceid-device-zoom");
                        this._videoEvtController = e._animInfo.controller, s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "mounted", this).call(this)
                    }
                }, {
                    key: "_setupAnimLoad",
                    value: function() {
                        var e = this._video,
                            t = e.state;
                        this._videoEvtController.once("inline-video-load:enter", function() {
                            t.loaded || t.loading || e.load()["catch"](function() {})
                        })
                    }
                }, {
                    key: "_setupAnimPlay",
                    value: function() {
                        var e = this._video;
                        this._videoEvtController.once("inline-video-play:enter", function() {
                            e.state.loaded ? e.play()["catch"](function() {}) : e.load().then(function() {
                                e.play()["catch"](function() {})
                            }, function(e) {})
                        })
                    }
                }]), t
            }(l);
        t.exports = c
    }, {
        "../../shared/components/BaseInlineVideo": 354
    }],
    348: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/inline-video/Video"),
            c = e("@marcom/ac-raf-emitter/draw"),
            u = (e("@marcom/ac-feature/isHandheld")(), e("@marcom/viewport-emitter/ViewportEmitter")),
            h = new u,
            m = null;
        try {
            m = e("@marcom/ac-analytics")
        } catch (p) {}
        var d = {
                failInt: 1e3,
                forceVideoFail: !1
            },
            f = function(e) {
                function t(e) {
                    return r(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                }
                return o(t, e), s(t, [{
                    key: "passiveExperienceTracker",
                    value: function(e) {
                        !this.experienceHasTracked && m && m.passiveTracker && (this.experienceHasTracked = !0, m.passiveTracker({
                            eVar70: e
                        }))
                    }
                }, {
                    key: "tryPlayVideo",
                    value: function(e, t) {
                        var i = this;
                        e = e || function() {}, t = t || function() {};
                        var r = this.el.querySelector("video[data-source-name]").parentNode.parentNode;
                        this._video = new l(r, {
                            path: "https://www.apple.com/iphone-xs/2018/674b340a-40f1-4156-bbea-00f386459d3c/overview/hero/",
                            viewport: "xlarge" === h.viewport ? "large" : h.viewport,
                            resolution: h.retina ? "2x" : "1x",
                            xhr: {
                                timeout: d.failInt
                            }
                        }), this._video.initialize(), d.forceVideoFail ? setTimeout(function() {
                            t({
                                type: "forced"
                            })
                        }, d.failInt) : this._video.load().then(function() {
                            e(i._video)
                        }, t)
                    }
                }, {
                    key: "mounted",
                    value: function() {
                        var e = this;
                        this.showing = "fallback", this.stillWaiting = !0, this.videoEle = this.el.querySelector("video"), this.waitTimer = setTimeout(function() {
                            e.stillWaiting = !1
                        }, d.failInt), this.setScrollEvent(), this.tryPlayVideo(function(t) {
                            c(function() {
                                c(function() {
                                    e.el.classList.add("video-animation-playback"), e.el.classList.add("og-viewport-" + h.viewport), e.setEndedEvent(), t.play().then(function() {
                                        e.stillWaiting = !1, e.showing = "video", e.passiveExperienceTracker("hero-animation-videoplayback")
                                    }, function() {
                                        e.el.classList.remove("video-animation-playback"), e.playAnimation({
                                            type: "novideosupport"
                                        })
                                    })
                                })
                            })
                        }, function(t) {
                            e.playAnimation(t)
                        })
                    }
                }, {
                    key: "playAnimation",
                    value: function(e) {
                        var t = this;
                        this.stillWaiting = !1, this.showing = "animation", "timeout" === e.type ? this.passiveExperienceTracker("hero-animation-cssplayback-timeout") : this.passiveExperienceTracker("hero-animation-cssplayback-novideosupport"), c(function() {
                            t.el.classList.add("css-animation-playback")
                        })
                    }
                }, {
                    key: "setScrollEvent",
                    value: function() {
                        this.__cancelWaitOnScrollBound || (this.__cancelWaitOnScrollBound = this.cancelWaitOnScroll.bind(this), window.addEventListener("scroll", this.__cancelWaitOnScrollBound))
                    }
                }, {
                    key: "unsetScrollEvent",
                    value: function() {
                        this.__cancelWaitOnScrollBound && window.removeEventListener("scroll", this.__cancelWaitOnScrollBound)
                    }
                }, {
                    key: "setEndedEvent",
                    value: function() {
                        this.__setEndedClassOnVideoEnd || (this.__setEndedClassOnVideoEnd = this.setEndedClassOnVideoEnd.bind(this), this.videoEle.addEventListener("ended", this.__setEndedClassOnVideoEnd))
                    }
                }, {
                    key: "unsetEndedEvent",
                    value: function() {
                        this.__setEndedClassOnVideoEnd && this.videoEle.removeEventListener("ended", this.__setEndedClassOnVideoEnd)
                    }
                }, {
                    key: "setEndedClassOnVideoEnd",
                    value: function() {
                        var e = this;
                        c(function() {
                            e.el.classList.add("video-animation-ended")
                        }), this.unsetEndedEvent(), this.unsetScrollEvent()
                    }
                }, {
                    key: "cancelWaitOnScroll",
                    value: function() {
                        this.stillWaiting && (this.unsetScrollEvent(), this._video.source.request.xhr.abort(), this.passiveExperienceTracker("hero-animation-cssplayback-scroll")), clearTimeout(this.waitTimer)
                    }
                }, {
                    key: "onResizeImmediate",
                    value: function(e) {}
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {}
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        var t = this;
                        "video" === this.showing && this._video.source.request.xhr.abort(), c(function() {
                            t.el.classList.add("css-animation-playback"), t.el.classList.remove("video-animation-playback"), t.el.classList.add("css-animation-remove-transitions"), t.el.classList.remove("video-animation-ended")
                        })
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList;
                        return !(e.contains("reduced-motion") || e.contains("aow"))
                    }
                }]), t
            }(a);
        t.exports = f
    }, {
        "@marcom/ac-analytics": void 0,
        "@marcom/ac-feature/isHandheld": 132,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/bubble-gum/BaseComponent": 257,
        "@marcom/inline-video/Video": 278,
        "@marcom/viewport-emitter/ViewportEmitter": 285
    }],
    349: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = 150,
            c = 130,
            u = .9,
            h = .71,
            m = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i.breakpoint = e.pageMetrics.breakpoint, i.viewportHeight = e.pageMetrics.windowHeight, i.containerEl = i.el.querySelector(".true-depth-content"), i.stickyEl = i.el.querySelector(".true-depth-hardware-container .sticky-item"), i.deviceEl = i.el.querySelector(".true-depth-hardware-container .image-hardware-back"), i.copyEl = i.el.querySelector(".true-depth-copy-content"), i.copyFrontEl = i.copyEl.querySelector(".front"), i
                }
                return o(t, e), s(t, [{
                    key: "mounted",
                    value: function() {
                        this.setCopyPadding(this.viewportHeight)
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {
                        this.viewportHeight !== e.windowHeight && (this.viewportHeight = e.windowHeight, this.setCopyPadding())
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        var t = this.breakpoint !== e.breakpoint || this.viewportHeight !== e.windowHeight;
                        this.breakpoint !== e.breakpoint && (this.breakpoint = e.breakpoint), this.viewportHeight !== e.windowHeight && (this.viewportHeight = e.windowHeight), t && this.setCopyPadding()
                    }
                }, {
                    key: "setCopyPadding",
                    value: function() {
                        var e = this.deviceEl.offsetHeight * h,
                            t = Math.min(e, this.viewportHeight),
                            i = t - this.copyFrontEl.offsetHeight - l / 2 - c,
                            r = Math.abs(e - this.viewportHeight),
                            n = e > t ? i : i + r,
                            o = "M" === this.breakpoint && e * u < this.viewportHeight,
                            s = c + "px",
                            a = void 0,
                            m = void 0;
                        e < this.viewportHeight && "L" === this.breakpoint ? (s = r + "px", a = this.viewportHeight - r + "px", m = n - r + "px") : o ? (a = e + l + "px", m = e - this.copyFrontEl.offsetHeight + l / 2 + "px") : (a = this.viewportHeight - c + "px", m = "S" === this.breakpoint ? 0 : n + "px"), o ? this.containerEl.classList.contains("device-cropped") && this.containerEl.classList.remove("device-cropped") : this.containerEl.classList.contains("device-cropped") || this.containerEl.classList.add("device-cropped"), this.stickyEl.style.top = s, this.stickyEl.style.height = a, this.copyEl.style.paddingBottom = m
                    }
                }], [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        var e = document.documentElement.classList;
                        return !e.contains("reduced-motion") && !e.contains("static-interaction")
                    }
                }]), t
            }(a);
        t.exports = m
    }, {
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    350: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/ac-raf-emitter/update"),
            c = e("@marcom/ac-raf-emitter/draw"),
            u = "data-progressive-image",
            h = "emit-event",
            m = "progressive-image:loaded",
            p = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._imgArr = Array.from(i.el.querySelectorAll("[" + u + "]")), i._loadKeyFrame = null, i._state = {
                        loaded: !1,
                        hasStickyInteraction: document.documentElement.classList.contains("no-static-interaction")
                    }, i.load = i.load.bind(i), i
                }
                return o(t, e), s(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return document.documentElement.classList.contains("progressive-image")
                    }
                }]), s(t, [{
                    key: "mounted",
                    value: function() {
                        this._setupAnimLoad()
                    }
                }, {
                    key: "load",
                    value: function() {
                        var e = this;
                        this._state.loaded || (this._imgArr.forEach(function(t) {
                            e._cssImgLoad(t)
                        }), this._loadKeyFrame.controller.off("ProgressiveImageLoad:enter", this.load))
                    }
                }, {
                    key: "_setupAnimLoad",
                    value: function() {
                        var e = this._state.hasStickyInteraction;
                        this._loadKeyFrame = this.animController && this.animController.getNearestKeyframeForAttribute(0, "progressive-image-load"), this._loadKeyFrame || (this._loadKeyFrame = this.addDiscreteEvent({
                            start: "0% - 100vh",
                            end: "100% + 100vh",
                            event: "ProgressiveImageLoad",
                            breakpointMask: "" + (e ? "LM" : "LMS")
                        }), e && (this._loadKeyFrame = this.addDiscreteEvent({
                            event: "ProgressiveImageLoad",
                            start: "-150vh",
                            end: "100% + 100vh",
                            breakpointMask: "S"
                        }))), this._loadKeyFrame.controller.on("ProgressiveImageLoad:enter", this.load)
                    }
                }, {
                    key: "_cssImgLoad",
                    value: function(e) {
                        var t = this;
                        l(function() {
                            var i = e.getAttribute(u) === h;
                            c(function() {
                                if (e.removeAttribute(u), i) {
                                    var r = {
                                            element: e,
                                            type: "loaded"
                                        },
                                        n = new CustomEvent(m, {
                                            detail: r
                                        });
                                    e.dispatchEvent(n), t.trigger(m, r)
                                }
                            })
                        })
                    }
                }]), t
            }(a);
        t.exports = p
    }, {
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/ac-raf-emitter/update": 216,
        "@marcom/bubble-gum/BaseComponent": 257
    }],
    351: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = function d(e, t, i) {
                null === e && (e = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var n = Object.getPrototypeOf(e);
                    return null === n ? void 0 : d(n, t, i)
                }
                if ("value" in r) return r.value;
                var o = r.get;
                if (void 0 !== o) return o.call(i)
            },
            l = e("@marcom/bubble-gum/BaseComponent"),
            c = e("@marcom/useragent-detect"),
            u = e("@marcom/ac-gallery").SlideGallery,
            h = "gallery:height:settled",
            m = function(e) {
                function t(e, i) {
                    r(this, t);
                    var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
                    return o.updateGalleryHeight = o.updateGalleryHeight.bind(o), window.removeEventListener("resize", o._onWindowResize), o
                }
                return o(t, e), s(t, [{
                    key: "updateGalleryHeight",
                    value: function() {
                        if (this._resizeContainer) {
                            this._itemHeights = [];
                            for (var e = this._items.length; e--;) this._storeItemHeight(this._items[e], !1);
                            this._containerResizeDuration !== !1 ? this._setElHeight(this._itemHeightsLookup[this._currentItem.getElementId()]) : this._setElHeight(this._itemHeights[0].height)
                        }
                    }
                }, {
                    key: "_onResizeDebounced",
                    value: function() {
                        this._positionItems(), this._snapToPosition(this._currentItem.position())
                    }
                }, {
                    key: "_setElHeight",
                    value: function(e, i) {
                        a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_setElHeight", this).apply(this, arguments), this.trigger(h)
                    }
                }]), t
            }(u),
            p = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return i._gallery = {}, i._onHeightSettled = i._onHeightSettled.bind(i), i
                }
                return o(t, e), s(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return !(c.browser.ie || document.documentElement.classList.contains("reduced-motion"))
                    }
                }]), s(t, [{
                    key: "mounted",
                    value: function() {
                        var e = this.el,
                            t = e.querySelector("[data-ac-gallery-slide]");
                        e.classList.add("gallery-enhanced"), this._gallery = new m(t, {
                            ease: "cubic-bezier(.35,.01,.34,1)",
                            duration: .6,
                            resizeContainer: !0,
                            wrapAround: !0,
                            touch: !0,
                            updateOnWindowResize: !1
                        }), this._gallery.once(h, this._onHeightSettled), this._gallery.updateGalleryHeight()
                    }
                }, {
                    key: "onResizeDebounced",
                    value: function(e) {
                        this._gallery._onResizeDebounced(), "S" === e.breakpoint ? (this._gallery.on(h, this._onHeightSettled), this._gallery.updateGalleryHeight()) : this._gallery.off(h, this._onHeightSettled)
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        this._gallery.once(h, this._onHeightSettled), this._gallery.updateGalleryHeight()
                    }
                }, {
                    key: "_onHeightSettled",
                    value: function() {
                        this.anim.forceUpdate()
                    }
                }]), t
            }(l);
        t.exports = p
    }, {
        "@marcom/ac-gallery": 149,
        "@marcom/bubble-gum/BaseComponent": 257,
        "@marcom/useragent-detect": 284
    }],
    352: [function(e, t, i) {
        "use strict";
        var r = (e("@marcom/ac-get-param"), e("@marcom/anim-system")),
            n = e("@marcom/anim-system/Model/AnimSystemModel"),
            o = e("@marcom/ac-feature"),
            s = e("@marcom/bubble-gum"),
            a = e("@marcom/bubble-gum/ComponentMap"),
            l = e("./model/SiteComponentMap"),
            c = {
                initialize: function() {
                    Object.assign(a, l), this.filterResizeEvents();
                    var e = document.querySelector(".main");
                    new s(e)
                },
                filterResizeEvents: function() {
                    if (!o.isDesktop() && o.continuousScrollEventsAvailable() && o.touchAvailable()) {
                        var e = document.createElement("div");
                        e.setAttribute("windowDimensionsTracker", "true"), e.style.position = "absolute", e.style.top = "0", e.style.width = "100vw", e.style.height = "100vh", e.style.pointerEvents = "none", e.style.visibility = "hidden", e.style.zIndex = "-1", document.documentElement.appendChild(e);
                        var t = e.clientWidth,
                            i = e.clientHeight;
                        r.on("ON_DOM_GROUPS_CREATED", function() {
                            return n.pageMetrics.windowHeight = i
                        }), r.on("ON_RESIZE_IMMEDIATE", function() {
                            return n.pageMetrics.windowHeight = i
                        }), window.removeEventListener("resize", r.onResizeImmediate), window.addEventListener("resize", function(n) {
                            var o = e.clientWidth,
                                s = e.clientHeight;
                            o === t && s === i || (t = o, i = s, r.onResizeImmediate(n))
                        })
                    }
                }
            };
        c.initialize()
    }, {
        "./model/SiteComponentMap": 353,
        "@marcom/ac-feature": 121,
        "@marcom/ac-get-param": 165,
        "@marcom/anim-system": 237,
        "@marcom/anim-system/Model/AnimSystemModel": 242,
        "@marcom/bubble-gum": 258,
        "@marcom/bubble-gum/ComponentMap": 259
    }],
    353: [function(e, t, i) {
        "use strict";
        t.exports = {
            ProgressiveImageLoader: e("../components/ProgressiveImageLoader"),
            CompareComponent: e("../components/CompareComponent"),
            GesturesModal: e("../components/Gestures/GesturesModal"),
            GesturesGallery: e("../components/Gestures/GesturesGallery"),
            GesturesModalGalleryManager: e("../components/GesturesModalGalleryManager"),
            ChipGridGL: e("../components/ChipGrid/ChipGridGL"),
            ChipGridDetailsKeyframeCreator: e("../components/ChipGrid/ChipGridDetailsKeyframeCreator"),
            BaseInlineVideo: e("../shared/components/BaseInlineVideo"),
            OverviewHero: e("../components/OverviewHero"),
            SlideGalleryComponent: e("../components/SlideGalleryComponent"),
            OverviewDepthControlVideo: e("../components/OverviewDepthControlVideo"),
            DisplayComparison: e("../components/DisplayComparison"),
            DisplayProductSelector: e("../components/DisplayProductSelector"),
            ImageToCanvasGrid: e("../components/OverviewFaceId/ImageToCanvasGrid"),
            OverviewFaceIdVideo: e("../components/OverviewFaceId/OverviewFaceIdVideo"),
            OverviewTrueDepthComponent: e("../components/OverviewTrueDepthComponent"),
            CameraOperationsKeyframeCreator: e("../components/CameraOperationsComponent/CameraOperationsKeyframeCreator"),
            CamerasOperationsGallery: e("../components/CameraOperationsComponent/CameraOperationsGallery"),
            TimelineChapterPlayer: e("../components/CameraOperationsComponent/TimelineChapterPlayer"),
            FaceIdUnlockSequence: e("../components/FaceIdUnlockSequence"),
            A12BionicComponents: e("../components/A12BionicComponents")
        }
    }, {
        "../components/A12BionicComponents": 327,
        "../components/CameraOperationsComponent/CameraOperationsGallery": 328,
        "../components/CameraOperationsComponent/CameraOperationsKeyframeCreator": 329,
        "../components/CameraOperationsComponent/TimelineChapterPlayer": 330,
        "../components/ChipGrid/ChipGridDetailsKeyframeCreator": 331,
        "../components/ChipGrid/ChipGridGL": 332,
        "../components/CompareComponent": 334,
        "../components/DisplayComparison": 335,
        "../components/DisplayProductSelector": 336,
        "../components/FaceIdUnlockSequence": 337,
        "../components/Gestures/GesturesGallery": 341,
        "../components/Gestures/GesturesModal": 342,
        "../components/GesturesModalGalleryManager": 344,
        "../components/OverviewDepthControlVideo": 345,
        "../components/OverviewFaceId/ImageToCanvasGrid": 346,
        "../components/OverviewFaceId/OverviewFaceIdVideo": 347,
        "../components/OverviewHero": 348,
        "../components/OverviewTrueDepthComponent": 349,
        "../components/ProgressiveImageLoader": 350,
        "../components/SlideGalleryComponent": 351,
        "../shared/components/BaseInlineVideo": 354
    }],
    354: [function(e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            a = e("@marcom/bubble-gum/BaseComponent"),
            l = e("@marcom/inline-video/InlineVideo"),
            c = e("@marcom/viewport-emitter"),
            u = e("@marcom/ac-raf-emitter/draw"),
            h = e("@marcom/ac-feature/prefersReducedMotion")(),
            m = function(e) {
                function t(e) {
                    r(this, t);
                    var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    i._el = e.el;
                    var o = i._getPageName("iphone-xs");
                    return i._video = new l(i._el, {
                        path: "/iphone-xs/2018/674b340a-40f1-4156-bbea-00f386459d3c/" + o + "/",
                        viewport: l.convertViewportName(e.pageMetrics.breakpoint),
                        resolution: l.convertToResolution(c.retina)
                    }), i._loadMetrics = {
                        event: "",
                        controller: {},
                        bpReloadArr: []
                    }, i
                }
                return o(t, e), s(t, null, [{
                    key: "IS_SUPPORTED",
                    value: function() {
                        return document.documentElement.classList.contains("inline-video")
                    }
                }]), s(t, [{
                    key: "mounted",
                    value: function() {
                        this._video.initialize(), this._setupAnimLoad(), this._setupAnimPlay(), this._loadMetrics.bpReloadArr = this._getreloadBreakpoints()
                    }
                }, {
                    key: "onBreakpointChange",
                    value: function(e) {
                        var t = l.convertViewportName(e.breakpoint),
                            i = l.convertViewportName(e.previousBreakpoint),
                            r = this._video,
                            n = r.state,
                            o = this._loadMetrics;
                        o.bpReloadArr.forEach(function(e) {
                            e !== t && e !== i || (r.source.change("viewport", t), n.loaded && (n.loaded = !1, r.frames.activate("start").then(function() {
                                u(function() {
                                    var e = o.controller.getNearestKeyframeForAttribute(0, "inline-video-load");
                                    e.isCurrentlyInRange ? r.load()["catch"](function() {}) : o.controller.once(o.event + ":enter", function() {
                                        r.load()["catch"](function() {})
                                    })
                                })
                            }, function(e) {})))
                        })
                    }
                }, {
                    key: "_getPageName",
                    value: function(e) {
                        var t = window.location.pathname,
                            i = t.match(/[-\w]*\/(?!.[-\w]*\/)/)[0].replace("/", "");
                        return i === e ? "overview" : i
                    }
                }, {
                    key: "_setupAnimLoad",
                    value: function(e) {
                        var t = this._video,
                            i = t.state,
                            r = {
                                start: "-250vh + 50%",
                                end: "50% + 150vh",
                                event: "inline-video-load"
                            };
                        e = Object.assign({}, r, e);
                        var n = this.addDiscreteEvent(e);
                        this._loadMetrics.event = e.event;
                        var o = this._loadMetrics.controller = n.controller;
                        o.once(e.event + ":enter", function() {
                            i.loaded || i.loading || t.load().then(function(e) {
                                if (h) {
                                    var i = t.controls;
                                    i.arePresent ? i.isPresent("play") ? i.enable("play") : i.isPresent("replay") && i.enable("replay") : t.frames.activate("static").then(function() {
                                        u(function() {
                                            window.URL.revokeObjectURL(t.el.src), t.el.src = ""
                                        })
                                    }, function(e) {})
                                }
                            }, function(e) {})
                        })
                    }
                }, {
                    key: "_setupAnimPlay",
                    value: function(e) {
                        if (!h) {
                            var t = this._video,
                                i = {
                                    start: "-100vh + 50%",
                                    end: "50%",
                                    event: "inline-video-play"
                                };
                            e = Object.assign({}, i, e);
                            var r = this.addDiscreteEvent(e);
                            r.controller.once(e.event + ":enter", function() {
                                t.state.loaded ? t.play()["catch"](function() {}) : t.load().then(function() {
                                    t.play()["catch"](function() {})
                                }, function(e) {})
                            })
                        }
                    }
                }, {
                    key: "_getreloadBreakpoints",
                    value: function() {
                        var e = this._el.getAttribute("data-reload-on-breakpoints"),
                            t = /\s*,\s*/;
                        return e ? e.split(t) : []
                    }
                }]), t
            }(a);
        t.exports = m
    }, {
        "@marcom/ac-feature/prefersReducedMotion": 138,
        "@marcom/ac-raf-emitter/draw": 212,
        "@marcom/bubble-gum/BaseComponent": 257,
        "@marcom/inline-video/InlineVideo": 277,
        "@marcom/viewport-emitter": 286
    }],
    355: [function(e, t, i) {
        "use strict";
        var r = !1,
            n = !1,
            o = [];
        t.exports = {
            add: function(e) {
                if (n) return void e();
                if (o.push(e), !r) {
                    r = !0;
                    var t = document.querySelector("[data-threejs]");
                    if (!t) throw "THREELoader could not find script tag pointing to THREE.js";
                    t.src = t.getAttribute("data-src");
                    var i = function s() {
                        return void 0 !== window.THREE ? void o.forEach(function(e) {
                            return e()
                        }) : void requestAnimationFrame(s)
                    };
                    i()
                }
            }
        }
    }, {}],
    356: [function(e, t, i) {
        "use strict";
        var r = e("@marcom/ac-raf-emitter/draw");
        t.exports = function(e) {
            var t = null,
                i = new Promise(function(e) {
                    return t = e
                }),
                n = function o() {
                    return e <= 0 ? void t() : (e -= 1, void r(o))
                };
            return n(), i
        }
    }, {
        "@marcom/ac-raf-emitter/draw": 212
    }]
}, {}, [352]);