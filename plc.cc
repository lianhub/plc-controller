// hello.cc using N-API
#include <node_api.h>
#include<cstdio>

#include <iostream>
#include "./ads/ads.h"

namespace demo {

napi_value MyFunction(napi_env env, napi_callback_info info) {
    napi_status status;
    size_t argc = 1;
    int number = 0;
    napi_value argv[1];
    status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);

    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Failed to parse arguments");
    }

    status = napi_get_value_int32(env, argv[0], &number);

    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Invalid number was passed as argument");
    }

    runADS(std::cout, number);

    napi_value myNumber;
    number = number * 2;
    status = napi_create_int32(env, number, &myNumber);

    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Unable to create return value");
    }

    return myNumber;
}

napi_value init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value fn;

  status = napi_create_function(env, nullptr, 0, MyFunction, nullptr, &fn);
  if (status != napi_ok) return nullptr;

  status = napi_set_named_property(env, exports, "my_func", fn);
  if (status != napi_ok) return nullptr;
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

}  // namespace demo
