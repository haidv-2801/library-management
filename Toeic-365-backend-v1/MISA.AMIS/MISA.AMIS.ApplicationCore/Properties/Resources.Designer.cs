﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TOE.TOEIC.ApplicationCore.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("TOE.TOEIC.ApplicationCore.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to @&quot;^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$&quot;.
        /// </summary>
        public static string MailRegex {
            get {
                return ResourceManager.GetString("MailRegex", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to @&quot;^(([^&lt;&gt;()[\]\\.,;:\s@&quot;]+(\.[^&lt;&gt;()[\]\\.,;:\s@&quot;]+)*)|(&quot;.+&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]^(([^&lt;&gt;()[\]\\.,;:\s@&quot;]+(\.[^&lt;&gt;()[\]\\.,;:\s@&quot;]+)*)|(&quot;.+&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$&quot;.
        /// </summary>
        public static string MailRegex2 {
            get {
                return ResourceManager.GetString("MailRegex2", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Có lỗi xảy ra, vui lòng liên hệ MISA.
        /// </summary>
        public static string MISA_Error {
            get {
                return ResourceManager.GetString("MISA_Error", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Thông tin {0} đã tồn tại trên hệ thống.
        /// </summary>
        public static string Msg_Duplicate {
            get {
                return ResourceManager.GetString("Msg_Duplicate", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Thao tác thất bại.
        /// </summary>
        public static string Msg_Failed {
            get {
                return ResourceManager.GetString("Msg_Failed", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Thông tin {0} không chính xác.
        /// </summary>
        public static string Msg_InCorrect {
            get {
                return ResourceManager.GetString("Msg_InCorrect", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Thông tin {0} không đúng định dạng.
        /// </summary>
        public static string Msg_NotFormat {
            get {
                return ResourceManager.GetString("Msg_NotFormat", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Dữ liệu không hợp lệ, vui lòng kiểm tra lại..
        /// </summary>
        public static string Msg_NotValid {
            get {
                return ResourceManager.GetString("Msg_NotValid", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Thông tin {0} không được trống.
        /// </summary>
        public static string Msg_Required {
            get {
                return ResourceManager.GetString("Msg_Required", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Thao tác thành công.
        /// </summary>
        public static string Msg_Success {
            get {
                return ResourceManager.GetString("Msg_Success", resourceCulture);
            }
        }
    }
}
