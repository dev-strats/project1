[1mdiff --git a/.idea/workspace.xml b/.idea/workspace.xml[m
[1mindex b7ebaef..b97b1ce 100644[m
[1m--- a/.idea/workspace.xml[m
[1m+++ b/.idea/workspace.xml[m
[36m@@ -2,15 +2,9 @@[m
 <project version="4">[m
   <component name="ChangeListManager">[m
     <list default="true" id="011c068f-4cd5-428f-b587-901001cf1781" name="Default" comment="">[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/webapp/server/api.js" afterPath="$PROJECT_DIR$/webapp/server/api.js" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/microtrader/app/utils/math_funcs.py" afterPath="$PROJECT_DIR$/microtrader/app/utils/math_funcs.py" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/.idea/misc.xml" afterPath="$PROJECT_DIR$/.idea/misc.xml" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/.idea/modules.xml" afterPath="$PROJECT_DIR$/.idea/modules.xml" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/.idea/mysite.iml" afterPath="$PROJECT_DIR$/.idea/mysite.iml" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/microtrader/app/models/strategy_base.py" afterPath="$PROJECT_DIR$/microtrader/app/models/strategy_base.py" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/microtrader/test.py" afterPath="$PROJECT_DIR$/microtrader/test.py" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/.idea/vcs.xml" afterPath="$PROJECT_DIR$/.idea/vcs.xml" />[m
[31m-      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/microtrader/app/models/vol_target.py" afterPath="$PROJECT_DIR$/microtrader/app/models/vol_target.py" />[m
[32m+[m[32m      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/microtrader/app/models/strategy_short_vxx.py" afterPath="$PROJECT_DIR$/microtrader/app/models/strategy_short_vxx.py" />[m
[32m+[m[32m      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/microtrader/app/models/tradable_base.py" afterPath="$PROJECT_DIR$/microtrader/app/models/tradable_base.py" />[m
[32m+[m[32m      <change type="MODIFICATION" beforePath="$PROJECT_DIR$/microtrader/app/models/tradable_manager.py" afterPath="$PROJECT_DIR$/microtrader/app/models/tradable_manager.py" />[m
       <change type="MODIFICATION" beforePath="$PROJECT_DIR$/.idea/workspace.xml" afterPath="$PROJECT_DIR$/.idea/workspace.xml" />[m
     </list>[m
     <option name="TRACKING_ENABLED" value="true" />[m
[36m@@ -32,102 +26,106 @@[m
   </component>[m
   <component name="FileEditorManager">[m
     <leaf>[m
[31m-      <file leaf-file-name="views.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/views.py">[m
[32m+[m[32m      <file leaf-file-name="future_contract.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/models/future_contract.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="482" max-vertical-offset="855">[m
[31m-              <caret line="35" column="34" selection-start-line="35" selection-start-column="34" selection-end-line="35" selection-end-column="34" />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="481" max-vertical-offset="855">[m
[32m+[m[32m              <caret line="42" column="18" selection-start-line="42" selection-start-column="18" selection-end-line="42" selection-end-column="18" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="run.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/run.py">[m
[32m+[m[32m      <file leaf-file-name="tradable_manager.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/models/tradable_manager.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="209">[m
[31m-              <caret line="2" column="0" selection-start-line="2" selection-start-column="0" selection-end-line="2" selection-end-column="0" />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="1060" max-vertical-offset="2356">[m
[32m+[m[32m              <caret line="63" column="0" selection-start-line="63" selection-start-column="0" selection-end-line="63" selection-end-column="0" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="rolling_future_strategy.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/models/rolling_future_strategy.py">[m
[32m+[m[32m      <file leaf-file-name="quandl_wrapper.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/datasource/quandl_wrapper.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="145" max-vertical-offset="912">[m
[31m-              <caret line="17" column="0" selection-start-line="17" selection-start-column="0" selection-end-line="17" selection-end-column="0" />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="1474" max-vertical-offset="1824">[m
[32m+[m[32m              <caret line="88" column="0" selection-start-line="88" selection-start-column="0" selection-end-line="88" selection-end-column="0" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="cash.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/models/cash.py">[m
[32m+[m[32m      <file leaf-file-name="tradable_base.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/models/tradable_base.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="475">[m
[31m-              <caret line="7" column="14" selection-start-line="7" selection-start-column="14" selection-end-line="7" selection-end-column="14" />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="2375">[m
[32m+[m[32m              <caret line="15" column="28" selection-start-line="15" selection-start-column="28" selection-end-line="15" selection-end-column="28" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="vol_target.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/models/vol_target.py">[m
[32m+[m[32m      <file leaf-file-name="views.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/views.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="1235">[m
[31m-              <caret line="0" column="0" selection-start-line="0" selection-start-column="0" selection-end-line="0" selection-end-column="0" />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="361" max-vertical-offset="1957">[m
[32m+[m[32m              <caret line="34" column="57" selection-start-line="34" selection-start-column="57" selection-end-line="34" selection-end-column="57" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="math_funcs.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/utils/math_funcs.py">[m
[32m+[m[32m      <file leaf-file-name="strategy_short_vxx.py" pinned="false" current="true" current-in-tab="true">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/models/strategy_short_vxx.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="838" max-vertical-offset="1425">[m
[31m-              <caret line="56" column="0" selection-start-line="56" selection-start-column="0" selection-end-line="56" selection-end-column="0" />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.61093247" vertical-offset="855" max-vertical-offset="1216">[m
[32m+[m[32m              <caret line="58" column="106" selection-start-line="58" selection-start-column="106" selection-end-line="58" selection-end-column="106" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="test.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/test.py">[m
[32m+[m[32m      <file leaf-file-name="tradable.html" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/templates/tradable.html">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="513">[m
[31m-              <caret line="19" column="19" selection-start-line="19" selection-start-column="19" selection-end-line="19" selection-end-column="19" />[m
[32m+[m[32m            <state vertical-scroll-proportion="-8.285714" vertical-offset="4613" max-vertical-offset="5757">[m
[32m+[m[32m              <caret line="255" column="0" selection-start-line="255" selection-start-column="0" selection-end-line="255" selection-end-column="0" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="strategy_base.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/models/strategy_base.py">[m
[32m+[m[32m      <file leaf-file-name="etf_product.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/models/etf_product.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="665">[m
[31m-              <caret line="5" column="0" selection-start-line="5" selection-start-column="0" selection-end-line="5" selection-end-column="0" />[m
[31m-              <folding />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="107" max-vertical-offset="418">[m
[32m+[m[32m              <caret line="14" column="0" selection-start-line="14" selection-start-column="0" selection-end-line="14" selection-end-column="0" />[m
[32m+[m[32m              <folding>[m
[32m+[m[32m                <element signature="e#0#19#0" expanded="true" />[m
[32m+[m[32m              </folding>[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="future_contract.py" pinned="false" current="false" current-in-tab="false">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/models/future_contract.py">[m
[32m+[m[32m      <file leaf-file-name="data_base.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/models/data_base.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.0" vertical-offset="266" max-vertical-offset="817">[m
[31m-              <caret line="14" column="26" selection-start-line="14" selection-start-column="26" selection-end-line="14" selection-end-column="26" />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="95" max-vertical-offset="836">[m
[32m+[m[32m              <caret line="6" column="0" selection-start-line="6" selection-start-column="0" selection-end-line="6" selection-end-column="0" />[m
               <folding />[m
             </state>[m
           </provider>[m
         </entry>[m
       </file>[m
[31m-      <file leaf-file-name="tradable_base.py" pinned="false" current="true" current-in-tab="true">[m
[31m-        <entry file="file://$PROJECT_DIR$/microtrader/app/models/tradable_base.py">[m
[32m+[m[32m      <file leaf-file-name="index_product.py" pinned="false" current="false" current-in-tab="false">[m
[32m+[m[32m        <entry file="file://$PROJECT_DIR$/microtrader/app/models/index_product.py">[m
           <provider selected="true" editor-type-id="text-editor">[m
[31m-            <state vertical-scroll-proportion="0.88161993" vertical-offset="1446" max-vertical-offset="3059">[m
[31m-              <caret line="94" column="13" selection-start-line="94" selection-start-column="13" selection-end-line="94" selection-end-column="13" />[m
[31m-              <folding />[m
[32m+[m[32m            <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="418">[m
[32m+[m[32m              <caret line="10" column="32" selection-start-line="10" selection-start-column="32" selection-end-line="10" selection-end-column="32" />[m
[32m+[m[32m              <folding>[m
[32m+[m[32m                <element signature="e#0#19#0" expanded="true" />[m
[32m+[m[32m              </folding>[m
             </state>[m
           </provider>[m
         </entry>[m
[36m@@ -157,24 +155,32 @@[m
         <option value="$PROJECT_DIR$/microtrader/app/utils/date_funcs.py" />[m
         <option value="$PROJECT_DIR$/microtrader/app/models/strategy_manager.py" />[m
         <option value="$PROJECT_DIR$/microtrader/app/models/cash.py" />[m
[31m-        <option value="$PROJECT_DIR$/microtrader/app/models/future_contract.py" />[m
[31m-        <option value="$PROJECT_DIR$/microtrader/app/models/rolling_future_strategy.py" />[m
         <option value="$PROJECT_DIR$/microtrader/app/models/data_base.py" />[m
[31m-        <option value="$PROJECT_DIR$/microtrader/app/models/tradable_base.py" />[m
[31m-        <option value="$PROJECT_DIR$/microtrader/app/views.py" />[m
         <option value="$PROJECT_DIR$/microtrader/test.py" />[m
         <option value="$PROJECT_DIR$/microtrader/run.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/tradable_register.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/utils/math_funcs.py" />[m
         <option value="$PROJECT_DIR$/microtrader/app/models/vol_target.py" />[m
         <option value="$PROJECT_DIR$/microtrader/app/models/strategy_base.py" />[m
[31m-        <option value="$PROJECT_DIR$/microtrader/app/utils/math_funcs.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/future_contract.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/templates/tradable.html" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/rolling_future_strategy.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/asset_allocation.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/datasource/quandl_wrapper.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/views.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/asset_allocation_inverse_vol.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/tradable_base.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/etf_product.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/tradable_manager.py" />[m
[32m+[m[32m        <option value="$PROJECT_DIR$/microtrader/app/models/strategy_short_vxx.py" />[m
       </list>[m
     </option>[m
   </component>[m
   <component name="ProjectFrameBounds">[m
[31m-    <option name="x" value="-8" />[m
[31m-    <option name="y" value="-8" />[m
[31m-    <option name="width" value="1378" />[m
[31m-    <option name="height" value="744" />[m
[32m+[m[32m    <option name="x" value="1" />[m
[32m+[m[32m    <option name="y" value="1" />[m
[32m+[m[32m    <option name="width" value="1364" />[m
[32m+[m[32m    <option name="height" value="726" />[m
   </component>[m
   <component name="ProjectInspectionProfilesVisibleTreeState">[m
     <entry key="Project Default">[m
[36m@@ -218,6 +224,7 @@[m
       <sortByType />[m
     </navigator>[m
     <panes>[m
[32m+[m[32m      <pane id="Scope" />[m
       <pane id="ProjectPane">[m
         <subPane>[m
           <PATH>[m
[36m@@ -334,9 +341,30 @@[m
               <option name="myItemType" value="com.intellij.ide.projectView.impl.nodes.PsiDirectoryNode" />[m
             </PATH_ELEMENT>[m
           </PATH>[m
[32m+[m[32m          <PATH>[m
[32m+[m[32m            <PATH_ELEMENT>[m
[32m+[m[32m              <option name="myItemId" value="project1" />[m
[32m+[m[32m              <option name="myItemType" value="com.intellij.ide.projectView.impl.nodes.ProjectViewProjectNode" />[m
[32m+[m[32m            </PATH_ELEMENT>[m
[32m+[m[32m            <PATH_ELEMENT>[m
[32m+[m[32m              <option name="myItemId" value="project1" />[m
[32m+[m[32m              <option name="myItemType" value="com.intellij.ide.projectView.impl.nodes.PsiDirectoryNode" />[m
[32m+[m[32m            </PATH_ELEMENT>[m
[32m+[m[32m            <PATH_ELEMENT>[m
[32m+[m[32m              <option name="myItemId" value="microtrader" />[m
[32m+[m[32m              <option name="myItemType" value="com.intellij.ide.projectView.impl.nodes.PsiDirectoryNode" />[m
[32m+[m[32m            </PATH_ELEMENT>[m
[32m+[m[32m            <PATH_ELEMENT>[m
[32m+[m[32m              <option name="myItemId" value="app" />[m
[32m+[m[32m              <option name="myItemType" value="com.intellij.ide.projectView.impl.nodes.PsiDirectoryNode" />[m
[32m+[m[32m            </PATH_ELEMENT>[m
[32m+[m[32m            <PATH_ELEMENT>[m
[32m+[m[32m              <option name="myItemId" value="datasource" />[m
[32m+[m[32m              <option name="myItemType" value="com.intellij.ide.projectView.impl.nodes.PsiDirectoryNode" />[m
[32m+[m[32m            </PATH_ELEMENT>[m
[32m+[m[32m          </PATH>[m
         </subPane>[m
       </pane>[m
[31m-      <pane id="Scope" />[m
     </panes>[m
   </component>[m
   <component name="PropertiesComponent">[m
[36m@@ -444,7 +472,27 @@[m
       <option name="SCRIPT_NAME" value="$PROJECT_DIR$/microtrader/run.py" />[m
       <option name="PARAMETERS" value="" />[m
       <RunnerSettings RunnerId="PyDebugRunner" />[m
[32m+[m[32m      <RunnerSettings RunnerId="PythonRunner" />[m
       <ConfigurationWrapper RunnerId="PyDebugRunner" />[m
[32m+[m[32m      <ConfigurationWrapper RunnerId="PythonRunner" />[m
[32m+[m[32m      <method />[m
[32m+[m[32m    </configuration>[m
[32m+[m[32m    <configuration default="false" name="tradable_register" type="PythonConfigurationType" factoryName="Python" temporary="true">[m
[32m+[m[32m      <option name="INTERPRETER_OPTIONS" value="" />[m
[32m+[m[32m      <option name="PARENT_ENVS" value="true" />[m
[32m+[m[32m      <envs>[m
[32m+[m[32m        <env name="PYTHONUNBUFFERED" value="1" />[m
[32m+[m[32m      </envs>[m
[32m+[m[32m      <option name="SDK_HOME" value="" />[m
[32m+[m[32m      <option name="WORKING_DIRECTORY" value="$PROJECT_DIR$/microtrader/app/models" />[m
[32m+[m[32m      <option name="IS_MODULE_SDK" value="true" />[m
[32m+[m[32m      <option name="ADD_CONTENT_ROOTS" value="true" />[m
[32m+[m[32m      <option name="ADD_SOURCE_ROOTS" value="true" />[m
[32m+[m[32m      <module name="mysite" />[m
[32m+[m[32m      <option name="SCRIPT_NAME" value="$PROJECT_DIR$/microtrader/app/models/tradable_register.py" />[m
[32m+[m[32m      <option name="PARAMETERS" value="" />[m
[32m+[m[32m      <RunnerSettings RunnerId="PythonRunner" />[m
[32m+[m[32m      <ConfigurationWrapper RunnerId="PythonRunner" />[m
       <method />[m
     </configuration>[m
     <configuration default="true" type="tests" factoryName="py.test">[m
[36m@@ -568,18 +616,20 @@[m
       <option name="USE_PATTERN" value="false" />[m
       <method />[m
     </configuration>[m
[31m-    <list size="4">[m
[32m+[m[32m    <list size="5">[m
       <item index="0" class="java.lang.String" itemvalue="Python.models" />[m
       <item index="1" class="java.lang.String" itemvalue="Python.cash" />[m
       <item index="2" class="java.lang.String" itemvalue="Python.test" />[m
       <item index="3" class="java.lang.String" itemvalue="Python.run" />[m
[32m+[m[32m      <item index="4" class="java.lang.String" itemvalue="Python.tradable_register" />[m
     </list>[m
     <recent_temporary>[m
[31m-      <list size="4">[m
[32m+[m[32m      <list size="5">[m
         <item index="0" class="java.lang.String" itemvalue="Python.run" />[m
[31m-        <item index="1" class="java.lang.String" itemvalue="Python.test" />[m
[31m-        <item index="2" class="java.lang.String" itemvalue="Python.cash" />[m
[31m-        <item index="3" class="java.lang.String" itemvalue="Python.models" />[m
[32m+[m[32m        <item index="1" class="java.lang.String" itemvalue="Python.tradable_register" />[m
[32m+[m[32m        <item index="2" class="java.lang.String" itemvalue="Python.test" />[m
[32m+[m[32m        <item index="3" class="java.lang.String" itemvalue="Python.cash" />[m
[32m+[m[32m        <item index="4" class="java.lang.String" itemvalue="Python.models" />[m
       </list>[m
     </recent_temporary>[m
   </component>[m
[36m@@ -596,26 +646,26 @@[m
     <servers />[m
   </component>[m
   <component name="ToolWindowManager">[m
[31m-    <frame x="-8" y="-8" width="1378" height="744" extended-state="0" />[m
[31m-    <editor active="false" />[m
[32m+[m[32m    <frame x="1" y="1" width="1364" height="726" extended-state="0" />[m
[32m+[m[32m    <editor active="true" />[m
     <layout>[m
       <window_info id="Changes" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="7" side_tool="false" content_ui="tabs" />[m
[31m-      <window_info id="Terminal" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="7" side_tool="false" content_ui="tabs" />[m
[32m+[m[32m      <window_info id="Terminal" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="10" side_tool="false" content_ui="tabs" />[m
       <window_info id="TODO" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="6" side_tool="false" content_ui="tabs" />[m
       <window_info id="Structure" active="false" anchor="left" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.25" sideWeight="0.5" order="1" side_tool="false" content_ui="tabs" />[m
[31m-      <window_info id="Project" active="false" anchor="left" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="true" weight="0.34361234" sideWeight="0.5" order="0" side_tool="false" content_ui="combo" />[m
[31m-      <window_info id="Debug" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.4" sideWeight="0.5" order="3" side_tool="false" content_ui="tabs" />[m
[32m+[m[32m      <window_info id="Project" active="false" anchor="left" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="true" weight="0.34718102" sideWeight="0.5" order="0" side_tool="false" content_ui="combo" />[m
[32m+[m[32m      <window_info id="Debug" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="true" weight="0.3986711" sideWeight="0.5" order="3" side_tool="false" content_ui="tabs" />[m
       <window_info id="Favorites" active="false" anchor="left" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="2" side_tool="true" content_ui="tabs" />[m
[31m-      <window_info id="Event Log" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="7" side_tool="true" content_ui="tabs" />[m
[32m+[m[32m      <window_info id="Event Log" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="8" side_tool="true" content_ui="tabs" />[m
       <window_info id="Run" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.32903227" sideWeight="0.5" order="2" side_tool="false" content_ui="tabs" />[m
[31m-      <window_info id="Version Control" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="7" side_tool="false" content_ui="tabs" />[m
[32m+[m[32m      <window_info id="Version Control" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="9" side_tool="false" content_ui="tabs" />[m
       <window_info id="Cvs" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.25" sideWeight="0.5" order="4" side_tool="false" content_ui="tabs" />[m
       <window_info id="Message" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="0" side_tool="false" content_ui="tabs" />[m
[31m-      <window_info id="Ant Build" active="false" anchor="right" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.25" sideWeight="0.5" order="1" side_tool="false" content_ui="tabs" />[m
       <window_info id="Find" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.33" sideWeight="0.5" order="1" side_tool="false" content_ui="tabs" />[m
[32m+[m[32m      <window_info id="Ant Build" active="false" anchor="right" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.25" sideWeight="0.5" order="1" side_tool="false" content_ui="tabs" />[m
       <window_info id="Commander" active="false" anchor="right" auto_hide="false" internal_type="SLIDING" type="SLIDING" visible="false" weight="0.4" sideWeight="0.5" order="0" side_tool="false" content_ui="tabs" />[m
[31m-      <window_info id="Hierarchy" active="false" anchor="right" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.25" sideWeight="0.5" order="2" side_tool="false" content_ui="combo" />[m
       <window_info id="Inspection" active="false" anchor="bottom" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.4" sideWeight="0.5" order="5" side_tool="false" content_ui="tabs" />[m
[32m+[m[32m      <window_info id="Hierarchy" active="false" anchor="right" auto_hide="false" internal_type="DOCKED" type="DOCKED" visible="false" weight="0.25" sideWeight="0.5" order="2" side_tool="false" content_ui="combo" />[m
     </layout>[m
   </component>[m
   <component name="Vcs.Log.UiProperties">[m
[36m@@ -639,66 +689,10 @@[m
       <breakpoints-dialog>[m
         <breakpoints-dialog />[m
       </breakpoints-dialog>[m
[31m-      <option name="time" value="5" />[m
[32m+[m[32m      <option name="time" value="24" />[m
     </breakpoint-manager>[m
   </component>[m
   <component name="editorHistoryManager">[m
[31m-    <entry file="file://$PROJECT_DIR$/hello/serializers.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="304" max-vertical-offset="494">[m
[31m-          <caret line="16" column="0" selection-start-line="16" selection-start-column="0" selection-end-line="16" selection-end-column="0" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/hello/urls.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="190" max-vertical-offset="304">[m
[31m-          <caret line="12" column="1" selection-start-line="12" selection-start-column="1" selection-end-line="12" selection-end-column="1" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/hello/views.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="1292" max-vertical-offset="1501">[m
[31m-          <caret line="68" column="35" selection-start-line="68" selection-start-column="35" selection-end-line="68" selection-end-column="35" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/mysite/urls.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="551">[m
[31m-          <caret line="0" column="0" selection-start-line="0" selection-start-column="0" selection-end-line="0" selection-end-column="0" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/hello/models.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="424" max-vertical-offset="3078">[m
[31m-          <caret line="34" column="27" selection-start-line="34" selection-start-column="27" selection-end-line="34" selection-end-column="27" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/hello/tests.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="171">[m
[31m-          <caret line="0" column="0" selection-start-line="0" selection-start-column="0" selection-end-line="0" selection-end-column="0" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/hello/serializers.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="304" max-vertical-offset="475">[m
[31m-          <caret line="16" column="0" selection-start-line="16" selection-start-column="0" selection-end-line="16" selection-end-column="0" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/hello/urls.py">[m
[31m-      <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="171" max-vertical-offset="285">[m
[31m-          <caret line="11" column="1" selection-start-line="11" selection-start-column="1" selection-end-line="11" selection-end-column="1" />[m
[31m-        </state>[m
[31m-      </provider>[m
[31m-    </entry>[m
     <entry file="file://$PROJECT_DIR$/hello/views.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
         <state vertical-scroll-proportion="0.0" vertical-offset="665" max-vertical-offset="1254">[m
[36m@@ -913,46 +907,50 @@[m
       <provider selected="true" editor-type-id="text-editor">[m
         <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="569">[m
           <caret line="0" column="0" selection-start-line="0" selection-start-column="0" selection-end-line="0" selection-end-column="0" />[m
[31m-          <folding />[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/app/templates/strategy.html">[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/test.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="124" max-vertical-offset="3496">[m
[31m-          <caret line="33" column="0" selection-start-line="33" selection-start-column="0" selection-end-line="33" selection-end-column="0" />[m
[31m-          <folding />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="513">[m
[32m+[m[32m          <caret line="0" column="0" selection-start-line="0" selection-start-column="0" selection-end-line="0" selection-end-column="0" />[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/app/models/data_base.py">[m
[32m+[m[32m    <entry file="file://$USER_HOME$/AppData/Local/Programs/Python/Python36-32/Lib/site-packages/pandas/util/decorators.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="760">[m
[31m-          <caret line="12" column="27" selection-start-line="12" selection-start-column="27" selection-end-line="12" selection-end-column="27" />[m
[31m-          <folding />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="1508" max-vertical-offset="5567">[m
[32m+[m[32m          <caret line="90" column="0" selection-start-line="90" selection-start-column="0" selection-end-line="90" selection-end-column="0" />[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/app/models/future_contract.py">[m
[32m+[m[32m    <entry file="file://$USER_HOME$/AppData/Local/Programs/Python/Python36-32/Lib/site-packages/flask/app.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="147" max-vertical-offset="779">[m
[31m-          <caret line="14" column="26" selection-start-line="14" selection-start-column="26" selection-end-line="14" selection-end-column="26" />[m
[31m-          <folding />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="33504" max-vertical-offset="43548">[m
[32m+[m[32m          <caret line="1798" column="0" selection-start-line="1798" selection-start-column="0" selection-end-line="1798" selection-end-column="0" />[m
         </state>[m
       </provider>[m
     </entry>[m
     <entry file="file://$PROJECT_DIR$/microtrader/app/models/cash.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
         <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="475">[m
[31m-          <caret line="7" column="14" selection-start-line="7" selection-start-column="14" selection-end-line="7" selection-end-column="14" />[m
[32m+[m[32m          <caret line="4" column="30" selection-start-line="4" selection-start-column="30" selection-end-line="4" selection-end-column="30" />[m
           <folding />[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/test.py">[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/vol_target.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="513">[m
[31m-          <caret line="19" column="19" selection-start-line="19" selection-start-column="19" selection-end-line="19" selection-end-column="19" />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="532" max-vertical-offset="1539">[m
[32m+[m[32m          <caret line="29" column="22" selection-start-line="29" selection-start-column="22" selection-end-line="29" selection-end-column="22" />[m
[32m+[m[32m          <folding />[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/rolling_future_strategy.py">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="285" max-vertical-offset="988">[m
[32m+[m[32m          <caret line="24" column="43" selection-start-line="24" selection-start-column="43" selection-end-line="24" selection-end-column="43" />[m
           <folding />[m
         </state>[m
       </provider>[m
[36m@@ -965,50 +963,110 @@[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/app/models/rolling_future_strategy.py">[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/asset_allocation_inverse_vol.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="145" max-vertical-offset="912">[m
[31m-          <caret line="17" column="0" selection-start-line="17" selection-start-column="0" selection-end-line="17" selection-end-column="0" />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="1026">[m
[32m+[m[32m          <caret line="0" column="0" selection-start-line="0" selection-start-column="0" selection-end-line="0" selection-end-column="0" />[m
           <folding />[m
         </state>[m
       </provider>[m
     </entry>[m
     <entry file="file://$PROJECT_DIR$/microtrader/app/models/strategy_base.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="665">[m
[31m-          <caret line="5" column="0" selection-start-line="5" selection-start-column="0" selection-end-line="5" selection-end-column="0" />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="30" max-vertical-offset="1007">[m
[32m+[m[32m          <caret line="11" column="13" selection-start-line="11" selection-start-column="13" selection-end-line="11" selection-end-column="13" />[m
           <folding />[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/app/models/vol_target.py">[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/utils/math_funcs.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="1235">[m
[31m-          <caret line="0" column="0" selection-start-line="0" selection-start-column="0" selection-end-line="0" selection-end-column="0" />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="1209" max-vertical-offset="1520">[m
[32m+[m[32m          <caret line="71" column="4" selection-start-line="71" selection-start-column="4" selection-end-line="71" selection-end-column="48" />[m
           <folding />[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/app/views.py">[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/index_product.py">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="418">[m
[32m+[m[32m          <caret line="10" column="32" selection-start-line="10" selection-start-column="32" selection-end-line="10" selection-end-column="32" />[m
[32m+[m[32m          <folding>[m
[32m+[m[32m            <element signature="e#0#19#0" expanded="true" />[m
[32m+[m[32m          </folding>[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/data_base.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="482" max-vertical-offset="855">[m
[31m-          <caret line="35" column="34" selection-start-line="35" selection-start-column="34" selection-end-line="35" selection-end-column="34" />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="95" max-vertical-offset="836">[m
[32m+[m[32m          <caret line="6" column="0" selection-start-line="6" selection-start-column="0" selection-end-line="6" selection-end-column="0" />[m
           <folding />[m
         </state>[m
       </provider>[m
     </entry>[m
[31m-    <entry file="file://$PROJECT_DIR$/microtrader/app/utils/math_funcs.py">[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/future_contract.py">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="481" max-vertical-offset="855">[m
[32m+[m[32m          <caret line="42" column="18" selection-start-line="42" selection-start-column="18" selection-end-line="42" selection-end-column="18" />[m
[32m+[m[32m          <folding />[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/tradable_manager.py">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="1060" max-vertical-offset="2356">[m
[32m+[m[32m          <caret line="63" column="0" selection-start-line="63" selection-start-column="0" selection-end-line="63" selection-end-column="0" />[m
[32m+[m[32m          <folding />[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/etf_product.py">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="107" max-vertical-offset="418">[m
[32m+[m[32m          <caret line="14" column="0" selection-start-line="14" selection-start-column="0" selection-end-line="14" selection-end-column="0" />[m
[32m+[m[32m          <folding>[m
[32m+[m[32m            <element signature="e#0#19#0" expanded="true" />[m
[32m+[m[32m          </folding>[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/datasource/quandl_wrapper.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.0" vertical-offset="838" max-vertical-offset="1425">[m
[31m-          <caret line="56" column="0" selection-start-line="56" selection-start-column="0" selection-end-line="56" selection-end-column="0" />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="1474" max-vertical-offset="1824">[m
[32m+[m[32m          <caret line="88" column="0" selection-start-line="88" selection-start-column="0" selection-end-line="88" selection-end-column="0" />[m
           <folding />[m
         </state>[m
       </provider>[m
     </entry>[m
     <entry file="file://$PROJECT_DIR$/microtrader/app/models/tradable_base.py">[m
       <provider selected="true" editor-type-id="text-editor">[m
[31m-        <state vertical-scroll-proportion="0.88161993" vertical-offset="1446" max-vertical-offset="3059">[m
[31m-          <caret line="94" column="13" selection-start-line="94" selection-start-column="13" selection-end-line="94" selection-end-column="13" />[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="0" max-vertical-offset="2375">[m
[32m+[m[32m          <caret line="15" column="28" selection-start-line="15" selection-start-column="28" selection-end-line="15" selection-end-column="28" />[m
[32m+[m[32m          <folding />[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/views.py">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="0.0" vertical-offset="361" max-vertical-offset="1957">[m
[32m+[m[32m          <caret line="34" column="57" selection-start-line="34" selection-start-column="57" selection-end-line="34" selection-end-column="57" />[m
[32m+[m[32m          <folding />[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/templates/tradable.html">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="-8.285714" vertical-offset="4613" max-vertical-offset="5757">[m
[32m+[m[32m          <caret line="255" column="0" selection-start-line="255" selection-start-column="0" selection-end-line="255" selection-end-column="0" />[m
[32m+[m[32m          <folding />[m
[32m+[m[32m        </state>[m
[32m+[m[32m      </provider>[m
[32m+[m[32m    </entry>[m
[32m+[m[32m    <entry file="file://$PROJECT_DIR$/microtrader/app/models/strategy_short_vxx.py">[m
[32m+[m[32m      <provider selected="true" editor-type-id="text-editor">[m
[32m+[m[32m        <state vertical-scroll-proportion="0.61093247" vertical-offset="855" max-vertical-offset="1216">[m
[32m+[m[32m          <caret line="58" column="106" selection-start-line="58" selection-start-column="106" selection-end-line="58" selection-end-column="106" />[m
           <folding />[m
         </state>[m
       </provider>[m
[1mdiff --git a/microtrader/app/models/strategy_short_vxx.py b/microtrader/app/models/strategy_short_vxx.py[m
[1mindex 30905a4..59687aa 100644[m
[1m--- a/microtrader/app/models/strategy_short_vxx.py[m
[1m+++ b/microtrader/app/models/strategy_short_vxx.py[m
[36m@@ -55,5 +55,8 @@[m [mclass StrategyShortVXX(StrategyBase):[m
             values.append(value)[m
             prev_price = vxx_data[date][m
 [m
[32m+[m[32m            if date_iter <= end_date:[m
[32m+[m[32m                self.children_strategies = {"YAHOO_VXX": position, "USD": value - vxx_data[date]*position}[m
[32m+[m
         self.values = pd.Series(values, index=bdays)[start_date : end_date][m
         return self.values[m
\ No newline at end of file[m
[1mdiff --git a/microtrader/app/models/tradable_base.py b/microtrader/app/models/tradable_base.py[m
[1mindex 09eb004..27f8d5a 100644[m
[1m--- a/microtrader/app/models/tradable_base.py[m
[1m+++ b/microtrader/app/models/tradable_base.py[m
[36m@@ -38,6 +38,16 @@[m [mclass TradableBase():[m
         return None[m
 [m
     def get_values_stats(self,start_date,end_date):[m
[32m+[m[32m        # if self.values has no data between start and end date just return error value[m
[32m+[m[32m        pd_series_1 = self.values[start_date:end_date][m
[32m+[m[32m        if len(pd_series_1) < 2:[m
[32m+[m[32m            return {[m
[32m+[m[32m                "return":   None,[m
[32m+[m[32m                "volatility":   None,[m
[32m+[m[32m                "max_draw_down": None,[m
[32m+[m[32m                "sharpe_ratio": None[m
[32m+[m[32m            }[m
[32m+[m
         ret = math_funcs.get_return(self.values,start_date,end_date)[m
         vol = math_funcs.get_vol(self.values,start_date,end_date)[m
         max_draw_down = math_funcs.get_max_draw_down(self.values,start_date,end_date)[m
[1mdiff --git a/microtrader/app/models/tradable_manager.py b/microtrader/app/models/tradable_manager.py[m
[1mindex f97afd4..2286138 100644[m
[1m--- a/microtrader/app/models/tradable_manager.py[m
[1m+++ b/microtrader/app/models/tradable_manager.py[m
[36m@@ -29,8 +29,10 @@[m [mclass TradableManager():[m
         # this will be replaced by proper load of real positions[m
 [m
         from .index_product import IndexProduct[m
[32m+[m[32m        from .etf_product import EtfProduct[m
[32m+[m
         IndexProduct('VIX', 'YAHOO')[m
[31m-        IndexProduct('VXX', 'YAHOO')[m
[32m+[m[32m        EtfProduct('VXX', 'YAHOO')[m
 [m
         from .rolling_future_strategy import RollingFutureStrategy[m
         from .vol_target import VolTarget[m
