"use client";
import { Popover, Transition } from "@headlessui/react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { BiChevronRight } from "react-icons/bi";
import { GoCircleSlash } from "react-icons/go";
import { Button, wrapFieldsWithMeta } from "tinacms";
import { IconQueryResponse } from "../../../app/icons/route";
import { QueryProvider } from "../../../app/providers/query-provider";
const parseIconName = (name: string) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};

export const IconPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [client] = React.useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <IconPickerContents input={input} />
    </QueryClientProvider>
  );
});

const IconPickerContents = ({ input }) => {
  const fetchPage = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }): Promise<IconQueryResponse & { nextCursor: number }> => {
    const res = await axios.get("/icons", {
      params: {
        pageParam,
      },
    });
    return {
      ...res.data,
      nextCursor: res.data.hasNextPage ? pageParam + 1 : null,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      initialPageParam: undefined,
      queryKey: ["queryKey"],
      queryFn: fetchPage,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    });

  const filteredIcons = useMemo(() => {
    return data.pages.map((page) => page.data).flat();
  }, [data]);

  const [filter, setFilter] = React.useState("");

  const inputLabel = input.value ? parseIconName(input.value) : "Select Icon";

  return (
    <div className="relative z-1000">
      <input type="text" id={input.name} className="hidden" {...input} />
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button>
              <Button
                className={`h-11 px-4 text-sm ${false ? "h-11" : "h-10"}`}
                size="custom"
                rounded="full"
                variant={open ? "secondary" : "white"}
              >
                {input.value && (
                  <img
                    src={`/icons/${input.value}`}
                    className="r-1 h-auto w-7"
                  ></img>
                )}

                {/* {InputIcon && (
                  <InputIcon className="mr-1 h-auto w-7 fill-current text-blue-500" />
                )} */}
                {inputLabel}

                {!input.value && (
                  <>
                    <BiChevronRight className="ml-1 h-auto w-5 fill-current opacity-70" />
                  </>
                )}
              </Button>
            </Popover.Button>
            <div
              className="absolute -bottom-2 left-0 w-full min-w-48 max-w-2xl translate-y-full"
              style={{ zIndex: 1000 }}
            >
              <Transition
                enter="transition duration-150 ease-out"
                enterFrom="transform opacity-0 -translate-y-2"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition duration-75 ease-in"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-2"
              >
                <Popover.Panel className="relative z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                  {({ close }) => (
                    <div className="flex size-full max-h-96 flex-col">
                      <div className="z-10 border-b border-gray-100 bg-gray-50 p-2 shadow-sm">
                        <input
                          type="text"
                          className="block w-full rounded-sm border border-gray-100 bg-white px-2.5 py-1.5 text-sm shadow-inner placeholder:text-gray-200"
                          onClick={(
                            event: React.MouseEvent<HTMLInputElement>
                          ) => {
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          value={filter}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFilter(event.target.value);
                          }}
                          placeholder="Filter..."
                        />
                      </div>
                      {filteredIcons.length === 0 && (
                        <span className="relative bg-gray-50 px-2 py-3 text-center text-xs italic text-gray-300">
                          Loading...
                        </span>
                      )}
                      {filteredIcons.length > 0 && (
                        <div className="grid w-full auto-rows-auto grid-cols-6 overflow-y-auto p-2">
                          <button
                            className="relative flex-1 rounded-lg px-3 py-2 text-center text-xs outline-none transition-all duration-150 ease-out hover:bg-gray-50 hover:text-blue-500 focus:bg-gray-50 focus:text-blue-500"
                            key={"clear-input"}
                            onClick={() => {
                              input.onChange("");
                              setFilter("");
                              close();
                            }}
                          >
                            <GoCircleSlash className="h-auto w-6 text-gray-200" />
                          </button>
                          {filteredIcons.map((name) => {
                            return (
                              <button
                                className="relative flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-xs outline-none transition-all duration-150 ease-out hover:bg-gray-50 hover:text-blue-500 focus:bg-gray-50 focus:text-blue-500"
                                key={name.displayName}
                                onClick={() => {
                                  input.onChange(name.displayName);
                                  setFilter("");
                                  close();
                                }}
                              >
                                <img
                                  src={name.url}
                                  className="mr-1 w-7"
                                  alt={name.displayName}
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </Popover.Panel>
              </Transition>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
};
