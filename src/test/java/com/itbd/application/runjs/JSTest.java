package com.itbd.application.runjs;
// package com.example.application.runjs;

// import java.io.IOException;

// import javax.script.Invocable;
// import javax.script.ScriptEngine;
// import javax.script.ScriptEngineManager;
// import javax.script.ScriptException;

// import org.graalvm.polyglot.Context;
// import org.graalvm.polyglot.Value;
// import org.junit.jupiter.api.Test;

// public class JSTest {
//     public static final int WARMUP = 30;
//     public static final int ITERATIONS = 10;
//     static String JS_CODE = "(function myFun(param){console.log('hello  '+param);})";
//     static String JS_CODE1 = "function myFun(param){console.log('hello '+param);}";

//     @Test
//     public void runJs() throws ScriptException {
//         System.out.println("Hello Java!");
//         try (Context context = Context.create()) {
//             Value value = context.eval("js", JS_CODE);
//             value.execute("world");
//         }
//     }

//     @Test
//     public void runFun() throws ScriptException, IOException {
//         System.out.println("=== Graal.js via javax.script.ScriptEngine ===");
//         ScriptEngine graaljsEngine = new ScriptEngineManager().getEngineByName("graal.js");
//         if (graaljsEngine == null) {
//             System.out.println("*** Graal.js not found ***");    
//         } else {
//             benchScriptEngineIntl(graaljsEngine);
//         }
//     }
//     private long benchScriptEngineIntl(ScriptEngine eng) throws IOException {
//         long sum = 0L;
//         try {
//             eng.eval(JS_CODE1);
//             Invocable inv = (Invocable) eng;
//             System.out.println("warming up ...");
//             for (int i = 0; i < WARMUP; i++) {
//                 inv.invokeFunction("myFun", "world");
//             }
//         } catch (Exception ex) {
//             System.out.println(ex);
//         }
//         return sum;
//     }
// }
