(window.webpackJsonp = window.webpackJsonp || []).push([
    [0], {
        "/HMG": function(t, e, r) {
            "use strict";
            r.r(e);
            var o = r("o0o1"),
                a = r.n(o);
 
            function i(t, e, r, o, a, i, n) {
                try {
                    var s = t[i](n),
                        l = s.value
                } catch (t) {
                    return void r(t)
                }
                s.done ? e(l) : Promise.resolve(l).then(o, a)
            }
 
            function n(t) {
                return function() {
                    var e = this,
                        r = arguments;
                    return new Promise((function(o, a) {
                        var n = t.apply(e, r);
 
                        function s(t) {
                            i(n, o, a, s, l, "next", t)
                        }
 
                        function l(t) {
                            i(n, o, a, s, l, "throw", t)
                        }
                        s(void 0)
                    }))
                }
            }
            var s = {
                    data: function() {
                        return {
                            ipaFromLibrary: !1,
                            certByUDID: !0,
                            ipaFile: null,
                            ipaLibraryFile: null,
                            ipaLibraryOptions: [],
                            ipaLibraryPassword: null,
                            udid: null,
                            p12File: null,
                            p12Password: null,
                            mobileprovisionFile: null,
                            bundleId: null,
                            bundleName: null,
                            progress: 0,
                            uploading: !1,
                            processing: !1,
                            ready: !1,
                            downloadUrl: null
                        }
                    },
                    computed: {
                        showForm: function() {
                            return !this.uploading && !this.processing && !this.ready
                        },
                        ipaFromLibrarySwitchButtonText: function() {
                            return this.ipaFromLibrary ? "Switch to Upload" : "Switch to Library"
                        },
                        certByUDIDSwitchButtonText: function() {
                            return this.certByUDID ? "Switch to Upload" : "Switch to UDID"
                        }
                    },
                    methods: {
                        onSubmit: function(t) {
                            var e = this;
                            t.preventDefault(), this.upload("upload", (function(t) {
                                e.processing = !0, e.downloadUrl = t.data.download;
                                var r = setInterval((function() {
                                    e.status(t.data.status, (function(t) {
                                        t.data.result && (clearInterval(r), e.processing = !1, e.ready = !0)
                                    }))
                                }), 5e3)
                            }), (function(t) {
                                var r, o, a = null !== (r = t.response.data.title) && void 0 !== r ? r : "Server error, try again",
                                    i = null !== (o = t.response.data.message) && void 0 !== o ? o : t.message;
                                e.$bvToast.toast(i, {
                                    title: a,
                                    variant: "danger"
                                })
                            }))
                        },
                        upload: function(t, e, r) {
                            var o = this;
                            return n(a.a.mark((function i() {
                                var n;
                                return a.a.wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            return o.uploading = !0, a.next = 3, o.$recaptchaLoaded();
                                        case 3:
                                            return n = new FormData, o.ipaFromLibrary ? n.set("ipaLibraryFile", o.ipaLibraryFile) : n.set("ipaFile", o.ipaFile), o.certByUDID ? n.set("udid", o.udid) : (n.set("p12File", o.p12File), n.set("p12Password", o.p12Password), n.set("mobileprovisionFile", o.mobileprovisionFile)), o.bundleId && n.set("bundleId", o.bundleId), o.bundleName && n.set("bundleName", o.bundleName), a.t0 = n, a.next = 11, o.$recaptcha("upload");
                                        case 11:
                                            a.t1 = a.sent, a.t0.set.call(a.t0, "recaptcha", a.t1), o.$http({
                                                method: "post",
                                                url: t,
                                                data: n,
                                                headers: {
                                                    "Content-Type": "multipart/form-data"
                                                },
                                                onUploadProgress: function(t) {
                                                    o.progress = Math.round(100 * t.loaded / t.total)
                                                }
                                            }).then(e).catch(r).finally((function() {
                                                o.uploading = !1
                                            }));
                                        case 14:
                                        case "end":
                                            return a.stop()
                                    }
                                }), i)
                            })))()
                        },
                        getLibrary: function() {
                            var t = this;
                            return n(a.a.mark((function e() {
                                return a.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t.ipaFromLibrary = !0, e.next = 3, t.$recaptchaLoaded();
                                        case 3:
                                            return e.t0 = t, e.next = 6, t.$recaptcha("library");
                                        case 6:
                                            e.t1 = e.sent, e.t2 = t.ipaLibraryPassword, e.t3 = {
                                                recaptcha: e.t1,
                                                password: e.t2
                                            }, e.t4 = {
                                                method: "get",
                                                url: "/library",
                                                params: e.t3
                                            }, e.t0.$http.call(e.t0, e.t4).then((function(e) {
                                                t.ipaLibraryOptions = e.data
                                            })).catch((function(e) {
                                                t.ipaFromLibrary = !1
                                            }));
                                        case 11:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        },
                        toggleIpaFromLibrary: function() {
                            this.ipaFromLibrary ? this.ipaFromLibrary = !1 : this.$refs.libraryPasswordModal.show()
                        },
                        toggleCertByUDID: function() {
                            this.certByUDID = !this.certByUDID
                        },
                        status: function(t, e, r) {
                            var o = this;
                            return n(a.a.mark((function i() {
                                return a.a.wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            return a.next = 2, o.$recaptchaLoaded();
                                        case 2:
                                            return a.t0 = o, a.t1 = t, a.next = 6, o.$recaptcha("status");
                                        case 6:
                                            a.t2 = a.sent, a.t3 = {
                                                recaptcha: a.t2
                                            }, a.t4 = {
                                                method: "post",
                                                url: a.t1,
                                                data: a.t3
                                            }, a.t0.$http.call(a.t0, a.t4).then(e).catch(r);
                                        case 10:
                                        case "end":
                                            return a.stop()
                                    }
                                }), i)
                            })))()
                        },
                        reset: function() {
                            this.ready = !1
                        }
                    }
                },
                l = r("KHd+"),
                p = Object(l.a)(s, (function() {
                    var t = this,
                        e = t.$createElement,
                        r = t._self._c || e;
                    return r("b-row", {
                        staticClass: "mt-5"
                    }, [r("b-col", {
                        attrs: {
                            sm: "12",
                            md: "10",
                            "offset-md": "1"
                        }
                    }, [r("b-alert", {
                        attrs: {
                            show: "",
                            fade: "",
                            dismissible: ""
                        }
                    }, [r("h4", {
                        staticClass: "alert-heading"
                    }, [t._v("This service allow you sign IPA files online without macOS for beta-testing.")]), t._v(" "), r("p", [t._v("By selecting files and pressing "), r("b-badge", [t._v("Sign it now!")]), t._v(" button you are confirming that:")], 1), t._v(" "), r("ul", [r("li", [t._v("You have rights to use this IPA file;")]), t._v(" "), r("li", [t._v("You have rights to use this p12 certificate;")]), t._v(" "), r("li", [t._v("You will not use this service for piracy and other illegal purposes.")])]), t._v(" "), r("p", [t._v("This service will not save, use or distribute your files after signing process.")])]), t._v(" "), r("b-modal", {
                        ref: "libraryPasswordModal",
                        attrs: {
                            title: "Library password",
                            "title-tag": "h5",
                            size: "sm",
                            "button-size": "sm",
                            "ok-title": "Open Library",
                            "ok-disabled": !t.ipaLibraryPassword
                        },
                        on: {
                            ok: t.getLibrary
                        },
                        scopedSlots: t._u([{
                            key: "modal-ok",
                            fn: function() {
                                return [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "unlock",
                                        "fixed-width": ""
                                    }
                                }), t._v(" Open\n            ")]
                            },
                            proxy: !0
                        }, {
                            key: "modal-cancel",
                            fn: function() {
                                return [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "times",
                                        "fixed-width": ""
                                    }
                                }), t._v(" Cancel\n            ")]
                            },
                            proxy: !0
                        }])
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "key",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }])
                    }, [t._v(" "), r("b-input", {
                        attrs: {
                            placeholder: "Enter .ipa Library password",
                            autofocus: ""
                        },
                        model: {
                            value: t.ipaLibraryPassword,
                            callback: function(e) {
                                t.ipaLibraryPassword = e
                            },
                            expression: "ipaLibraryPassword"
                        }
                    })], 1)], 1), t._v(" "), t.showForm ? r("b-card", {
                        attrs: {
                            title: "Step 1: Select your files"
                        }
                    }, [r("b-form", {
                        on: {
                            submit: t.onSubmit
                        }
                    }, [r("b-row", {
                        staticClass: "mb-2"
                    }, [r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            lg: "8",
                            xl: "9"
                        }
                    }, [t.ipaFromLibrary ? r("b-overlay", {
                        attrs: {
                            show: !this.ipaLibraryOptions.length,
                            "spinner-small": ""
                        }
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "folder",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 1633493604)
                    }, [t._v(" "), r("b-form-select", {
                        attrs: {
                            options: t.ipaLibraryOptions,
                            state: Boolean(t.ipaLibraryFile),
                            required: ""
                        },
                        scopedSlots: t._u([{
                            key: "first",
                            fn: function() {
                                return [r("b-form-select-option", {
                                    attrs: {
                                        value: null
                                    }
                                }, [t._v("Select .ipa file from library...")])]
                            },
                            proxy: !0
                        }], null, !1, 1632514849),
                        model: {
                            value: t.ipaLibraryFile,
                            callback: function(e) {
                                t.ipaLibraryFile = e
                            },
                            expression: "ipaLibraryFile"
                        }
                    })], 1)], 1) : r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "file-upload",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 1504295642)
                    }, [t._v(" "), r("b-form-file", {
                        attrs: {
                            state: Boolean(t.ipaFile),
                            placeholder: "Choose an .ipa file or drop it here...",
                            "drop-placeholder": "Drop .ipa file here...",
                            accept: ".ipa",
                            required: ""
                        },
                        model: {
                            value: t.ipaFile,
                            callback: function(e) {
                                t.ipaFile = e
                            },
                            expression: "ipaFile"
                        }
                    })], 1)], 1), t._v(" "), r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            lg: "4",
                            xl: "3"
                        }
                    }, [r("b-button", {
                        attrs: {
                            variant: "outline-secondary",
                            block: ""
                        },
                        on: {
                            click: t.toggleIpaFromLibrary
                        }
                    }, [r("font-awesome-icon", {
                        attrs: {
                            icon: "sync",
                            "fixed-width": ""
                        }
                    }), t._v(" " + t._s(t.ipaFromLibrarySwitchButtonText) + "\n                        ")], 1)], 1)], 1), t._v(" "), r("hr"), t._v(" "), r("b-row", {
                        staticClass: "mb-2"
                    }, [r("b-col", {
                        attrs: {
                            lg: "8",
                            xl: "9"
                        }
                    }, [t.certByUDID ? r("b-row", [r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            sm: "12"
                        }
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "mobile-alt",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 1994854470)
                    }, [t._v(" "), r("b-form-input", {
                        attrs: {
                            state: Boolean(t.udid),
                            placeholder: "Enter UDID (only registered at https://udidregistrations.com)",
                            required: ""
                        },
                        model: {
                            value: t.udid,
                            callback: function(e) {
                                t.udid = e
                            },
                            expression: "udid"
                        }
                    })], 1)], 1)], 1) : [r("b-row", [r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            lg: "6"
                        }
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "certificate",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 3541748839)
                    }, [t._v(" "), r("b-form-file", {
                        attrs: {
                            state: Boolean(t.p12File),
                            placeholder: "Choose an .p12 file or drop it here...",
                            "drop-placeholder": "Drop .p12 file here...",
                            accept: ".p12",
                            required: ""
                        },
                        model: {
                            value: t.p12File,
                            callback: function(e) {
                                t.p12File = e
                            },
                            expression: "p12File"
                        }
                    })], 1)], 1), t._v(" "), r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            lg: "6"
                        }
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "key",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 1085472581)
                    }, [t._v(" "), r("b-form-input", {
                        attrs: {
                            state: Boolean(t.p12Password),
                            placeholder: "Enter .p12 password",
                            required: ""
                        },
                        model: {
                            value: t.p12Password,
                            callback: function(e) {
                                t.p12Password = e
                            },
                            expression: "p12Password"
                        }
                    })], 1)], 1)], 1), t._v(" "), r("b-row", [r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            sm: "12"
                        }
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "mobile-alt",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 1994854470)
                    }, [t._v(" "), r("b-form-file", {
                        attrs: {
                            state: Boolean(t.mobileprovisionFile),
                            placeholder: "Choose an .mobileprovision file or drop it here...",
                            "drop-placeholder": "Drop .mobileprovision file here...",
                            accept: ".mobileprovision",
                            required: ""
                        },
                        model: {
                            value: t.mobileprovisionFile,
                            callback: function(e) {
                                t.mobileprovisionFile = e
                            },
                            expression: "mobileprovisionFile"
                        }
                    })], 1)], 1)], 1)]], 2), t._v(" "), r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            lg: "4",
                            xl: "3"
                        }
                    }, [r("b-button", {
                        attrs: {
                            variant: "outline-secondary",
                            block: ""
                        },
                        on: {
                            click: t.toggleCertByUDID
                        }
                    }, [r("font-awesome-icon", {
                        attrs: {
                            icon: "sync",
                            "fixed-width": ""
                        }
                    }), t._v(" " + t._s(t.certByUDIDSwitchButtonText) + "\n                        ")], 1)], 1)], 1), t._v(" "), r("hr"), t._v(" "), r("b-row", {
                        staticClass: "mb-2"
                    }, [r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            lg: "6"
                        }
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "cog",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 214153369)
                    }, [t._v(" "), r("b-form-input", {
                        attrs: {
                            placeholder: "Enter new bundle identifier (optional)"
                        },
                        model: {
                            value: t.bundleId,
                            callback: function(e) {
                                t.bundleId = e
                            },
                            expression: "bundleId"
                        }
                    })], 1)], 1), t._v(" "), r("b-col", {
                        staticClass: "py-1",
                        attrs: {
                            lg: "6"
                        }
                    }, [r("b-input-group", {
                        scopedSlots: t._u([{
                            key: "prepend",
                            fn: function() {
                                return [r("b-input-group-text", [r("font-awesome-icon", {
                                    attrs: {
                                        icon: "cog",
                                        "fixed-width": ""
                                    }
                                })], 1)]
                            },
                            proxy: !0
                        }], null, !1, 214153369)
                    }, [t._v(" "), r("b-form-input", {
                        attrs: {
                            placeholder: "Enter new bundle name (optional)"
                        },
                        model: {
                            value: t.bundleName,
                            callback: function(e) {
                                t.bundleName = e
                            },
                            expression: "bundleName"
                        }
                    })], 1)], 1)], 1), t._v(" "), r("b-button", {
                        attrs: {
                            type: "submit",
                            variant: "primary",
                            block: ""
                        }
                    }, [r("font-awesome-icon", {
                        attrs: {
                            icon: "signature",
                            "fixed-width": ""
                        }
                    }), t._v(" Sign it now!\n                ")], 1)], 1)], 1) : t._e(), t._v(" "), t.uploading ? r("b-card", {
                        attrs: {
                            title: "Step 2: Uploading"
                        }
                    }, [r("b-progress", {
                        attrs: {
                            max: 100,
                            variant: "success",
                            "show-progress": "",
                            animated: ""
                        }
                    }, [r("b-progress-bar", {
                        attrs: {
                            value: t.progress
                        }
                    }, [r("strong", [t._v(t._s(t.progress) + "%")])])], 1)], 1) : t._e(), t._v(" "), t.processing ? r("b-card", {
                        attrs: {
                            title: "Step 3: Processing"
                        }
                    }, [r("font-awesome-icon", {
                        attrs: {
                            icon: "cog",
                            spin: "",
                            "fixed-width": ""
                        }
                    }), t._v(" We are processing your files, please wait...\n        ")], 1) : t._e(), t._v(" "), t.ready ? r("b-card", {
                        attrs: {
                            title: "Step 4: Install application"
                        }
                    }, [r("b-row", [r("b-col", {
                        attrs: {
                            sm: "4"
                        }
                    }, [r("h6", [t._v("Scan this code with camera")]), t._v(" "), r("qrcode", {
                        attrs: {
                            value: t.downloadUrl
                        }
                    })], 1), t._v(" "), r("b-col", {
                        attrs: {
                            sm: "8"
                        }
                    }, [r("h6", [t._v("Copy & send link to your testers")]), t._v(" "), r("b-link", {
                        staticClass: "d-block mx-auto",
                        attrs: {
                            href: t.downloadUrl
                        }
                    }, [t._v(t._s(t.downloadUrl))])], 1)], 1), t._v(" "), r("b-button", {
                        staticClass: "mt-3",
                        attrs: {
                            variant: "primary",
                            block: ""
                        },
                        on: {
                            click: t.reset
                        }
                    }, [r("font-awesome-icon", {
                        attrs: {
                            icon: "redo",
                            "fixed-width": ""
                        }
                    }), t._v(" Start over\n            ")], 1)], 1) : t._e()], 1)], 1)
                }), [], !1, null, null, null);
            e.default = p.exports
        },
        0: function(t, e, r) {
            r("bUC5"), t.exports = r("pyCd")
        },
        bUC5: function(t, e, r) {
            "use strict";
            r.r(e);
            var o = r("p/7L"),
                a = r.n(o),
                i = r("jE9Z"),
                n = r("X1uE"),
                s = r("dg0U"),
                l = r("7O5W"),
                p = r("wHSu"),
                c = r("rT2p"),
                u = r("suWR"),
                d = r.n(u);
            window.Vue = r("XuX8"), window.axios = r("vDqi"), Vue.use(i.a), Vue.use(a.a, axios), Vue.use(n.a), Vue.use(s.VueReCaptcha, {
                siteKey: "6Lff284aAAAAAGYV93fOC985u9R0vFJ2bKidqoWU"
            }), l.c.add(p.a), Vue.component("font-awesome-icon", c.a), Vue.component(d.a.name, d.a), Vue.router = new i.a({
                mode: "history",
                linkActiveClass: "active",
                linkExactActiveClass: "active",
                routes: [{
                    path: "",
                    name: "index",
                    redirect: {
                        name: "upload"
                    }
                }, {
                    path: "/upload",
                    name: "upload",
                    component: r("/HMG").default
                }, {
                    path: "*",
                    redirect: {
                        name: "index"
                    }
                }]
            });
            new Vue({
                router: Vue.router
            }).$mount("#app")
        },
        pyCd: function(t, e) {}
    },
    [
        [0, 1, 2]
    ]
