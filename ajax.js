        new Vue({
            el: '#app',
            data: {
                show: true,
                showStep1: true,
                showStep2: false,
                showStep3: false,
                showStep4: false,
                progressBar: 0,
                ipaCss: 'is-invalid',
                ipaText: 'Выберите .ipa приложение.',
                p12Css: 'is-invalid',
                p12Text: 'Сертификат.p12',
                pwdCss: 'is-invalid',
                pwdText: 'Пароль сертификата .p12',
                mobCss: 'is-invalid',
                mobText: 'all.mobileprovision',
                download: '',
                download_ipa: '',
                ipa: '',
                p12: '',
                password: '',
                mobileprovision: '',
                name: '',
                identifier: '',
                unlockValue: 0,
            },
            methods: {
                getFile: function(params) {
                    console.info(params);
                    switch (params.srcElement.accept) {
                        case '.ipa':
                            if (params.target.files.length > 0) {
                                this.ipaCss = 'is-valid';
                                this.ipaText = params.target.files[0].name;
                                this.ipa = params.target.files[0];
                            } else {
                                this.ipaCss = 'is-invalid';
                                this.ipaText = 'Choose an .ipa file or drop it here...';
                                this.ipa = '';
                            }
                            break;
                        case '.p12':
                            if (params.target.files.length > 0) {
                                this.p12Css = 'is-valid';
                                this.p12Text = params.target.files[0].name;
                                this.p12 = params.target.files[0];
                            } else {
                                this.p12Css = 'is-invalid';
                                this.p12Text = 'Choose an .ipa file or drop it here...';
                                this.p12 = '';
                            }
                            break;
                        case '.mobileprovision':
                            if (params.target.files.length > 0) {
                                this.mobCss = 'is-valid';
                                this.mobText = params.target.files[0].name;
                                this.mobileprovision = params.target.files[0];
                            } else {
                                this.mobCss = 'is-invalid';
                                this.mobText = 'Choose an .mobileprovision file or drop it here...';
                                this.mobileprovision = '';
                            }
                            break;
                    }
                },
                upload: function() {
                    let that = this;
                    var refs = this.$refs;
                    var keys = Object.keys(refs);
 
                    for (var i = 0; i < Object.keys(refs).length; i++) {
                        if (refs[keys[i]].ariaRequired && !refs[keys[i]].value) {
                            refs[keys[i]].focus();
                            return false;
                        }
                    }
 
                    // 文件上传
                    this.showStep1 = false;
                    this.showStep2 = true;
                    var formData = new FormData();
                    formData.append("ipa", this.ipa);
                    formData.append("p12", this.p12);
                    formData.append("name", this.name);
                    formData.append("password", this.password);
                    formData.append("unlock", this.unlockValue);
                    formData.append("identifier", this.identifier);
                    formData.append("mobileprovision", this.mobileprovision);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            // 使用本地 progress 事件
                            if (progressEvent.lengthComputable) {
                                let num = Math.round((progressEvent.loaded / progressEvent.total) * 100)
                                this.progressBar = num // 使用某种 UI 进度条组件会用到的百分比
                            }
                        }
                    }
 
                    axios.post(uploadUrl, formData, config).then((response) => {
                        if (response.data.code == 0) {
                            // 上传完成，开始签名
                            that.showStep2 = false;
                            that.showStep3 = true;
                            let data = response.data.data;
 
                            this.status(data);
 
                        } else {
                            alert('Please check the certificate password');
                        }
                    }).catch(function(error) {
                        alert(error);
                    });
                },
                status: function(params) {
                    let that = this;
                    var signData = new FormData();
                    signData.append("uuid", params.uuid);
                    signData.append("time", params.time);
 
                    let headers = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
 
                    axios.post(checkUrl, signData, headers).then((response) => {
                        if (response.data.code == 0) {
                            // 签名成功
                            this.showStep3 = false;
                            this.showStep4 = true;
 
                            
                            that.download = downloadUrl + '/' + params.uuid + '/' + params.time;
                            that.download_ipa = storageUrl + '/' + params.uuid + '/' + params.time + '/' + 'resign_' + params.time + '.ipa'
                            var qrcode = new QRCode(document.getElementById("qrcode"), {
                                width: 100,
                                height: 100
                            });
                            qrcode.makeCode(that.download);
                            
                        } else if (response.data.code == 1) {
                            console.info("签名中");
                            setTimeout("this.status()", "3000");
                            const timer = setInterval(() => {
                                clearInterval(timer)
                                this.status(params);
                            }, 3000)
                        } else {
                            alert("Signature failed");
                            return;
                        }
                    });
                },
                close: function() {
                    this.show = false;
                },
                index: function() {
                    location.reload();
                }
            },
            watch: {
                password: function(params) {
                    if (params.length > 0) {
                        this.pwdCss = 'is-valid';
                    } else {
                        this.pwdCss = 'is-invalid';
                    }
                },
            },
        })
